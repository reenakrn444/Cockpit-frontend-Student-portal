import { getRecommendationByScore } from "./TestResultRecomandations";
import { apiPostToken } from "../../api/axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatTime, formatCompletedDate } from "./forrmatTime";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { blue } from "@mui/material/colors";

const TestResultPage = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [expanded, setExpanded] = useState("progress");
  const [testData, setTestData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const [initialPath] = useState(location.pathname);

  const { formattedDate, formattedTime } = formatCompletedDate(new Date());

  const {
    evaluation,
    resultCounts,
    timeTaken,
    activeBook,
    quizId,
    syllabusTitle,
    currentQuestionIndex = 0,
  } = location.state || {};

  const handleAccordionToggle = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getChipColor = (question) => {
    // console.log(question, "question");

    if (question.currectAnswer) return "#22C55E";
    if (question.wrongAnswer) return "#C5322A";
    if (question.skipperAnswer) return theme.palette.primary.skippedBackground;
    return theme.palette.primary.skippedBackground;
  };

  const fetchTestResult = async () => {
    // setTestData([]);

    const response = await apiPostToken("/testAnalysis", { quizId });
    if (response?.data?.status === 200) {
      setTestData(response.data.data || []);
    }
  };
  const chipContainerRef = useRef(null);
  const chipRefs = useRef({});
  // change this to whatever your logic wants

  useEffect(() => {
    if (!isSmallScreen) return; // Only mobile

    if (chipRefs.current[currentQuestionIndex]) {
      chipRefs.current[currentQuestionIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentQuestionIndex, isSmallScreen, testData]);

  useEffect(() => {
    fetchTestResult();
  }, []);

  useEffect(() => {
    // Push a dummy state to the history stack
    window.history.pushState(null, "", window.location.pathname);

    const blockBack = () => {
      // Immediately push current state again — user stays on this page
      window.history.pushState(null, "", window.location.pathname);
    };

    // Listen for back/forward navigation
    window.addEventListener("popstate", blockBack);

    return () => {
      window.removeEventListener("popstate", blockBack);
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h4"
        mb={4}
        sx={{ fontWeight: "bold", color: theme.header.primary.text }}
      >
        {syllabusTitle} , {activeBook}
      </Typography>

      {/* Chips based on testData */}
      <Box
        sx={{
          overflowX: { xs: "auto", sm: "visible" },
          whiteSpace: { xs: "nowrap", sm: "normal" },
          px: { xs: 1, sm: 0 },
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "nowrap", sm: "wrap" },
            gap: 1,
            justifyContent: "flex-start",
          }}
        >
          {testData.map((q, index) => (
            <Box
              key={q._id}
              ref={(el) => (chipRefs.current[index] = el)}
              sx={{ display: "inline-block" }} // very important for scrolling
            >
              <Chip
                label={index + 1}
                sx={{
                  minWidth: 40,
                  flexShrink: 0,
                  backgroundColor: getChipColor(q),
                  color: getChipColor(q) === "#F6F6F6" ? "black" : "white",
                  // border: `${getChipColor(q) === "#F6F6F6" ? 'black' : 'transparent'} 1px solid`,
                  fontWeight: "bold",
                  borderRadius: 2,
                  pointerEvents: "none",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Time Taken */}
      <Typography variant="h6" sx={{ mb: 4 }}>
        <span style={{ color: theme.header.primary.text, fontWeight: "bold" }}>
          Time Taken:
        </span>{" "}
        <span style={{ color: "#EAB308", fontWeight: "bold" }}>
          {formatTime(timeTaken)}
        </span>
      </Typography>
      <Container
        sx={{
          backgroundColor: theme.report.headingReport,
          borderRadius: 2,
          p: 2,
        }}
      >
        {/* Summary */}
        {(() => {
          const total = 50; // or dynamic
          const correct = resultCounts?.correct || 0;
          const incorrect = resultCounts?.incorrect || 0;
          const percentage = Math.round((correct / total) * 100);
          const passed = percentage >= 70;

          const bgColor = passed ? "#E8F5E9" : "#FDECEC";

          return (
            <Box
              sx={{
                backgroundColor: bgColor,
                border: "1px solid #C8E6C9",
                borderRadius: "16px",
                p: 4,
                mb: 4,
              }}
            >
              {/* Top Row: Status + Score */}
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    backgroundColor: passed ? "#c4e8c7" : "#f0d8d8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {passed ? (
                    <CheckCircleIcon sx={{ color: "white", fontSize: 28 }} />
                  ) : (
                    <CancelIcon sx={{ color: "white", fontSize: 28 }} />
                  )}
                </Box>

                <Box>
                  <Typography variant="h5" fontSize="15" fontWeight="bold">
                    {passed ? "Passed" : "Failed"}
                  </Typography>
                  <Typography sx={{ color: passed ? "#22C55E" : "#C5322A" }}>
                    Score: {percentage}%
                  </Typography>
                </Box>
              </Box>

              {/* Stats Row */}
              <Box
                display="flex"
                justifyContent="space-between"
                gap={2}
                flexWrap="wrap"
                mb={3}
              >
                {/* Total Questions */}
                <Paper
                  elevation={0}
                  sx={{
                    flex: 1,
                    minWidth: 200,
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor: "#F3F4F6",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    justifyContent="center"
                  >
                    <RadioButtonCheckedIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2" color="#687a87">
                      Total Questions
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight="bold" mt={1}>
                    {total}
                  </Typography>
                </Paper>

                {/* Correct */}
                <Paper
                  elevation={0}
                  sx={{
                    flex: 1,
                    minWidth: 200,
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor: "#F3F4F6",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <CheckCircleIcon sx={{ color: "#22C55E", fontSize: 18 }} />
                    <Typography variant="body2" color="#687a87">
                      Correct
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mt={1}
                    sx={{ color: "#22C55E", textAlign: "center" }}
                  >
                    {correct}
                  </Typography>
                </Paper>

                {/* Incorrect */}
                <Paper
                  elevation={0}
                  sx={{
                    flex: 1,
                    minWidth: 200,
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor: "#F3F4F6",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    justifyContent="center"
                  >
                    <CancelIcon sx={{ color: "#EF4444", fontSize: 18 }} />
                    <Typography variant="body2" color="#687a87" align="center">
                      Incorrect
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    mt={1}
                    sx={{ color: "#EF4444", textAlign: "center" }}
                  >
                    {incorrect}
                  </Typography>
                </Paper>

                {/* Completed */}
                <Paper
                  elevation={0}
                  sx={{
                    flex: 1,
                    minWidth: 200,
                    p: 2,
                    borderRadius: "12px",
                    backgroundColor: "#F3F4F6",
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    justifyContent="center"
                  >
                    <CalendarTodayIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2" color="#687a87" align="center">
                      Completed
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    mt={1}
                    sx={{ textAlign: "center" }}
                  >
                    {formattedDate}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    {formattedTime}
                  </Typography>
                </Paper>
              </Box>

              {/* Performance Bar */}
              <Box sx={{ mt: 2 }}>
                {/* Label + Percentage Row */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "16px", // 👈 Increased size
                      fontWeight: 500,
                      color: "#475569",
                    }}
                  >
                    Performance
                  </Typography>

                  <Typography fontWeight="bold">{percentage}%</Typography>
                </Box>

                {/* Progress Bar */}
                <Box
                  sx={{
                    height: 10,
                    backgroundColor: "#E5E7EB",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${percentage}%`,
                      height: "100%",
                      backgroundColor: "#EAB308",
                      transition: "width 0.4s ease",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          );
        })()}
        {/* Test Progress Analysis */}
        <Box mt={3}>
          <Accordion
            expanded={expanded === "progress"}
            onChange={handleAccordionToggle("progress")}
            defaultExpanded
            sx={{
              backgroundColor: theme.HomeHeader.homeButton,
              color: "white",
              borderRadius: 1,
            }}
          >
            <AccordionSummary
              expandIcon={
                expanded === "progress" ? (
                  <RemoveIcon
                    sx={{ color: theme.palette.primary.trimesterAcccordian }}
                  />
                ) : (
                  <AddIcon
                    sx={{ color: theme.palette.primary.trimesterAcccordian }}
                  />
                )
              }
            >
              <Typography
                fontWeight="bold"
                sx={{ color: theme.palette.primary.trimester }}
              >
                Test Progress Analysis
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: theme.report.headingReport,
                color: theme.palette.primary.trimesterAcccordianText,
                borderRadius: "0 0 8px 8px",
                px: 2,
                py: 1,
              }}
            >
              {(() => {
                const total = 50;
                const correct = resultCounts?.correct || 0;
                const incorrect = resultCounts?.incorrect || 0;
                const skipped = resultCounts?.skipped || 0;
                const attempted = correct + incorrect;
                const completion = Math.round((attempted / total) * 100);
                const percentage = Math.round((correct / total) * 100);
                const passed = percentage >= 70;
                const recommendation = getRecommendationByScore(percentage);

                return (
                  <>
                    <Typography>
                      Current completion: {completion}% ({attempted}/{total}{" "}
                      questions)
                    </Typography>
                    <Typography>
                      Performance: {percentage}% correct ({correct}/{total})
                    </Typography>
                    <Typography>
                      Result:{" "}
                      <strong style={{ color: passed ? "#28a745" : "#dc3545" }}>
                        {passed ? "Passed" : "Failed"}
                      </strong>
                    </Typography>
                    <Typography mt={1}>
                      Recommendation: {recommendation}
                    </Typography>
                  </>
                );
              })()}
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Test Answer Analysis */}
        <Box mt={2}>
          <Accordion
            expanded={expanded === "answers"}
            onChange={handleAccordionToggle("answers")}
            sx={{
              backgroundColor: theme.HomeHeader.homeButton,
              color: "white",
              borderRadius: 1,
            }}
          >
            <AccordionSummary
              expandIcon={
                expanded === "answers" ? (
                  <RemoveIcon
                    sx={{ color: theme.palette.primary.trimesterAcccordian }}
                  />
                ) : (
                  <AddIcon
                    sx={{ color: theme.palette.primary.trimesterAcccordian }}
                  />
                )
              }
            >
              <Typography
                fontWeight="bold"
                sx={{ color: theme.palette.primary.trimester }}
              >
                Test Answer Analysis
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                maxHeight: 500,
                overflowY: "auto",
                backgroundColor: theme.report.headingReport,
                color: theme.palette.primary.trimesterAcccordianText,
                px: 2,
                py: 1,
                borderRadius: "0 0 8px 8px",
              }}
            >
              {testData.map((q, index) => (
                <Box key={q._id} mb={4}>
                  <Typography fontWeight="bold" mb={1}>
                    {index + 1}. {q.question}
                  </Typography>
                  <ul style={{ paddingLeft: "1.5rem", marginBottom: "0.5rem" }}>
                    {q.options.map((option) => {
                      let color = theme.palette.primary.trimesterAcccordianText;
                      if (option.isCorrect) color = "#A3E635";
                      else if (
                        option.id === q.choosedOption &&
                        !option.isCorrect
                      )
                        color = "#C5322A";

                      return (
                        <li
                          key={option._id}
                          style={{
                            color,
                            fontWeight: option.isCorrect ? "bold" : "normal",
                            fontSize: "16px",
                          }}
                        >
                          {option.text}
                        </li>
                      );
                    })}
                  </ul>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      fontWeight="bold"
                      color="#00000"
                      mt={1}
                      sx={{ fontSize: "16px" }}
                    >
                      ANSWER:
                    </Typography>
                    <Typography
                      color="#A3E635"
                      mt={1}
                      sx={{
                        fontSize: "16px",
                        color: "#A3E635",
                        fontWeight: "bold",
                      }}
                    >
                      {q.options.find((opt) => opt.isCorrect)?.text}
                    </Typography>
                  </Box>

                  {q.explanation && (
                    <Typography
                      variant="body2"
                      mt={1}
                      sx={{ fontSize: "16px" }}
                    >
                      {q.explanation}
                    </Typography>
                  )}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Container>
  );
};

export default TestResultPage;
