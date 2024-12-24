// src/components/Controls.js

import React from 'react';
import useGameLogic from '../scripts/useGameLogic';
import '../styles/main.css';

const Controls = () => {
    const { incrementScore, resetScores } = useGameLogic();

    return (
        <div id="controls">
            <button onClick={() => incrementScore('red')}>Add Point to Red</button>
            <button onClick={() => incrementScore('blue')}>Add Point to Blue</button>
            <button onClick={resetScores}>Reset Scores</button>
        </div>
    );
};

export default Controls;