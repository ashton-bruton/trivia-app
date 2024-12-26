import React, { useState, useEffect } from 'react';
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
    checkGameOver,
    askedQuestions,
    setAskedQuestions,
}) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [answers, setAnswers] = useState([]);
    const [questionPool, setQuestionPool] = useState([]);

    // Helper function to dynamically load question files
    const loadQuestions = async () => {
        try {
            let questions = [];
            const { questionType } = gameConfig;

            if (questionType === 'any') {
                const files = [
                    import('../assets/json/black-trivia.json'),
                    import('../assets/json/sports.json'),
                    import('../assets/json/music.json'),
                    import('../assets/json/politics.json'),
                    import('../assets/json/history.json'),
                    import('../assets/json/pop-culture.json'),
                    import('../assets/json/literature.json'),
                    import('../assets/json/movies.json'),
                    import('../assets/json/television.json'),
                    import('../assets/json/nerd-culture.json'),
                ];

                const allQuestions = await Promise.all(files);
                questions = allQuestions.flatMap((module) => module.default);
            } else {
                const file = await import(`../assets/json/${questionType}.json`);
                questions = file.default;
            }

            setQuestionPool(questions);
        } catch (error) {
            console.error('Error loading questions:', error);
        }
    };

    // Determine difficulty level
    const determineDifficulty = () => {
        if (gameConfig?.startingDifficulty) return gameConfig.startingDifficulty;

        const totalQuestions = gameConfig?.gameLength || questionPool.length;
        const progress = askedQuestions.length / totalQuestions;

        if (progress < 0.33) return 1; // Start easy
        if (progress < 0.66) return 2; // Move to medium
        return 3; // End with hard
    };

    // Select a random question based on difficulty and exclude `askedQuestions`
    useEffect(() => {
        if (!nextQuestionFlag) {
            const difficulty = determineDifficulty();
            const availableQuestions = questionPool.filter(
                (q) => q.challenge === difficulty && !askedQuestions.includes(`questions-${q.id}`)
            );

            if (availableQuestions.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableQuestions.length);
                const question = availableQuestions[randomIndex];
                setCurrentQuestion(question);
                setAnswers([...question.incorrect_answers, question.answer].sort(() => Math.random() - 0.5));
            } else {
                setCurrentQuestion(null); // No more questions available
            }
        }
    }, [nextQuestionFlag, askedQuestions, questionPool]);

    // Load questions on game start or when question type changes
    useEffect(() => {
        if (gameConfig) {
            loadQuestions();
        }
    }, [gameConfig]);

    // Timer logic
    useEffect(() => {
        if (!nextQuestionFlag && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else if (timer === 0) {
            setFeedback(`Time's up! The correct answer is: ${currentQuestion?.answer}`);
            markQuestionAsAsked(currentQuestion?.id);
            setNextQuestionFlag(true);
        }
    }, [timer, nextQuestionFlag, setTimer, currentQuestion]);

    const markQuestionAsAsked = (questionId) => {
        if (questionId) {
            const questionKey = `questions-${questionId}`;
            if (!askedQuestions.includes(questionKey)) {
                setAskedQuestions((prev) => [...prev, questionKey]);
            }
        }
    };

    const handleAnswerClick = (answer) => {
        setIsTimerRunning(false);

        if (answer === currentQuestion.answer) {
            setScores(currentTeam === 1 ? 'team1' : 'team2');
            setFeedback('Correct!');
        } else {
            setFeedback(`Incorrect! The correct answer is: ${currentQuestion.answer}`);
        }

        markQuestionAsAsked(currentQuestion?.id);
        setNextQuestionFlag(true);
    };

    const handleSkip = () => {
        markQuestionAsAsked(currentQuestion?.id);
        setSelectedAnswer(null);
        setFeedback('');
        setNextQuestionFlag(false);
        setTimer(gameConfig?.timerDuration || 20);
    };

    const handleNextQuestion = () => {
        setNextQuestionFlag(false);
        setFeedback('');
        setSelectedAnswer(null);
        setTimer(gameConfig?.timerDuration || 20);
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
                    <button
                        onClick={handleSkip}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#FFA500',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Skip Question
                    </button>
                </>
            ) : (
                <div className="feedback" style={{ textAlign: 'center', width: '80%', margin: '0 auto', marginTop: '150px', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p>{feedback}</p>
                    {currentQuestion?.content_type === 'youtube_video' && (
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
