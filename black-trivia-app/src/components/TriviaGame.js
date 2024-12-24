import React, { useState } from 'react';
import GameConfig from './GameConfig';
import TriviaQuestion from './TriviaQuestion';
import EndGame from './EndGame';

const TriviaGame = ({
    setGameConfig, // Use the function from App.js
    timer,
    setTimer,
    isTimerRunning,
    setIsTimerRunning,
    currentTeam,
    setCurrentTeam,
    scores,
    setScores,
}) => {
    const [localGameConfig, setLocalGameConfig] = useState(null); // Manage local game state
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('');
    const [nextQuestionFlag, setNextQuestionFlag] = useState(false);

    const resetGame = () => {
        setLocalGameConfig(null);
        setScores({ team1: 0, team2: 0 });
        setCurrentTeam(1);
        setGameOver(false);
        setWinner('');
        setTimer(15);
        setNextQuestionFlag(false);
    };

    const checkGameOver = (updatedScores) => {
        const maxScore = localGameConfig?.gameLength || 1;

        console.log(maxScore + " <= MAX SCORE | TEAM 1 SCORE => " + updatedScores.team1);
        console.log(maxScore + " <= MAX SCORE | TEAM 2 SCORE => " + updatedScores.team2);
        if (updatedScores.team1 >= maxScore) {
            console.log("GAME OVER");
            setGameOver(true);
            setWinner(localGameConfig.team1);
        } else if (updatedScores.team2 >= maxScore) {
            setGameOver(true);
            setWinner(localGameConfig.team2);
        }
    };

    // Updated setScores logic
    const handleScoreUpdate = (team) => {
        setScores((prevScores) => {
            const updatedScores = {
                team1: prevScores.team1 || 0,
                team2: prevScores.team2 || 0,
                [team]: (prevScores[team] || 0) + 1,
            };
    
            // Log debug information
            console.log("PREVIOUS SCORE:", prevScores);
            console.log("UPDATED SCORE:", updatedScores);
    
            // Pass updated scores directly to checkGameOver
            checkGameOver(updatedScores);
    
            return updatedScores;
        });
    };

    if (!localGameConfig) {
        return (
            <GameConfig
                setGameConfig={(config) => {
                    setLocalGameConfig(config); // Update local state
                    setGameConfig(config); // Pass to App.js
                }}
            />
        );
    }

    if (gameOver) {
        return <EndGame winner={winner} resetGame={resetGame} iframeContent={null} />;
    }

    return (
        <div style={{width:'100%'}}>
            <TriviaQuestion
                currentTeam={currentTeam}
                setCurrentTeam={setCurrentTeam}
                gameConfig={localGameConfig}
                setIsTimerRunning={setIsTimerRunning}
                timer={timer}
                setTimer={setTimer}
                nextQuestionFlag={nextQuestionFlag}
                setNextQuestionFlag={setNextQuestionFlag}
                scores={scores}
                setScores={handleScoreUpdate}
                checkGameOver={checkGameOver}
            />
        </div>
    );
};

export default TriviaGame;
