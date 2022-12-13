import React, { useEffect, useState }  from 'react';

import { AppDispatch, RootState } from './store'
import { setChartData } from './store/slice/chartDataSlice';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Chart from './components/cryptChart/cryptChart';
import CryptProcess from './components/cryptProcess';
import socketIO from 'socket.io-client';

import { asyncGetCryptAlgoList } from './store/slice/cryptAlgoListSlice';
import { HostUrl } from './util/app';


const socket = socketIO(`${HostUrl}:3030`);

function App() {
  const dispatch: AppDispatch = useDispatch();
  const [showDiagram, setShowDiagram] = useState<boolean>(true);
  
  useEffect(() => {
    // 获取列表
    dispatch(asyncGetCryptAlgoList());
    socket.on('message', (e) => {
      dispatch(setChartData(e as string))
    });
    // setInterval(() => {
    //   setShowDiagram(false);
    // }, 20000);
    return () => {
      socket.disconnect();
    }

  }, [])

  // useEffect(() => {
  //   setShowDiagram(true)
  // }, [showDiagram]);

  // const chartData = useSelector((state: RootState) => state.chartData);
  return (
  
    <div className="App">
      {/* {showDiagram && <CryptProcess />} */}
      <Chart />
      </div>

  );
}

export default App;
