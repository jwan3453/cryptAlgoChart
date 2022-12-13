import React, { useEffect }  from 'react';

import { AppDispatch, RootState } from './store'
import { setChartData } from './store/slice/chartDataSlice';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Chart from './components/cryptChart/cryptChart';
import socketIO from 'socket.io-client';

import { asyncGetCryptAlgoList } from './store/slice/cryptAlgoListSlice';
import { HostUrl } from './util/app';


const socket = socketIO(`${HostUrl}:3030`);

function App() {
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    // 获取列表
    dispatch(asyncGetCryptAlgoList());
    socket.on('message', (e) => {
      dispatch(setChartData(e as string))
    });
    return () => {
      socket.disconnect();
    }
  }, [])

  // const chartData = useSelector((state: RootState) => state.chartData);
  return (
  
      <div className="App">
        <Chart />
      </div>
  );
}

export default App;
