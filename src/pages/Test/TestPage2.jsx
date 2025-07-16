import { apiPostToken } from '../../api/axios';
import TestFooter from './TestPageFooter';
import TestHeader from './TestPageHeader';
import { formatTime } from './forrmatTime';

function TestPage2() {
    const location = useLocation();
    const navigate = useNavigate();
    const { activeBook, syllabusTitle, syllabusId, bookId } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [markedForReview, setMarkedForReview] = useState({});
    const [skip, setSkip] = useState({});
    const [visitedQuestions, setVisitedQuestions] = useState({});
    const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes
    const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
    const [evaluation, setEvaluation] = useState({});
    const [resultCounts, setResultCounts] = useState({ correct: 0, incorrect: 0, skipped: 0 });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [quizId, setQuizId] = useState('');

    useEffect(() => {
        const fetchTestQuestions = async () => {
            try {
                const req = { syllabusId, bookId };
                const response = await apiPostToken('/testQuestionsByBookId', req);
                setQuestions(response.data.data || []);
                setQuizId(response?.data?.data[0]?.quizId || ''); // Set quizId from response

                // ✅ Start timer after data is fetched
                const newTimer = setInterval(() => {
                    setTimeLeft((prev) => {
                        if (prev <= 1) {
                            clearInterval(newTimer);
                            setTimeout(() => confirmSubmit(), 0); // auto-submit on timeout
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                // Cleanup timer on unmount
                return () => clearInterval(newTimer);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchTestQuestions();
    }, [activeBook, syllabusTitle]);

    // Prevent browser back navigation
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };
        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // const formatTime = (seconds) => {
    //     const minutes = Math.floor(seconds / 60);
    //     const secs = seconds % 60;
    //     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    // };

    const handleOptionSelect = (questionId, optionId) => {
        setSelectedOptions((prev) => ({ ...prev, [questionId]: optionId }));
    };

    const handleMarkForReview = (questionId) => {
        setMarkedForReview((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    };

    const handleSkip = (questionId) => {
        setSkip((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    };

    // NEW: centralize question change to track visited
    const goToQuestion = (index) => {
        const currentId = questions[currentQuestionIndex]?._id;
        if (currentId) {
            setVisitedQuestions((prev) => ({ ...prev, [currentId]: true }));
        }
        setCurrentQuestionIndex(index);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            goToQuestion(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            goToQuestion(currentQuestionIndex - 1);
        }
    };

    const handleReset = () => {
        const currentQuestionId = questions[currentQuestionIndex]?._id;
        if (!currentQuestionId) return;

        setSelectedOptions((prev) => {
            const updated = { ...prev };
            delete updated[currentQuestionId];
            return updated;
        });

        setMarkedForReview((prev) => {
            const updated = { ...prev };
            delete updated[currentQuestionId];
            return updated;
        });

        setSkip((prev) => {
            const updated = { ...prev };
            delete updated[currentQuestionId];
            return updated;
        });
    };

    const handleSubmit = useCallback(() => {
        setOpenSubmitDialog(true);
    }, []);

    const getChipColor = (index, questionId) => {
        const result = evaluation[questionId];
        if (result === 'correct') return '#22C55E';
        if (result === 'incorrect') return 'red';
        if (result === 'skipped') return 'white';
        if (markedForReview[questionId]) return '#A855F7';
        if (skip[questionId]) return '#000000';
        if (selectedOptions[questionId]) return '#A3E635';
        return '#F6F6F6';
    };

    const getChipBackgroundColor = (index, questionId) => {
        const result = evaluation[questionId];
        if (result === 'correct') return '#22C55E';
        if (result === 'incorrect') return 'red';
        if (result === 'skipped') return 'white';

        // ✅ Yellow if visited, not answered, not marked, not skipped, and not current
        if (
            visitedQuestions[questionId] &&
            !selectedOptions[questionId] &&
            !markedForReview[questionId] &&
            !skip[questionId] &&
            index !== currentQuestionIndex
        ) {
            return '#EAB308';
        }
        if (index === currentQuestionIndex) return '#0D76F3';
        if (markedForReview[questionId]) return '#A855F7';
        if (skip[questionId]) return 'white';
        if (selectedOptions[questionId]) return '#A3E635';
        return '#F6F6F6';
    };

    const confirmSubmit = async () => {
        try {
            const evalResult = {};
            let correct = 0, incorrect = 0, skipped = 0;

            const questionsList = questions.map((question) => {
                const selected = selectedOptions[question._id];
                const isMarked = markedForReview[question._id];
                const isSkippedFlag = skip[question._id];

                const isSkipped =
                    !selected && isSkippedFlag && !isMarked ? true : false;

                const isAnswered =
                    !!selected && !isMarked ? true : false;

                const choosedOption = isAnswered ? selected : null;

                // Evaluation
                if (!selected) {
                    evalResult[question._id] = 'skipped';
                    skipped++;
                } else {
                    const chosenOption = question.options.find(
                        (opt) => opt.id === selected
                    );
                    if (chosenOption?.isCorrect) {
                        evalResult[question._id] = 'correct';
                        correct++;
                    } else {
                        evalResult[question._id] = 'incorrect';
                        incorrect++;
                    }
                }

                return {
                    question: question.question,
                    options: question.options,
                    explanation: question.explanation,
                    isAnswered,
                    isSkipped,
                    choosedOption,

                };
            });

            const payload = {
                syllabusId,
                syllabus: syllabusTitle,
                bookId,
                book: activeBook,
                quizId: quizId,
                userId: JSON.parse(localStorage.getItem('user'))._id,
                questionsList,
            };

            console.log(payload, "payload");

            const response = await apiPostToken('/testResults', payload);

            console.log('Submit response:', response);
            if (response?.data?.status === 200) {
                console.log('Test submitted successfully');
                navigate('/test-result', {
                    state: {
                        evaluation: evalResult,
                        resultCounts: { correct, incorrect, skipped },
                        timeTaken: (90 * 60) - timeLeft,
                        syllabusTitle,
                        activeBook,
                        quizId,
                        questionsList
                    },
                });
            }
            // setEvaluation(evalResult);
            // setResultCounts({ correct, incorrect, skipped });
            // setOpenSubmitDialog(false);
            // setIsSubmitted(true);
            // setTimeTaken((90 * 60) - timeLeft);
        } catch (error) {
            console.error('Error during evaluation and submission:', error);
        }
    };


    return (
        <>
            <TestHeader />
            <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
                <Typography variant="h4" mb={4} sx={{ fontWeight: 'bold' }}>
                    {syllabusTitle} , {activeBook}
                </Typography>

                <Box sx={{ overflowX: { xs: 'auto', sm: 'visible' }, whiteSpace: { xs: 'nowrap', sm: 'normal' }, px: { xs: 1, sm: 0 }, mb: 4 }}>
                    <Box sx={{ display: 'flex', flexWrap: { xs: 'nowrap', sm: 'wrap' }, gap: 1, justifyContent: 'flex-start' }}>
                        {questions.map((question, index) => (
                            <Chip
                                key={question._id}
                                label={index + 1}
                                onClick={() => goToQuestion(index)}
                                sx={{
                                    cursor: 'pointer',
                                    minWidth: 50,
                                    backgroundColor: getChipBackgroundColor(index, question._id),
                                    color: getChipColor(index, question._id) === "#000000" || getChipColor(index, question._id) === "#F6F6F6" ? "black" : 'white',
                                    fontWeight: 'bold',
                                    borderRadius: 2,
                                    borderColor: getChipBackgroundColor(index, question._id),
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                <Typography variant="h6" sx={{ mb: 4 }}>
                    <span style={{ color: '#183251', fontWeight: 'bold' }}>Time Left:</span>{' '}
                    <span style={{ color: '#EAB308', fontWeight: 'bold' }}>{formatTime(timeLeft)}</span>
                </Typography>

                {questions.length > 0 && (
                    <Paper sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'grey.400' }}>
                        <Typography sx={{ fontSize: '18px' }}>
                            <span style={{ color: 'white', backgroundColor: '#183251', borderRadius: '50%', padding: '3px', display: 'inline-block', textAlign: 'center', width: '30px', height: '30px' }}>
                                {currentQuestionIndex + 1}
                            </span>{' '}
                            <span style={{ color: '#183251', fontWeight: '600', marginLeft: '10px' }}>
                                {questions[currentQuestionIndex]?.question}
                            </span>
                        </Typography>

                        <FormControl component="fieldset" sx={{ mt: 2 }}>
                            <RadioGroup
                                value={selectedOptions[questions[currentQuestionIndex]._id] || ''}
                                onChange={(e) =>
                                    handleOptionSelect(questions[currentQuestionIndex]._id, parseInt(e.target.value))
                                }
                            >
                                {questions[currentQuestionIndex]?.options?.map((option) => (
                                    <FormControlLabel key={option._id} value={option.id} control={<Radio />} label={option.text}
                                        sx={{
                                            px: 2,
                                            borderRadius: 1,
                                            color:
                                                selectedOptions[questions[currentQuestionIndex]._id] === option.id
                                                    ? '#A3E635'
                                                    : 'inherit',
                                            '& .MuiTypography-root': {
                                                color:
                                                    selectedOptions[questions[currentQuestionIndex]._id] === option.id
                                                        ? '#A3E635'
                                                        : 'inherit',
                                            },
                                            '& .MuiRadio-root': {
                                                color:
                                                    selectedOptions[questions[currentQuestionIndex]._id] === option.id
                                                        ? '#A3E635'
                                                        : 'default',
                                            },
                                            '& .Mui-checked': {
                                                color: '#A3E635',
                                            },
                                        }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                )}

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
                    <Button variant="outlined" onClick={handlePrevious} sx={{ backgroundColor: "#183251", color: "white" }}>Previous</Button>
                    <Button variant="outlined" onClick={handleNext} sx={{ backgroundColor: "#183251", color: "white" }}>Next</Button>
                    <Button variant="outlined" onClick={handleReset} sx={{ backgroundColor: "#C5322A", color: "white" }}>Reset</Button>
                    <Button onClick={() => handleSkip(questions[currentQuestionIndex]?._id)} sx={{ border: '1px solid #183251', color: "#183251" }}>Skip</Button>
                    <Button onClick={() => handleMarkForReview(questions[currentQuestionIndex]?._id)} sx={{ backgroundColor: "#A855F7", color: "white" }}>
                        {markedForReview[questions[currentQuestionIndex]?._id] ? 'Unmark Review' : 'Mark for Review'}
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: "#C5322A", color: "white" }}>Submit</Button>
                </Stack>
            </Container>

            <TestFooter />

            <Dialog open={openSubmitDialog} onClose={() => setOpenSubmitDialog(false)}>
                <DialogTitle>Confirm Submission</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to submit the test?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSubmitDialog(false)} sx={{ border: '1px solid #183251', color: '#183251' }}>No</Button>
                    <Button onClick={confirmSubmit} variant="contained" sx={{ backgroundColor: '#183251', color: 'white' }}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TestPage2;
