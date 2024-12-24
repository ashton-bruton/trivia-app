// src/components/TimerControls.js

import React from 'react';
import '../styles/main.css';

const TimerControls = ({ isTimerRunning, setIsTimerRunning, setTimerReset }) => {
    const handleStartStop = () => {
        setIsTimerRunning((prev) => !prev);
    };

    const handleReset = () => {
        setIsTimerRunning(false);
        setTimerReset(true);
        setTimeout(() => setTimerReset(false), 100); // Reset the flag after a short delay
    };

    return (
        <div id="timer-controls">
            <button onClick={handleStartStop}>{isTimerRunning ? 'Stop Timer' : 'Start Timer'}</button>
            <button onClick={handleReset}>Reset Timer</button>
        </div>
    );
};

export default TimerControls;