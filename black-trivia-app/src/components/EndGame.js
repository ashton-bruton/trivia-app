import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const EndGame = ({ winner, resetGame, iframeContent }) => {
    console.log("IFRAME CONTENT " + iframeContent);

    return (
        <Box
            className="end-game-container"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: '20px',
                backgroundColor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Typography variant="h3" sx={{ marginBottom: '20px' }}>
                Congratulations, {winner}!
            </Typography>
            {iframeContent && (
                <Box
                    component="iframe"
                    src={`${iframeContent}&autoplay=1`}
                    title="Winning Content"
                    sx={{
                        width: '80%',
                        height: '50%',
                        border: 0,
                        marginBottom: '20px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        borderRadius: '8px',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></Box>
            )}
            <Button
                onClick={resetGame}
                variant="contained"
                color="error"
                sx={{
                    fontSize: '1.2rem',
                    padding: '10px 30px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                }}
            >
                Reset Game
            </Button>
        </Box>
    );
};

export default EndGame;
