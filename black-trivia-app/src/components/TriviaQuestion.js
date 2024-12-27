import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Grid,
} from '@mui/material';

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
                    { filename: 'black-trivia', module: import('../assets/json/black-trivia.json') },
                    { filename: 'sports', module: import('../assets/json/sports.json') },
                    { filename: 'music', module: import('../assets/json/music.json') },
                    { filename: 'politics', module: import('../assets/json/politics.json') },
                    { filename: 'history', module: import('../assets/json/history.json') },
                    { filename: 'pop-culture', module: import('../assets/json/pop-culture.json') },
                    { filename: 'literature', module: import('../assets/json/literature.json') },
                    { filename: 'movies', module: import('../assets/json/movies.json') },
                    { filename: 'television', module: import('../assets/json/television.json') },
                    { filename: 'nerd-culture', module: import('../assets/json/nerd-culture.json') },
                ];

                const allQuestions = await Promise.all(
                    files.map(async ({ filename, module }) => {
                        const data = await module;
                        return data.default.map((q) => ({ ...q, filename })); // Attach filename to each question
                    })
                );

                questions = allQuestions.flat();
            } else {
                const file = await import(`../assets/json/${questionType}.json`);
                questions = file.default.map((q) => ({ ...q, filename: questionType })); // Attach filename to each question
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
                (q) => q.challenge === difficulty && !askedQuestions.includes(`${q.filename}-${q.id}`)
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
            markQuestionAsAsked(currentQuestion);
            setNextQuestionFlag(true);
        }
    }, [timer, nextQuestionFlag, setTimer, currentQuestion]);

    const markQuestionAsAsked = (question) => {
        if (question) {
            const questionKey = `${question.filename}-${question.id}`; // Format: {filename}-{id}
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

        markQuestionAsAsked(currentQuestion);
        setNextQuestionFlag(true);
    };

    const handleSkip = () => {
        markQuestionAsAsked(currentQuestion);
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

    if (!currentQuestion) return <CircularProgress />;

    return (
        <Box sx={{ textAlign: 'center', width: '80%', margin: '0 auto', paddingTop: {xs: '25px', sm: '75px', md: '75px',} }}>
            {!nextQuestionFlag ? (
                <>
                    <Typography variant="h3" className="question" sx={{ fontSize: {
                                        xs: '1.5rem',
                                        sm: '2rem',
                                        md: '3rem',
                                    } }}>
                        {currentQuestion.question}
                    </Typography>
                    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                        {answers.map((answer, index) => (
                            <Grid item xs={12} sm={12} md={12} key={index}>
                                <Button
                                    variant={selectedAnswer === answer ? 'contained' : 'outlined'}
                                    onClick={() => handleAnswerClick(answer)}
                                    fullWidth
                                    sx={{ fontSize: {
                                        xs: '1rem',
                                        sm: '1.5rem',
                                        md: '2rem',
                                    } }}
                                >
                                    {answer}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        onClick={handleSkip}
                        sx={{ mt: 2 }}
                        variant="contained"
                        color="warning"
                    >
                        Skip Question
                    </Button>
                </>
            ) : (
                <Box className="feedback" sx={{ mt: 4 }}>
                    <Typography variant="h5">{feedback}</Typography>
                    {currentQuestion?.content_type === 'youtube_video' && (
                        <iframe
                            src={`${currentQuestion.content}&autoplay=1`}
                            title="Question Content"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ width: '100%', height: '400px', marginTop: '20px' }}
                        ></iframe>
                    )}
                    <Button
                        onClick={handleNextQuestion}
                        sx={{ mt: 2 }}
                        variant="contained"
                        color="primary"
                    >
                        Next Question
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default TriviaQuestion;
