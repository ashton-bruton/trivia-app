import React from 'react';
import { Box, Button } from '@mui/material';
import useGameLogic from '../scripts/useGameLogic';

const Controls = () => {
    const { incrementScore, resetScores } = useGameLogic();

    return (
        <Box
            id="controls"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                marginTop: '20px',
            }}
        >
            {/* Add Point to Red Team */}
            <Button
                variant="contained"
                color="error"
                onClick={() => incrementScore('red')}
                sx={{ width: '200px', padding: '10px', fontSize: '16px' }}
            >
                Add Point to Red
            </Button>

            {/* Add Point to Blue Team */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => incrementScore('blue')}
                sx={{ width: '200px', padding: '10px', fontSize: '16px' }}
            >
                Add Point to Blue
            </Button>

            {/* Reset Scores */}
            <Button
                variant="outlined"
                color="secondary"
                onClick={resetScores}
                sx={{ width: '200px', padding: '10px', fontSize: '16px' }}
            >
                Reset Scores
            </Button>
        </Box>
    );
};

export default Controls;
