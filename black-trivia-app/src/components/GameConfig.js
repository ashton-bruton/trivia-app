// src/components/GameConfig.js

import React, { useState } from 'react';

const GameConfig = ({ setGameConfig }) => {
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [gameLength, setGameLength] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            team1: team1 || 'Red',
            team2: team2 || 'Blue',
            gameLength,
        };
        console.log("GameConfig Submitted:", config); // Debugging
        setGameConfig(config);
    };
    

    return (
        <div style={{ width: '1040px', paddingTop: '100px' }}>
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
                <label style={{ marginBottom: '10px', width: '80%' }}>
                    Team 1 Name:
                    <input
                        type="text"
                        value={team1}
                        onChange={(e) => setTeam1(e.target.value)}
                        style={{ padding: '5px', fontSize: '16px', width: '100%' }}
                    />
                </label>
                <label style={{ marginBottom: '10px', width: '80%' }}>
                    Team 2 Name:
                    <input
                        type="text"
                        value={team2}
                        onChange={(e) => setTeam2(e.target.value)}
                        style={{ padding: '5px', fontSize: '16px', width: '100%' }}
                    />
                </label>
                <label style={{ marginBottom: '10px', width: '80%' }}>
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
