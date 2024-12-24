// src/components/Scoreboard.js

import React from 'react';
import '../styles/main.css';

const Scoreboard = ({ timer, gameConfig, currentTeam, scores }) => {
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div
            id="scoreboard-container"
            style={{
                textAlign: 'center',
                position: 'fixed',
                top: 0,
                width: '100%',
                backgroundColor: 'white',
                zIndex: 10,
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                left: '0px'
            }}
        >
            <div
                id="scoreboard"
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                    
                }}
            >
                <div
                    className="team"
                    style={{
                        boxShadow: currentTeam === 1 ? '0 0 15px 5px yellow' : 'none',
                        padding: '10px',
                        borderRadius: '5px',
                        flex: '1',
                        textAlign: 'center',
                    }}
                >
                    <h3>{gameConfig.team1}</h3>
                    <p>Score: {scores.team1}</p>
                </div>
                <div id="timer-message-container" style={{ flex: '1', textAlign: 'center' }}>
                    <div
                        id="timer"
                        style={{
                            fontSize: '70px',
                            fontWeight: 'bold',
                        }}
                    >
                        {formatTime(timer)}
                    </div>
                </div>
                <div
                    className="team"
                    style={{
                        boxShadow: currentTeam === 2 ? '0 0 15px 5px yellow' : 'none',
                        padding: '10px',
                        borderRadius: '5px',
                        flex: '1',
                        textAlign: 'center',
                    }}
                >
                    <h3>{gameConfig.team2}</h3>
                    <p>Score: {scores.team2}</p>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;
