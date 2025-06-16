import { useParams } from "react-router-dom";

import "./training.css";
import { apiGet } from "../../api/axios";

const TrainingQuestion = () => {
  const [questions, setQuestions] = useState([]);

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

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const handleOptionChange = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontFamily: "Exo" }}
          >
            Discover Our DGCA Question Banks
          </Typography>
          <Typography
            variant="h5"
            
            sx={{ textAlign: "center", color: "#183251",fontFamily: "Exo" }}
          >
            {chapterName}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {filteredQuestions.map((question, index) => (
            <Grid key={question.id || index} size={{ xs: 6, md: 8 }}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 2,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#183251",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "white" }}>
                    {index + 1}. {question.question}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  {question.options.map((option, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
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
                  <Box
                    mt={2}
                    sx={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{
                        borderRadius: 5,
                        backgroundColor: "orange",
                        width: "10%",
                        padding: "7px",
                        alignItems: "center",
                      }}
                    >
                      Answer
                    </Typography>
                    <Typography variant="body2">
                      {question.explanation}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default TrainingQuestion;
