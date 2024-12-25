import React, { useState, useEffect } from 'react';
import questions from '../assets/json/questions.json';
import '../styles/main.css';

const TriviaQuestion = ({
    currentTeam,
    setCurrentTeam,
    gameConfig,
    setIsTimerRunning,
    timer,
    setTimer,
    nextQuestionFlag,
    setNextQuestionFlag,
    scores,
    setScores,
    checkGameOver, // Ensure this is passed from TriviaGame
}) => {
    const [currentQuestionPool, setCurrentQuestionPool] = useState(questions);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [answers, setAnswers] = useState([]);

    // Select a random question when nextQuestionFlag changes
    useEffect(() => {
        if (currentQuestionPool.length > 0 && !nextQuestionFlag) {
            const randomIndex = Math.floor(Math.random() * currentQuestionPool.length);
            const question = currentQuestionPool[randomIndex];
            setCurrentQuestion(question);
            setAnswers([...question.incorrect_answers, question.answer].sort(() => Math.random() - 0.5));
            setCurrentQuestionPool((prevPool) => prevPool.filter((_, index) => index !== randomIndex));
        }
    }, [nextQuestionFlag]); // Remove `currentQuestionPool` to avoid unnecessary updates

    // Timer logic
    useEffect(() => {
        if (!nextQuestionFlag && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timer === 0) {
            setFeedback(`Time's up! The correct answer is: ${currentQuestion?.answer}`);
            setNextQuestionFlag(true);
        }
    }, [timer, nextQuestionFlag, setTimer, currentQuestion]); // Ensure dependencies are correct

    // Handle answer selection
    const handleAnswerClick = (answer) => {
        setIsTimerRunning(false);
    
        if (answer === currentQuestion.answer) {
            setScores(currentTeam === 1 ? 'team1' : 'team2');
            setFeedback('Correct!');
        } else {
            setFeedback(`Incorrect! The correct answer is: ${currentQuestion.answer}`);
        }
    
        setNextQuestionFlag(true);
    };
    

    // Handle moving to the next question
    const handleNextQuestion = () => {
        setNextQuestionFlag(false);
        setFeedback('');
        setSelectedAnswer(null);
        setTimer(20);
        setCurrentTeam((prevTeam) => (prevTeam === 1 ? 2 : 1)); // Alternate teams
    };

    if (!currentQuestion) return <p>Loading...</p>;

    return (
        <div id="trivia-question" style={{ textAlign: 'center', width: '80%', margin: '0 auto', paddingTop: '100px' }}>
            {!nextQuestionFlag ? (
                <>
                    <h2 className="question">{currentQuestion.question}</h2>
                    <div className="answers" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {answers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(answer)}
                                className={selectedAnswer === answer ? 'selected' : ''}
                                style={{ padding: '10px', borderRadius: '5px', textAlign: 'center' }}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <div className="feedback" style={{ textAlign: 'center', width: '80%', margin: '0 auto', marginTop: '150px', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p>{feedback}</p>
                    {currentQuestion.content_type === 'youtube_video' && (
                        <iframe
                            src={`${currentQuestion.content}&autoplay=1`}
                            title="Question Content"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ width: '100%', height: '70%' }}
                        ></iframe>
                    )}
                    <button onClick={handleNextQuestion} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}>Next Question</button>
                </div>
            )}
        </div>
    );
};

export default TriviaQuestion;
