// src/scripts/useGameLogic.js

import { useState } from 'react';

const useGameLogic = () => {
    const [redScore, setRedScore] = useState(0);
    const [blueScore, setBlueScore] = useState(0);

    const incrementScore = (team) => {
        if (team === 'red') setRedScore((prev) => prev + 1);
        if (team === 'blue') setBlueScore((prev) => prev + 1);
    };

    const resetScores = () => {
        setRedScore(0);
        setBlueScore(0);
    };

    return { redScore, blueScore, incrementScore, resetScores };
};

export default useGameLogic;