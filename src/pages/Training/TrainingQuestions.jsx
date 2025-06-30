import { apiGet, apiPostToken } from "../../api/axios";
import { snackbarEmitter } from "../../components/snackbar/CustomSnackBar";
import { CustomButton } from "../../components";
import { toCapitalize } from "../../Helper/convertUpperCase";
import ScrollToTop from "../../components/ScrollToTop";

const TrainingQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanationInput, setShowExplanationInput] = useState({});
  const [explanations, setExplanations] = useState({});
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [attempted, setAttempted] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);


  const questionsPerPage = 50;
  const navigate = useNavigate();
  const location = useLocation();
  const { syllabusTitle, syllabusId, bookId, chapterId, activeBook } = location.state;
  const userId = JSON.parse(localStorage.getItem("user"));
  const { syllabusName, bookName, chapterName } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await apiGet(`/questionsByChapterId/${chapterId}`);
        setQuestions(response.data.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const filteredQuestions = questions.filter(
    (q) =>
      q.syllabus === syllabusName &&
      q.book === bookName &&
      q.chapter === chapterName &&
      q.isactive === true
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const handleOptionChange = (questionId, optionIndex) => {
    if (selectedAnswers.hasOwnProperty(questionId)) return;

    const question = filteredQuestions.find((q) => q._id === questionId);
    const isCorrect = question?.options?.[optionIndex]?.isCorrect;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));

    setAttempted((prev) => ({
      ...prev,
      [questionId]: isCorrect ? "correct" : "wrong",
    }));
  };

  const handleHelpClick = (questionId) => {
    setCurrentQuestionId(questionId);
    setHelpModalOpen(true);
  };

  const handleReportApiCall = async (questionId, value) => {
    setLoading(true);
    const res = await apiPostToken("/reportQuestion", {
      questionId,
      userId: userId?._id,
      reason: value === "report" ? "" : explanations[questionId],
    });

    if (res?.data?.status === 200) {
      snackbarEmitter("Your request has been submitted successfully.", "success");
    } else {
      snackbarEmitter("Failed to submit your request. Please try again.", "error");
    }

    setLoading(false);
    setHelpModalOpen(false);
    setExplanations((prev) => ({ ...prev, [questionId]: "" }));
    setShowExplanationInput((prev) => ({ ...prev, [questionId]: false }));
  };

  const handleReport = async () => {
    handleReportApiCall(currentQuestionId, "report");
  };

  const handleSubmitExplanation = async (questionId) => {
    handleReportApiCall(questionId, "fileAnswer");
  };

  const handleFileAnswer = () => {
    setShowExplanationInput((prev) => ({
      ...prev,
      [currentQuestionId]: true,
    }));
    setHelpModalOpen(false);
  };

  const handleExplanationChange = (questionId, value) => {
    setExplanations((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmitAllAnswers = async () => {
    const res = await apiPostToken("/task/createTask", {
      title: "Complete Chapter 1",
      description: "Finish the first chapter of the book",
      userId: userId?._id,
      syllabusId,
      chapterId,
      bookId,
      taskProgress: "completed",
      taskCompletionDate: new Date().toISOString().slice(0, 10),
    });

    if (res?.data?.status === 200) {
      snackbarEmitter("All answers submitted successfully.", "success");
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      // navigate("/chapter", {
      //   state: {
      //     title: syllabusTitle,
      //     id: syllabusId,
      //     activeBookTab: activeBook,
      //     activeBookId: bookId,
      //   },
      // });
    } else {
      snackbarEmitter("Failed to submit answers.", "error");
    }
  };

  const correctCount = Object.values(attempted).filter((val) => val === "correct").length;
  const wrongCount = Object.values(attempted).filter((val) => val === "wrong").length;
  const totalAttempted = correctCount + wrongCount;
  const percentage = totalAttempted
  ? Math.round((correctCount / totalAttempted) * 100)
  : 0;

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 12 }}>
          {/* <Typography variant="h4" textAlign="left">
            {`${toCapitalize(syllabusTitle)}, ${toCapitalize(bookName)} Question Banks`}
          </Typography> */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
            <Box
              onClick={() => navigate("/chapter", {
                state: {
                  title: syllabusTitle,
                  id: syllabusId,
                  activeBookTab: activeBook,
                  activeBookId: bookId,
                },
              })}
              sx={{ display: "flex", alignItems: "center", cursor: "pointer", color: "#183251" }}
            >
              <ArrowBackIcon sx={{ mr: 0.5 }} />
            </Box>
            <Typography variant="h4" textAlign="left">
              {toCapitalize(syllabusTitle)} &gt;{" "}
              <Box
                component="span"
                onClick={() => navigate("/chapter", {
                  state: {
                    title: syllabusTitle,
                    id: syllabusId,
                    activeBookTab: activeBook,
                    activeBookId: bookId,
                  },
                })}
                sx={{
                  cursor: "pointer", color: "#183251",
                  // textDecoration: "underline" 
                }}
              >
                {toCapitalize(bookName)}
              </Box>{" "}
              &gt; Question Banks
            </Typography>
          </Box>

          {/* chapter Name */}
          <Typography
            variant="h5"
            textAlign="center"
            sx={{
              color: "#EAB308",
              fontWeight: 700,
              letterSpacing: "2px",
              fontSize: "40px",
              textTransform: "uppercase",
              mt: 2,
            }}
          >
            {chapterName}
          </Typography>

          {/* Result section */}
          {isSubmitted && (
            <Box
              sx={{
                border: "1px solid #A5A4A4",
                borderRadius: "6px",
                maxWidth: "xl",
                overflow: "hidden",
                m: 3,
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  backgroundColor: "#67A304",
                  color: "#E2E8F0",
                  fontWeight: "bold",
                  fontSize: 21,
                  p: 1,
                  pl: 2,
                  textAlign: "left",
                }}
              >
                RESULT
              </Box>

              {/* Content */}

              <Grid container alignItems="center" justifyContent="center">
                <Grid
                  item
                  size={{ xs: 6 }}
                  sx={{
                    my: 1,
                    pl: { xs: 1, sm: 15 },
                    textAlign: "center",
                    borderRight: { xs: "1px solid #C0BEBE", sm: "1px solid #C0BEBE" },
                  }}
                >
                  <Typography
                    sx={{ color: "#183251", fontWeight: 700, fontSize: 18 }}
                  >
                    Total Score
                  </Typography>
                  <Box sx={{ my: 1, backgroundColor: "#C0BEBE", borderBottom: { xs: "1px solid #C0BEBE", sm: "1px solid #C0BEBE" }, }} />
                  <Typography sx={{ fontSize: 24 }}>
                    <Box component="span" sx={{ color: "#72B701", fontWeight: "bold" }}>
                      {correctCount}/
                    </Box>
                    {/* <Box component="span" sx={{ color: "#72B701", fontWeight: "bold" }}>
              /
            </Box> */}
                    <Box component="span" sx={{ color: "#183251", fontWeight: "bold" }}>
                      {filteredQuestions.length}
                    </Box>
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 6 }} sx={{ my: 1, pr: { xs: 1, sm: 15 }, textAlign: "center" }}>
                  <Typography
                    sx={{ color: "#183251", fontWeight: 700, fontSize: 18 }}
                  >
                    Percentage
                  </Typography>
                  <Box sx={{ my: 1, backgroundColor: "#C0BEBE", borderBottom: { xs: "1px solid #C0BEBE", sm: "1px solid #C0BEBE" }, }} />
                  <Typography
                    sx={{
                      color: "#72B701",
                      fontWeight: "bold",
                      fontSize: 24,
                    }}
                  >
                    {percentage}%
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
      {/* Questions Section */}

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {paginatedQuestions?.map((question, index) => (
            <Grid size={{ xs: 12 }} key={question._id || index}>
              <Box sx={{ border: "1px solid #ccc", borderRadius: 2 }}>
                <Box
                  sx={{
                    bgcolor: "#183251",
                    py: "10px",
                    px: 2,
                    borderRadius: "8px 8px 0 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" color="white">
                    {index + 1 + (currentPage - 1) * questionsPerPage}. {question.question}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, px: 2 }}>
                  {question?.options?.map((option, idx) => (
                    <Box key={idx} sx={{ display: "flex", alignItems: "center" }}>
                      <Radio
                        checked={selectedAnswers[question._id] === idx}
                        disabled={selectedAnswers.hasOwnProperty(question._id)}
                        onChange={() => handleOptionChange(question._id, idx)}
                        value={idx}
                        name={`question-${question._id}`}
                        sx={{
                          color:
                            selectedAnswers.hasOwnProperty(question._id)
                              ? option.isCorrect
                                ? "green"
                                : selectedAnswers[question._id] === idx
                                  ? "red"
                                  : "default"
                              : "default",
                          "&.Mui-checked": {
                            color:
                              selectedAnswers.hasOwnProperty(question._id)
                                ? option.isCorrect
                                  ? "green"
                                  : selectedAnswers[question._id] === idx
                                    ? "red"
                                    : "default"
                                : "default",
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          color:
                            selectedAnswers.hasOwnProperty(question._id)
                              ? option.isCorrect
                                ? "green"
                                : selectedAnswers[question._id] === idx
                                  ? "red"
                                  : "inherit"
                              : "inherit",
                        }}
                      >
                        {option.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* ✅ Always show explanation after answer selected */}
                {selectedAnswers.hasOwnProperty(question._id) && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{
                        borderRadius: 5,
                        backgroundColor: "#EAB308",
                        width: "auto",
                        px: 2,
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Answer
                    </Typography>
                    <Typography variant="body2">{question.explanation}</Typography>
                  </Box>
                )}

                {selectedAnswers.hasOwnProperty(question._id) && userId && (
                  <Box
                    sx={{
                      py: "10px",
                      px: 2,
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      onClick={() => handleHelpClick(question._id)}
                      sx={{ color: "#0081D7", cursor: "pointer", textDecoration: "underline" }}
                    >
                      Help?
                    </Typography>
                  </Box>
                )}

                {showExplanationInput[question._id] && (
                  <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" color="#0081D7">
                      File your answer
                    </Typography>
                    <TextField
                      placeholder="Write your Explanation"
                      fullWidth
                      size="small"
                      value={explanations[question._id] || ""}
                      onChange={(e) => handleExplanationChange(question._id, e.target.value)}
                    />
                    <CustomButton
                      variant="contained"
                      type="submit"
                      bgColor="#EAB308"
                      sx={{ width: "fit-content" }}
                      loading={loading}
                      onClick={() => handleSubmitExplanation(question._id)}
                    >
                      Submit
                    </CustomButton>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          {filteredQuestions.length > 0 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => {
                setCurrentPage(value);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              sx={{
                "& .MuiPaginationItem-root": {
                  "&.Mui-selected": {
                    backgroundColor: "#112b4b",
                    color: "#ffffff",
                    fontWeight: "bold",
                  },
                },
              }}
            />
          )}
        </Box>

        {/* <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 4 }}>
          <Typography variant="body1" color="green">
            Correct: {correctCount}
          </Typography>
          <Typography variant="body1" color="red">
            Wrong: {wrongCount}
          </Typography>
          <Typography variant="body1">Total Attempted: {totalAttempted}</Typography>
          <Typography variant="body1" fontWeight="bold">
            Accuracy: {percentage}%
          </Typography>
        </Box> */}

        {filteredQuestions.length > 0 &&
          Object.keys(selectedAnswers).length === filteredQuestions.length &&
          userId && (
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <CustomButton
                variant="contained"
                bgColor="#EAB308"
                sx={{ width: "fit-content" }}
                loading={loading}
                onClick={handleSubmitAllAnswers}
              >
                Submit All Answers
              </CustomButton>
            </Box>
          )}
      </Box>

      <Modal open={helpModalOpen} onClose={() => setHelpModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Select your Requirement
          </Typography>
          <Typography
            onClick={handleReport}
            sx={{ cursor: "pointer", mb: 1, "&:hover": { fontWeight: "bold" } }}
          >
            Report this question
          </Typography>
          <Typography
            onClick={handleFileAnswer}
            sx={{ cursor: "pointer", "&:hover": { fontWeight: "bold" } }}
          >
            File your answer
          </Typography>
        </Box>
      </Modal>
      <ScrollToTop />
    </Container>
  );
};

export default TrainingQuestion;

