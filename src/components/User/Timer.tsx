import React, { useState, useRef } from 'react';

const Timer: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState<number>(600);

  // Start the timer
  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCount(prevCount => prevCount + 1);
        console.log(timer,'timer');

        setTimer(prev=>{
            console.log(prev,'prev');
                      return prev-1
                    });
                    console.log(timer,'timer2');
                    
      }, 1000);
    }
  };

  // Clear the timer
  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setCount(0);
    }
  };

  return (
    <div>
      <h2>Timer: {count}</h2>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={clearTimer}>Clear Timer</button>
    </div>
  );
}

export default Timer;
