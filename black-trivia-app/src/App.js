import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import Scoreboard from './components/Scoreboard';
import TriviaGame from './components/TriviaGame';

const App = () => {
    const [timer, setTimer] = useState(20);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [gameConfig, setGameConfig] = useState(null); // Updated in GameConfig
    const [currentTeam, setCurrentTeam] = useState(1);
    const [scores, setScores] = useState({ team1: 0, team2: 0 });

    return (
        <Container
            maxWidth="lg"
            sx={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                position: 'relative',
                background: 'linear-gradient(135deg, #1c1c1e, #343a40)',
                backgroundImage: `url('/path-to-your-image.jpg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: 'white',
            }}
        >
            <Box
                id="page-wrapper"
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay
                    borderRadius: '10px',
                    padding: '20px',
                }}
            >
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
            </Box>
            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '70px',
                    fontSize: '12px',
                    color: 'text.secondary',
                }}
            >
                Project Blvckjvck: Trivia 2024
            </Box>
        </Container>
    );
};

export default App;
