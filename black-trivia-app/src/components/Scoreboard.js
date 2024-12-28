import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Scoreboard = ({ timer, gameConfig, currentTeam, scores }) => {
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <Box
            id="scoreboard-container"
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: 'background.default', // Using dark theme background
                color: 'text.primary', // Theme text color
                padding: '20px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 1000, // Higher z-index to ensure it appears above other elements
            }}
        >
            {/* Team 1 Score */}
            <Paper
                elevation={currentTeam === 1 ? 4 : 1}
                sx={{
                    padding: '15px',
                    borderRadius: '8px',
                    backgroundColor: currentTeam === 1 ? 'primary.main' : 'background.paper', // Theme colors
                    color: currentTeam === 1 ? 'text.primary' : 'text.primary',
                    flex: 1,
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 'bold',
                        color: currentTeam === 1 ? 'text.primary' : 'inherit', // Dark text for active team
                    }}
                >
                    {gameConfig.team1}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        color: currentTeam === 1 ? 'text.primary' : 'inherit', // Dark text for active team
                    }}
                >
                    Score: {scores.team1}
                </Typography>
            </Paper>

            {/* Timer */}
            <Box
                id="timer-message-container"
                sx={{
                    flex: 1,
                    textAlign: 'center',
                }}
            >
                <Typography
                    id="timer"
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: {
                            xs: '1.5rem',
                            sm: '2rem',
                            md: '3rem',
                        },
                        color: 'secondary.main', // Timer color from theme
                    }}
                >
                    {formatTime(timer)}
                </Typography>
            </Box>

            {/* Team 2 Score */}
            <Paper
                elevation={currentTeam === 2 ? 4 : 1}
                sx={{
                    padding: '15px',
                    borderRadius: '8px',
                    backgroundColor: currentTeam === 2 ? 'primary.main' : 'background.paper', // Theme colors
                    color: currentTeam === 2 ? 'text.primary' : 'text.primary',
                    flex: 1,
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 'bold',
                        color: currentTeam === 2 ? 'text.primary' : 'inherit', // Dark text for active team
                    }}
                >
                    {gameConfig.team2}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        color: currentTeam === 2 ? 'text.primary' : 'inherit', // Dark text for active team
                    }}
                >
                    Score: {scores.team2}
                </Typography>
            </Paper>
        </Box>
    );
};

export default Scoreboard;
