import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// interface IState{
//     username: string;
//     email: string;
// }

type ChartData = Array<{
    time: number;
}>
export const chartDataSlice = createSlice({
    name: 'chartDataSlice',
    initialState: <ChartData>[],
    reducers: {
        setUser(state, action: PayloadAction<{ time: number }>) { 
            if (state.length >= 50) {
                state.shift();
            } 
            state.push(action.payload);
        }
    }
})

export const { setUser } = chartDataSlice.actions;

export const reducer = chartDataSlice.reducer;

