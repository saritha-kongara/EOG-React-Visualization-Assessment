import { createSlice, PayloadAction, combineReducers } from 'redux-starter-kit';



type Metrics = {metrics:string[]};

export type ApiErrorAction = {
  error: string;
};

const initialState =  {
  metrics:<Array<any>>([])

};

const metricSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    metricsDataRecevied: (state, action: PayloadAction<Metrics>) => {
        state.metrics.push(action.payload);
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = metricSlice.reducer;
export const actions = metricSlice.actions;
