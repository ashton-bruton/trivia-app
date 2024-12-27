import React from 'react';
import { Box, Button } from '@mui/material';

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
        <Box
            id="timer-controls"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                marginTop: '20px',
            }}
        >
            {/* Start/Stop Button */}
            <Button
                variant="contained"
                color={isTimerRunning ? 'secondary' : 'primary'}
                onClick={handleStartStop}
                sx={{ padding: '10px 20px', fontSize: '16px' }}
            >
                {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
            </Button>

            {/* Reset Button */}
            <Button
                variant="outlined"
                color="error"
                onClick={handleReset}
                sx={{ padding: '10px 20px', fontSize: '16px' }}
            >
                Reset Timer
            </Button>
        </Box>
    );
};

export default TimerControls;
