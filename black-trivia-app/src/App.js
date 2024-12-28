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
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #1c1c1e, #343a40)',
                backgroundImage: `url('/path-to-your-image.jpg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: 'white',
                overflow: 'hidden', // Ensures no extra content spills
            }}
        >
            {/* Sticky Scoreboard */}
            {gameConfig && (
                <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Semi-transparent backdrop for clarity
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', // Add slight shadow
                    }}
                >
                    <Scoreboard
                        timer={timer}
                        gameConfig={gameConfig}
                        currentTeam={currentTeam}
                        scores={scores}
                    />
                </Box>
            )}

            {/* Main Content */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto', // Allows scrolling for main content
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay for readability
                        borderRadius: '10px',
                        padding: '20px',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
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
                </Container>
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    textAlign: 'right',
                    padding: '10px 20px',
                    fontSize: '12px',
                    color: 'text.secondary',
                }}
            >
                Project Blvckjvck: Trivia 2024
            </Box>
        </Box>
    );
};

export default App;
