import './App.css';
import React, { useState, useEffect } from 'react';
import { getTime } from '../src/utils/time';
import { getMetrics } from '../src/utils/metrics';
import { formatTime } from './utils/formatter';

function App() {
  const [serverTime, setServerTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(0);
  const [metrics, setMetrics] = useState('');
  const [loadingTime, setLoadingTime] = useState(true); 
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const getServerTime = async () => {
    setLoadingTime(true);
    try {
      const time = await getTime();
      setServerTime(time);
    } catch (error) {
      console.error('Failed to fetch time:', error);
    } finally {
      setLoadingTime(false);
    }
  };

  const getServerMetrics = async () => {
    setLoadingMetrics(true); 
    try {
      const data = await getMetrics();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setLoadingMetrics(false);
    }
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

  useEffect(() => {
    getServerTime();
    getServerMetrics();
    const interval = setInterval(() => {
      getServerTime();
      getServerMetrics();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div id="left" className="left">
        <h1>/TIME</h1>
        {loadingTime ? (
          <div className="loading-overlay">Loading...</div>
        ) : (
          <>
            <p>The most recently-fetched value for server time: {serverTime}</p>
            <p>Time Difference: {formatTime(timeDifference)}</p>
          </>
        )}
      </div>
      <div id="right" className="right">
        <h1>/METRICS</h1>
        {loadingMetrics ? (
          <div className="loading-overlay">Loading...</div>
        ) : (
          <div className='metrics'>
            <pre>{metrics}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
