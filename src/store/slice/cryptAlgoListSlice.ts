import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCryptAlgoList, setCryptAlgoList } from '../../service/cryptAlgoData';
import { emptyChartData } from './chartDataSlice';

interface crytAlgoList {
    list: string[];
    selectedList: string[];
}

export const asyncGetCryptAlgoList = createAsyncThunk('getCryptAlgoList', async (a, { dispatch }) => {
    const res = await getCryptAlgoList();
    dispatch(setList((res as any).data.list))
})

export const asyncSetCryptAlgoList = createAsyncThunk('setCryptAlogList', async (list: string[], { dispatch }) => {
    const res = await setCryptAlgoList(list);
    dispatch(emptyChartData());
    dispatch((setSelectedList(list)));
})

export const CryptAlgoListSlice = createSlice({
    name: 'cryptAlgoListSlice',
    initialState: <crytAlgoList>{
        list: [],
        selectedList: [],
    },
    reducers: {
        setList(state, action: PayloadAction<string[]>) {
            Object.assign(state.list, action.payload )
        },
        setSelectedList(state, action: PayloadAction<string[]>) {
            Object.assign(state.selectedList, action.payload)
        }
    }
});

export const { setList, setSelectedList } = CryptAlgoListSlice.actions;
export const reducer = CryptAlgoListSlice.reducer;

