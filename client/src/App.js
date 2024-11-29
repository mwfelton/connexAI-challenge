import './App.css';
import React, { useState, useEffect } from 'react';
import { getTime } from '../src/utils/time';

function App() {
  const [serverTime, setServerTime] = useState(null);

  const getServerTime = async () => {
    const time = await getTime();
    setServerTime(time);
  };

  useEffect(() => {
    getServerTime();
  }, []); 

  return (
    <div className="App">
      <div id="left">
        <p>/TIME</p>
        {/* The most recently-fetched value for server time (retrieved by hitting endpoint /time),
        displayed in epoch seconds. */}
        <p>The most recently-fetched value for server time: {serverTime}</p>
      </div>
      <div id="right">
        <p>Right Content</p>
      </div>
    </div>
  );
}

export default App;
