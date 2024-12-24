import React, { useState } from 'react';
import './styles/main.css';
import Scoreboard from './components/Scoreboard';
import TriviaGame from './components/TriviaGame';

const App = () => {
    const [timer, setTimer] = useState(15);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [gameConfig, setGameConfig] = useState(null); // Updated in GameConfig
    const [currentTeam, setCurrentTeam] = useState(1);
    const [scores, setScores] = useState({ team1: 0, team2: 0 });

    // console.log("GameConfig in App:", gameConfig); // Debugging

    return (
        <div id="page-wrapper">
            {gameConfig && (
                <Scoreboard
                    timer={timer}
                    gameConfig={gameConfig}
                    currentTeam={currentTeam}
                    scores={scores}
                />
            )}
            <TriviaGame
                setGameConfig={setGameConfig}
                timer={timer}
                setTimer={setTimer}
                isTimerRunning={isTimerRunning}
                setIsTimerRunning={setIsTimerRunning}
                currentTeam={currentTeam}
                setCurrentTeam={setCurrentTeam}
                scores={scores}
                setScores={setScores}
            />
        </div>
    );
};

export default App;
