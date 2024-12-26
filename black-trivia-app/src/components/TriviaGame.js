import React, { useState, useEffect } from 'react';
import GameConfig from './GameConfig';
import TriviaQuestion from './TriviaQuestion';
import EndGame from './EndGame';

const TriviaGame = ({
    setGameConfig,
    timer,
    setTimer,
    isTimerRunning,
    setIsTimerRunning,
    currentTeam,
    setCurrentTeam,
    scores,
    setScores,
}) => {
    const [localGameConfig, setLocalGameConfig] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('');
    const [nextQuestionFlag, setNextQuestionFlag] = useState(false);
    const [askedQuestions, setAskedQuestions] = useState([]);

    // Load `askedQuestions` from localStorage on mount
    useEffect(() => {
        const savedQuestions = JSON.parse(localStorage.getItem('askedQuestions')) || [];
        const timestamp = localStorage.getItem('askedQuestionsTimestamp');
        if (savedQuestions.length > 0 && timestamp) {
            const now = Date.now();
            if (now - parseInt(timestamp, 10) < 5 * 60 * 60 * 1000) {
                setAskedQuestions(savedQuestions);
            } else {
                localStorage.removeItem('askedQuestions');
                localStorage.removeItem('askedQuestionsTimestamp');
            }
        }
    }, []);

    // Save `askedQuestions` to localStorage whenever it changes
    useEffect(() => {
        if (askedQuestions.length > 0) {
            localStorage.setItem('askedQuestions', JSON.stringify(askedQuestions));
            localStorage.setItem('askedQuestionsTimestamp', Date.now().toString());
        }
    }, [askedQuestions]);

    // Set the timer when the game config is initialized
    useEffect(() => {
        if (localGameConfig) {
            setTimer(localGameConfig.timerDuration || 20);
        }
    }, [localGameConfig, setTimer]);

    const resetGame = () => {
        setLocalGameConfig(null);
        setScores({ team1: 0, team2: 0 });
        setCurrentTeam(1);
        setGameOver(false);
        setWinner('');
        setNextQuestionFlag(false);
        setAskedQuestions([]);
    };

    const checkGameOver = (updatedScores) => {
        const maxScore = localGameConfig?.gameLength || 1;
        if (updatedScores.team1 >= maxScore) {
            setGameOver(true);
            setWinner(localGameConfig.team1);
        } else if (updatedScores.team2 >= maxScore) {
            setGameOver(true);
            setWinner(localGameConfig.team2);
        }
    };

    const handleScoreUpdate = (team) => {
        setScores((prevScores) => {
            const updatedScores = {
                ...prevScores,
                [team]: prevScores[team] + 1,
            };
            checkGameOver(updatedScores);
            return updatedScores;
        });
    };

    if (!localGameConfig) {
        return (
            <GameConfig
                setGameConfig={(config) => {
                    setLocalGameConfig(config);
                    setGameConfig(config);
                }}
            />
        );
    }

    if (gameOver) {
        return <EndGame winner={winner} resetGame={resetGame} iframeContent={null} />;
    }

    return (
        <div style={{ width: '100%' }}>
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
                askedQuestions={askedQuestions}
                setAskedQuestions={setAskedQuestions}
            />
        </div>
    );
};

export default TriviaGame;
