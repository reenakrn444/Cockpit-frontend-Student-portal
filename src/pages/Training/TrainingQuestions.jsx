import { apiGet, apiPostToken } from "../../api/axios";
import { snackbarEmitter } from "../../components/snackbar/CustomSnackBar";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const TrainingQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanationInput, setShowExplanationInput] = useState({});
  const [explanations, setExplanations] = useState({});
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const userId = JSON.parse(localStorage.getItem("user"));
  const { syllabusName, bookName, chapterName } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await apiGet("/questions");
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
      q.chapter === chapterName
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const handleOptionChange = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleHelpClick = (questionId) => {
    setCurrentQuestionId(questionId);
    setHelpModalOpen(true);
  };

  const handleReportApiCall = async (questionId, value) => {
    const res = await apiPostToken("/reportQuestion", {
      questionId,
      userId: userId?._id,
      reason: value === "report" ? "" : explanations[questionId],
    });

    if (res?.data?.status === 200) {
      snackbarEmitter("Your request has been submitted successfully.", "success");
      setHelpModalOpen(false);
      setExplanations((prev) => ({ ...prev, [questionId]: "" }));
      setShowExplanationInput((prev) => ({ ...prev, [questionId]: false }));
    } else {
      snackbarEmitter("Failed to submit your request. Please try again.", "error");
      setHelpModalOpen(false);
      setExplanations((prev) => ({ ...prev, [questionId]: "" }));
      setShowExplanationInput((prev) => ({ ...prev, [questionId]: false }));
    }

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
    const res = await apiPostToken("/submitAllAnswers", {
      userId: userId?._id,
      answers: selectedAnswers,
    });

    if (res?.data?.status === 200) {
      snackbarEmitter("All answers submitted successfully.", "success");
    } else {
      snackbarEmitter("Failed to submit answers.", "error");
    }
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" textAlign="center" fontFamily="Exo">
            Discover Our DGCA Question Banks
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            color="#183251"
            fontFamily="Exo"
          >
            {chapterName}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {paginatedQuestions.map((question, index) => (
            <Grid size={{ xs: 12, }} key={question._id || index}>
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
                  {question.options.map((option, idx) => (
                    <Box key={idx} sx={{ display: "flex", alignItems: "center" }}>
                      <Radio
                        checked={selectedAnswers[question._id] === idx}
                        onChange={() => handleOptionChange(question._id, idx)}
                        value={idx}
                        name={`question-${question._id}`}
                        sx={{
                          color:
                            selectedAnswers[question._id] === idx
                              ? option.isCorrect
                                ? "green"
                                : "red"
                              : "default",
                          "&.Mui-checked": {
                            color:
                              selectedAnswers[question._id] === idx
                                ? option.isCorrect
                                  ? "green"
                                  : "red"
                                : "default",
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          color:
                            selectedAnswers[question._id] === idx
                              ? option.isCorrect
                                ? "green"
                                : "red"
                              : "inherit",
                        }}
                      >
                        {option.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {selectedAnswers[question._id] !== undefined && (
                  <>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        sx={{
                          borderRadius: 5,
                          backgroundColor: "orange",
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
                  </>
                )}

                {showExplanationInput[question._id] && (
                  <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                      placeholder="Write your Explanation"
                      fullWidth
                      size="small"
                      value={explanations[question._id] || ""}
                      onChange={(e) => handleExplanationChange(question._id, e.target.value)}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleSubmitExplanation(question._id)}
                    >
                      Submit
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>

        {Object.keys(selectedAnswers).length === filteredQuestions.length && (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="success" 
            onClick={handleSubmitAllAnswers}>
              Submit All Answers
            </Button>
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
    </Container>
  );
};

export default TrainingQuestion;
