import { configureStore } from '@reduxjs/toolkit'
import { reducer as chartDataReducer } from './slice/chartDataSlice'

const store = configureStore({
    reducer: {
        chartData: chartDataReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
