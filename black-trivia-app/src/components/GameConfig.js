import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';

const GameConfig = ({ setGameConfig }) => {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [gameLength, setGameLength] = useState(1);
    const [timerDuration, setTimerDuration] = useState(20);
    const [startingDifficulty, setStartingDifficulty] = useState(0);
    const [questionType, setQuestionType] = useState('any');

    const handleSubmit = (e) => {
        e.preventDefault();
        setGameConfig({
            team1: team1 || 'Red',
            team2: team2 || 'Blue',
            gameLength,
            timerDuration,
            startingDifficulty,
            questionType,
        });
    };

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '83vh',
                overflow: 'hidden',
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* Animated Background */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle, rgba(63,81,181,0.5) 0%, rgba(255,69,0,0.3) 40%, rgba(0,0,0,0) 80%)`,
                    animation: 'move 15s linear infinite',
                    zIndex: 0,
                    '@keyframes move': {
                        '0%': { transform: 'translateY(-5%)' },
                        '50%': { transform: 'translateY(5%)' },
                        '100%': { transform: 'translateY(-5%)' },
                    },
                }}
            />

            {/* Game Configuration Form */}
            <Container
                maxWidth="sm"
                sx={{
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: 'background.paper',
                    boxShadow: '0px 4px 20px rgba(0,0,0,0.4)',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Typography variant="h4" color="primary" gutterBottom>
                    Game Configuration
                </Typography>
                <form onSubmit={handleSubmit} id="game-config">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginBottom: '20px',
                        }}
                    >
                        <TextField
                            label="Team 1 Name"
                            variant="outlined"
                            fullWidth
                            value={team1}
                            onChange={(e) => setTeam1(e.target.value)}
                        />
                        <TextField
                            label="Team 2 Name"
                            variant="outlined"
                            fullWidth
                            value={team2}
                            onChange={(e) => setTeam2(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <InputLabel>Game Length</InputLabel>
                            <Select
                                value={gameLength}
                                onChange={(e) =>
                                    setGameLength(parseInt(e.target.value, 10))
                                }
                                label="Game Length"
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                                <MenuItem value={21}>21</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Timer Duration (seconds)"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={timerDuration}
                            onChange={(e) =>
                                setTimerDuration(parseInt(e.target.value, 10))
                            }
                        />
                        <FormControl fullWidth>
                            <InputLabel>Starting Difficulty</InputLabel>
                            <Select
                                value={startingDifficulty}
                                onChange={(e) =>
                                    setStartingDifficulty(parseInt(e.target.value, 10))
                                }
                                label="Starting Difficulty"
                            >
                                <MenuItem value={0}>Any</MenuItem>
                                <MenuItem value={1}>Easy</MenuItem>
                                <MenuItem value={2}>Medium</MenuItem>
                                <MenuItem value={3}>Hard</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Question Type</InputLabel>
                            <Select
                                value={questionType}
                                onChange={(e) => setQuestionType(e.target.value)}
                                label="Question Type"
                            >
                                <MenuItem value="any">Any</MenuItem>
                                <MenuItem value="black-trivia">Black Trivia</MenuItem>
                                <MenuItem value="sports">Sports</MenuItem>
                                <MenuItem value="music">Music</MenuItem>
                                <MenuItem value="politics">Politics</MenuItem>
                                <MenuItem value="history">History</MenuItem>
                                <MenuItem value="pop-culture">Pop Culture</MenuItem>
                                <MenuItem value="literature">Literature</MenuItem>
                                <MenuItem value="movies">Movies</MenuItem>
                                <MenuItem value="television">Television</MenuItem>
                                <MenuItem value="nerd-culture">Nerd Culture</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundImage:
                                'linear-gradient(to right, #ff5722, #ff9800)',
                            boxShadow: '0px 4px 6px rgba(255, 87, 34, 0.3)',
                        }}
                    >
                        Start Game
                    </Button>
                </form>
            </Container>
        </Box>
    );
};

export default GameConfig;
