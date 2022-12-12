import { configureStore } from '@reduxjs/toolkit'
import { reducer as chartDataReducer } from './slice/chartDataSlice'
import { reducer as cryptAlgoListReducer} from './slice/cryptAlgoListSlice'

const store = configureStore({
    reducer: {
        chartData: chartDataReducer,
        cryptAlgoListData: cryptAlgoListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
