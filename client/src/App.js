import './App.css';
import React, { useState, useEffect } from 'react';
import { getTime } from '../src/utils/time';
import { formatTime } from './utils/formatter';

function App() {
  const [serverTime, setServerTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(0);

  const getServerTime = async () => {
    const time = await getTime();
    setServerTime(time);
  };

  useEffect(() => {
    getServerTime();
    const interval = setInterval(() => {
      if (serverTime) {
        const currentClientTime = Math.floor(Date.now() / 1000);
        const diff = Math.abs(currentClientTime - serverTime);
        setTimeDifference(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [serverTime]);

  return (
    <div className="App">
      <div id="left">
        <h1>/TIME</h1>
        <p>The most recently-fetched value for server time: {serverTime}</p>
        <p>Time Difference: {formatTime(timeDifference)}</p>
      </div>
      <div id="right">
        <p>Right Content</p>
      </div>
    </div>
  );
}

export default App;
