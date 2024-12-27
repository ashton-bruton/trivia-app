import React from 'react';
import '../styles/main.css';

const Feedback = ({ feedback, currentQuestion, handleNextQuestion }) => {
    return (
        <div className="feedback">
            <p>{feedback}</p>
            {currentQuestion.content_type === 'youtube_video' && (
                <iframe
                    src={currentQuestion.content}
                    title="Question Content"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="feedback-iframe"
                ></iframe>
            )}
            <button onClick={handleNextQuestion} className="feedback-button">Next Question</button>
        </div>
    );
};

export default Feedback;
