import React, { useEffect }  from 'react';

import { AppDispatch, RootState } from './store'
import { setUser } from './store/slice/chartDataSlice';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Chart from './components/cryptChart/cryptChart';
import socketIO from 'socket.io-client';

const socket = socketIO('http://localhost:3030');

function App() {
  const dispatch: AppDispatch = useDispatch();
  
  // const sendSocketMessage = () => {
  //   socket.emit('message', {
  //     text: 'jacky wang',
  //     socketID: socket.id,
  //   });
  // }

  useEffect(() => {
    socket.on('message', (e) => {
      console.log('客户端收到消息', e);
      dispatch(setUser({ time: parseInt(e) }))
    });
    return () => {
      console.log('useEffect return called');
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
