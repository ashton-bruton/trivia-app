import React, { useState } from 'react';

const GameConfig = ({ setGameConfig }) => {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [gameLength, setGameLength] = useState(1);
    const [timerDuration, setTimerDuration] = useState(20);
    const [startingDifficulty, setStartingDifficulty] = useState(1);
    const [questionType, setQuestionType] = useState('any'); // Default to any file

    const handleSubmit = (e) => {
        e.preventDefault();
        setGameConfig({
            team1: team1 || 'Red',
            team2: team2 || 'Blue',
            gameLength,
            timerDuration,
            startingDifficulty,
            questionType, // Include question type in config
        });
    };

    return (
        <div style={{ width: '1040px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Game Configuration</h1>
            <form
                onSubmit={handleSubmit}
                id="game-config"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh',
                    width: '50%',
                    margin: 'auto',
                    border: '1px solid #ccc',
                    padding: '20px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                }}
            >
                <label style={{ width: '80%' }}>
                    Team 1 Name:
                    <input
                        type="text"
                        value={team1}
                        onChange={(e) => setTeam1(e.target.value)}
                        style={{ padding: '5px', fontSize: '16px', width: '100%' }}
                    />
                </label>
                <label style={{ width: '80%' }}>
                    Team 2 Name:
                    <input
                        type="text"
                        value={team2}
                        onChange={(e) => setTeam2(e.target.value)}
                        style={{ padding: '5px', fontSize: '16px', width: '100%' }}
                    />
                </label>
                <label style={{ width: '80%' }}>
                    Game Length:
                    <select
                        value={gameLength}
                        onChange={(e) => setGameLength(parseInt(e.target.value, 10))}
                        style={{ padding: '5px', fontSize: '16px', width: '100%' }}
                    >
                        <option value={1}>1</option>
                        <option value={3}>3</option>
                        <option value={5}>5</option>
                        <option value={11}>11</option>
                        <option value={21}>21</option>
                    </select>
                </label>
                <label style={{ width: '80%' }}>
                    Timer Duration (seconds):
                    <input
                        type="number"
                        value={timerDuration}
                        onChange={(e) => setTimerDuration(parseInt(e.target.value, 10))}
                        style={{ padding: '5px', fontSize: '16px', width: '100%', color: 'black', fontWeight: 'bold' }}
                    />
                </label>
                <label style={{ width: '80%' }}>
                    Starting Difficulty:
                    <select
                        value={startingDifficulty}
                        onChange={(e) => setStartingDifficulty(parseInt(e.target.value, 10))}
                        style={{ padding: '5px', fontSize: '16px', width: '100%' }}
                    >
                        <option value={1}>Easy</option>
                        <option value={2}>Medium</option>
                        <option value={3}>Hard</option>
                    </select>
                </label>
                <label style={{ width: '80%' }}>
                    Question Type:
                    <select
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                        style={{ padding: '5px', fontSize: '16px', width: '100%' }}
                    >
                        <option value="any">Any</option>
                        <option value="black-trivia">Black Trivia</option>
                        <option value="sports">Sports</option>
                        <option value="music">Music</option>
                        <option value="politics">Politics</option>
                        <option value="history">History</option>
                        <option value="pop-culture">Pop Culture</option>
                        <option value="literature">Literature</option>
                        <option value="movies">Movies</option>
                        <option value="television">Television</option>
                        <option value="nerd-culture">Nerd Culture</option>
                    </select>
                </label>
                <button
                    type="submit"
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '80%',
                    }}
                >
                    Start Game
                </button>
            </form>
        </div>
    );
};

export default GameConfig;
