import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Metrics/reducer';
import { Provider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/Chip';
import { IState } from '../../store';
import Select from "react-dropdown-select";


const client = createClient({
    url: 'https://react.eogresources.com/graphql',
  });

  const query = `
  query {
    getMetrics 
      __typename
  }
`;

const getMetrics = (state: IState) => state.metrics;

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};

type MetricTypes = string;

type  KeyValue =
{
  label:string;
  value:string;
}

const Metrics = () => {
  const [result] = useQuery({
    query,
    variables: {
    },
  });
  const dispatch = useDispatch();
  let myarray: KeyValue[] = new Array<KeyValue>();
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
     dispatch(actions.metricsDataRecevied(getMetrics));
  }, [dispatch, data, error]);

  
  if(result.data && result.data.getMetrics){
    result.data.getMetrics.map((val:MetricTypes) => {
      myarray.push({label:val,value:val})
    });
  }

    return (
      result.data && result.data.getMetrics ? <Select 
      options={myarray}
      values={[]}
      required
      multi
      name="select"
      onChange={(value) => console.log(value)} 
      /> : null
    )
  
  };