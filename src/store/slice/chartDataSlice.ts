import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ChartData = {
    [key: string]: Array<{
        name: string;
        timestamp: number,
        cryptTime: number,
    }>;
} 

const initialState = {};
export const chartDataSlice = createSlice({
    name: 'chartDataSlice',
    initialState: <ChartData>initialState,
    reducers: {
        emptyChartData: () => initialState,
        setChartData(state, action: PayloadAction<string>) { 
            const dataArray = action.payload.split('\n');
            dataArray.map((item: string) => {
                const singleitemData = item.split(',');
                const alogName = singleitemData[0];
                const newDataItemObj = {
                    name: alogName,
                    timestamp: parseInt(singleitemData[1]),
                    cryptTime: parseInt(singleitemData[2]),
                }; 
                if (singleitemData && alogName) {
                    if (state.hasOwnProperty(alogName)) {
                        if (state[alogName].length >= 200) {
                            state[alogName].shift();
                        }
        
                        state[alogName].push(newDataItemObj);
                        
                    } else {
                        Object.keys(state).map((item) => {
                            state[item] = [];
                        })
                        state[singleitemData[0]] = [];
                    }
                }
            })
        }
    }
})

export const { setChartData, emptyChartData } = chartDataSlice.actions;

export const reducer = chartDataSlice.reducer;

