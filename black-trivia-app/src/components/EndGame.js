// src/components/EndGame.js

import React from 'react';

const EndGame = ({ winner, resetGame, iframeContent }) => {
    console.log("IFRAME CONTENT " + iframeContent);
    return (
        <div style={{ textAlign: 'center', width: '80%', margin: '0 auto', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Congratulations, {winner}!</h1>
            {iframeContent && (
                <iframe
                    src={`${iframeContent}&autoplay=1`}
                    title="Winning Content"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', height: '50%', marginBottom: '20px' }}
                ></iframe>
            )}
            <button
                onClick={resetGame}
                style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Reset Game
            </button>
        </div>
    );
};

export default EndGame;