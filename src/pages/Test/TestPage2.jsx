import { apiPostToken } from "../../api/axios";
import TestFooter from "./TestPageFooter";
import TestHeader from "./TestPageHeader";
import { formatTime } from "./forrmatTime";
import { snackbarEmitter } from "../../components/snackbar/CustomSnackBar";
import { HeaderLogo } from "../Home/ImagesRender";

function TestPage2() {
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { activeBook, syllabusTitle, syllabusId, bookId } =
    location.state || {};
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [skip, setSkip] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [evaluation, setEvaluation] = useState({});
  const [resultCounts, setResultCounts] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [quizId, setQuizId] = useState("");
  const [openReviewWarning, setOpenReviewWarning] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isContentBlocked, setIsContentBlocked] = useState(false);

  const confirmSubmit = async () => {
    try {
      const evalResult = {};
      let correct = 0,
        incorrect = 0,
        skipped = 0;

      const questionsList = questions.map((question) => {
        const selected = selectedOptions[question._id];
        const isMarked = markedForReview[question._id];
        const isSkippedFlag = skip[question._id];

        const isSkipped =
          !selected && isSkippedFlag && !isMarked ? true : false;

        const isAnswered = !!selected && !isMarked ? true : false;

        const choosedOption = isAnswered ? selected : null;

        // Evaluation
        if (!selected) {
          evalResult[question._id] = "skipped";
          skipped++;
        } else {
          const chosenOption = question.options.find(
            (opt) => opt.id === selected
          );
          if (chosenOption?.isCorrect) {
            evalResult[question._id] = "correct";
            correct++;
          } else {
            evalResult[question._id] = "incorrect";
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
        userId: JSON.parse(localStorage.getItem("user"))._id,
        questionsList,
      };

      // console.log(payload, "payload");

      const response = await apiPostToken("/testResults", payload);

      // console.log("Submit response:", response);
      if (response?.data?.status === 200) {
        document.removeEventListener("fullscreenchange", onExit);
        // console.log("Test submitted successfully");
        navigate("/test-result", {
          state: {
            evaluation: evalResult,
            resultCounts: { correct, incorrect, skipped },
            timeTaken: 90 * 60 - timeLeft,
            syllabusTitle,
            activeBook,
            quizId,
            questionsList,
          },
        });
      }
      // setEvaluation(evalResult);
      // setResultCounts({ correct, incorrect, skipped });
      // setOpenSubmitDialog(false);
      // setIsSubmitted(true);
      // setTimeTaken((90 * 60) - timeLeft);
    } catch (error) {
      console.error("Error during evaluation and submission:", error);
    }
  };

  // console.log("book id", bookId);

  useEffect(() => {
    const fetchTestQuestions = async () => {
      try {
        setLoading(true);
        const req = { syllabusId, bookId };
        const response = await apiPostToken("/testQuestionsByBookId", req);
        // setQuestions(response.data.data || []);
        const questionData = response?.data?.data;

        // console.log("Fetched questions:", questionData);

        // setQuizId(response?.data?.data[0]?.quizId || ""); // Set quizId from response

        if (Array.isArray(questionData)) {
          setQuestions(questionData);

          if (questionData.length > 0) {
            setQuizId(questionData[0]?.quizId || "");
          } else {
            console.warn("Question array is empty");
            setQuizId("");
          }
        } else {
          console.warn("API did not return an array:", questionData);
          setQuestions([]);
          setQuizId("");
        }
        setLoading(false);
        // ✅ Start timer after data is fetched
        // const newTimer = setInterval(() => {
        //   setTimeLeft((prev) => {
        //     if (prev <= 1) {
        //       clearInterval(newTimer);
        //       // setTimeout(() => confirmSubmit(), 0); // auto-submit on timeout
        //       return 0;
        //     }
        //     return prev - 1;
        //   });
        // }, 1000);

        // // Cleanup timer on unmount
        // return () => clearInterval(newTimer);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
        setQuizId("");
        setLoading(false);
      }
    };
    fetchTestQuestions();
  }, [activeBook, syllabusTitle]);

  useEffect(() => {
    if (timeLeft === 0 && quizId && questions.length > 0) {
      confirmSubmit();
    }
  }, [timeLeft, quizId, questions]);

  // Prevent browser back navigation
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const onExit = () => {
    snackbarEmitter(
      "Exiting fullscreen is not allowed. Your test may be terminated.",
      "error"
    );

    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  //    Handling test terms and conditions
  useEffect(() => {
    const enterFullscreen = () => {
      const el = document.documentElement;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    };

    enterFullscreen();

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onExit(); //  ⬅ call your function here
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // useEffect(() => {
  //   let violationCount = 0;

  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       violationCount++;
  //       snackbarEmitter(
  //         `Tab switch detected! This may lead to auto-submission.`,
  //         "warning"
  //       );
  //       // alert(`Tab switch detected! Warning ${violationCount}/3`);
  //       if (violationCount >= 1) {
  //         confirmSubmit();
  //         snackbarEmitter(
  //           "Too many violations. Your test will be auto-submitted.",
  //           "error"
  //         );
  //       }
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [confirmSubmit]);
  useEffect(() => {
    let triggered = false;

    const handleViolation = () => {
      if (triggered) return;
      triggered = true;

      // 🔒 INSTANTLY HIDE CONTENT
      setIsContentBlocked(true);

      snackbarEmitter(
        "Screenshot / tab switch detected. Test will be submitted.",
        "error"
      );

      // ⏱ submit AFTER UI hides
      setTimeout(() => {
        confirmSubmit();
      }, 500);
    };

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        handleViolation();
      }
    });

    window.addEventListener("pagehide", handleViolation);

    return () => {
      document.removeEventListener("visibilitychange", handleViolation);
      window.removeEventListener("pagehide", handleViolation);
    };
  }, [confirmSubmit]);

  useEffect(() => {
    const blockKeys = (e) => {
      if (
        e.ctrlKey ||
        e.metaKey ||
        ["F12", "F5"].includes(e.key) ||
        (e.key === "u" && e.ctrlKey)
      ) {
        e.preventDefault();
        snackbarEmitter(
          "Keyboard shortcuts are disabled during the test.",
          "warning"
        );
      }
    };

    const disableContextMenu = (e) => e.preventDefault();

    document.addEventListener("keydown", blockKeys);
    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleOffline = () => {
      snackbarEmitter(
        "You lost internet connection. Please reconnect quickly to avoid submission issues.",
        "warning"
      );
    };

    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const isCompatibleBrowser = () => {
      const ua = navigator.userAgent;
      return /Chrome|Firefox|Edg/.test(ua);
    };

    if (!isCompatibleBrowser()) {
      snackbarEmitter(
        "Please use Google Chrome, Firefox, or Edge for the best experience.",
        "error"
      );
    }

    // if (!window.navigator.javaEnabled()) {
    //     alert("JavaScript must be enabled to take the test.");
    // }
  }, []);

  useEffect(() => {
    // console.log(
    //   "Monitoring active: time tracking, tab switches, keyboard use, and fullscreen enforcement."
    // );
  }, []);

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // const handleMarkForReview = (questionId) => {
  //     setMarkedForReview((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  //     handleNext();
  // };

  const handleSkip = (questionId) => {
    if (!questionId) return;

    setSkip((prev) => ({
      ...prev,
      [questionId]: true,
    }));

    setVisitedQuestions((prev) => ({
      ...prev,
      [questionId]: true,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleMarkForReview = (questionId) => {
    const isMarked = markedForReview[questionId];
    const isSelected = !!selectedOptions[questionId];

    if (!isMarked && !isSelected) {
      // Show dialog if no option selected when marking
      setOpenReviewWarning(true);
      return;
    }

    // Toggle mark for review
    setMarkedForReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));

    // If unmarked (just turned false), mark as answered (green)
    if (isMarked) {
      setSkip((prev) => {
        const updated = { ...prev };
        delete updated[questionId];
        return updated;
      });
    }

    handleNext();
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

  // const getChipColor = (index, questionId) => {
  //     const isCurrent = index === currentQuestionIndex;
  //     const isMarked = markedForReview[questionId];
  //     const isSkipped = skip[questionId];
  //     const isSelected = selectedOptions[questionId];

  //     if (isCurrent) return 'white'; // text color for current question
  //     if (isMarked || isSelected) return 'white'; // text color for marked or answered
  //     return 'black'; // default text color
  // };

  const getChipColor = (index, questionId) => {
    const isCurrent = index === currentQuestionIndex;
    const isMarked = markedForReview[questionId];
    const isSkipped = skip[questionId];
    const isSelected = selectedOptions[questionId];
    const isVisited = visitedQuestions[questionId];

    // Always white for current
    if (isCurrent) return "#white";

    // Skipped → black text
    if (isSkipped) return theme.palette.primary.skippedText;

    // Not visited at all → black
    if (!isVisited && !isMarked) return theme.palette.primary.skippedText;

    if (isSelected) {
      return theme.palette.mode === "dark" ? "#000000" : "#ffffff";
    }
    // All others (answered, marked, not-answered but visited) → white
    return "white";
  };

  const getChipBackgroundColor = (index, questionId) => {
    const result = evaluation[questionId];
    if (result === "correct") return "#22C55E";
    if (result === "incorrect") return "red";
    if (result === "skipped") return theme.palette.primary.skippedBackground;

    // ✅ Yellow if visited, not answered, not marked, not skipped, and not current
    if (
      visitedQuestions[questionId] &&
      !selectedOptions[questionId] &&
      !markedForReview[questionId] &&
      !skip[questionId] &&
      index !== currentQuestionIndex
    ) {
      return "#EAB308";
    }
    if (index === currentQuestionIndex) return "#0D76F3";
    if (markedForReview[questionId]) return "#A855F7";
    if (!markedForReview[questionId] && selectedOptions[questionId])
      return "#22C55E";
    if (skip[questionId]) return theme.palette.primary.skippedBackground;
    if (selectedOptions[questionId]) return "#22C55E";
    return theme.palette.primary.skippedBackground;
  };

  if (loading) {
    return (
      <>
        <TestHeader />
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={60} />
        </Box>
        <TestFooter />
      </>
    );
  }

  return (
    <>
      <TestHeader />
      <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 4 } }}>
        <Typography
          variant="h4"
          mb={4}
          sx={{ fontWeight: "bold", color: theme.header.primary.text }}
        >
          {syllabusTitle} , {activeBook}
        </Typography>

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
            {questions.map((question, index) => (
              <Chip
                key={question._id}
                label={index + 1}
                onClick={() => goToQuestion(index)}
                sx={{
                  cursor: "pointer",
                  minWidth: 50,
                  backgroundColor: getChipBackgroundColor(index, question._id),
                  color: getChipColor(index, question._id),
                  // color: getChipColor(index, question._id) === "#000000" || getChipColor(index, question._id) === "#F6F6F6" ? "black" : 'white',
                  fontWeight: "bold",
                  borderRadius: 2,
                  borderColor: skip[question._id]
                    ? "black"
                    : getChipBackgroundColor(index, question._id),
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            <span
              style={{ color: theme.header.primary.text, fontWeight: "bold" }}
            >
              Time Left:
            </span>{" "}
            <span style={{ color: "#EAB308", fontWeight: "bold" }}>
              {formatTime(timeLeft)}
            </span>
          </Typography>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#22C55E",
              color: "white",
              textTransform: "none",
              display: { xs: "block", sm: "none" },
            }}
          >
            Submit
          </Button>
        </Box>

        <div
          id="exam-content"
          style={{
            opacity: isContentBlocked ? 0 : 1,
            pointerEvents: isContentBlocked ? "none" : "auto",
            transition: "opacity 0.1s ease",
          }}
        >
          {isContentBlocked ? (
            <Box
              sx={{
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "20px",
                fontWeight: "bold",
                color: "red",
                border: "1px solid #ccc",
                borderRadius: 2,
              }}
            >
              Content hidden due to policy violation
            </Box>
          ) : (
            questions.length > 0 && (
              <Paper
                sx={{
                  p: 3,
                  mb: 2,
                  border: "1px solid",
                  borderColor: "grey.400",
                }}
              >
                <Typography sx={{ fontSize: "18px" }}>
                  <span
                    style={{
                      color: theme.palette.primary.skippedBackground,
                      backgroundColor: theme.palette.primary.testQuestion,
                      borderRadius: "50%",
                      padding: "3px",
                      display: "inline-block",
                      textAlign: "center",
                      width: "30px",
                      height: "30px",
                    }}
                  >
                    {currentQuestionIndex + 1}
                  </span>{" "}
                  <span
                    style={{
                      color: theme.palette.primary.testQuestion,
                      fontWeight: "600",
                      marginLeft: "10px",
                    }}
                  >
                    {questions[currentQuestionIndex]?.question}
                  </span>
                </Typography>

                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <RadioGroup
                    value={
                      selectedOptions[questions[currentQuestionIndex]._id] || ""
                    }
                    onChange={(e) =>
                      handleOptionSelect(
                        questions[currentQuestionIndex]._id,
                        parseInt(e.target.value)
                      )
                    }
                  >
                    {questions[currentQuestionIndex]?.options?.map((option) => (
                      // <FormControlLabel
                      //   key={option._id}
                      //   value={option.id}
                      //   control={<Radio />}
                      //   label={option.text}
                      //   sx={{
                      //     px: 2,
                      //     borderRadius: 1,
                      //     color:
                      //       selectedOptions[
                      //         questions[currentQuestionIndex]._id
                      //       ] === option.id
                      //         ? "#A3E635"
                      //         : "inherit",
                      //     "& .MuiTypography-root": {
                      //       color:
                      //         selectedOptions[
                      //           questions[currentQuestionIndex]._id
                      //         ] === option.id
                      //           ? "#A3E635"
                      //           : "inherit",
                      //     },
                      //     "& .MuiRadio-root": {
                      //       color:
                      //         selectedOptions[
                      //           questions[currentQuestionIndex]._id
                      //         ] === option.id
                      //           ? "#A3E635"
                      //           : "default",
                      //     },
                      //     "& .Mui-checked": {
                      //       color: "#A3E635",
                      //     },
                      //   }}
                      // />
                      <Box
                        key={option._id}
                        onClick={() =>
                          handleOptionSelect(
                            questions[currentQuestionIndex]._id,
                            option.id
                          )
                        }
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "22px 1fr",
                          alignItems: "start",
                          columnGap: "6px",
                          cursor: "pointer",
                          py: "2px",
                        }}
                      >
                        <Radio
                          checked={
                            selectedOptions[
                              questions[currentQuestionIndex]._id
                            ] === option.id
                          }
                          value={option.id}
                          disableRipple
                          sx={{
                            padding: 0,
                            marginTop: "3px", // 🔥 KEY FIX — lifts radio exactly
                            height: "20px",
                            width: "20px",
                            color:
                              selectedOptions[
                                questions[currentQuestionIndex]._id
                              ] === option.id
                                ? "#A3E635"
                                : "default",
                            "&.Mui-checked": {
                              color: "#A3E635",
                            },
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: "15px",
                            lineHeight: 1.45,
                            color:
                              selectedOptions[
                                questions[currentQuestionIndex]._id
                              ] === option.id
                                ? "#A3E635"
                                : "inherit",
                          }}
                        >
                          {option.text}
                        </Typography>
                      </Box>
                    ))}
                  </RadioGroup>
                </FormControl>
              </Paper>
            )
          )}
        </div>
        {/* now */}

        <Box display={{ xs: "block", sm: "none" }} sx={{ mt: 3, mb: 4 }}>
          <Stack spacing={2}>
            {/* Row 1 */}
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                sx={{
                  backgroundColor:
                    currentQuestionIndex === 0
                      ? "grey.400"
                      : theme.header.primary.main,
                  color: "white",
                  textTransform: "none",
                }}
              >
                Previous
              </Button>

              <Button
                fullWidth
                onClick={() => handleSkip(questions[currentQuestionIndex]?._id)}
                sx={{
                  backgroundColor: theme.palette.primary.trimesterAcccordian,
                  color: theme.palette.primary.skippedText,
                  textTransform: "none",
                }}
              >
                Skip
              </Button>

              <Button
                fullWidth
                onClick={handleNext}
                disabled={currentQuestionIndex === questions.length - 1}
                sx={{
                  backgroundColor:
                    currentQuestionIndex === questions.length - 1
                      ? "grey.400"
                      : theme.header.primary.main,
                  color: "white",
                  textTransform: "none",
                }}
              >
                Next
              </Button>
            </Stack>

            {/* Row 2 */}
            <Stack
              direction="row"
              justifyContent="center"
              gap={4}
              sx={{
                pl: "15%",
              }}
            >
              <Button
                onClick={handleReset}
                sx={{
                  width: 120,
                  backgroundColor: "#C5322A",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Reset
              </Button>

              <Button
                onClick={() =>
                  handleMarkForReview(questions[currentQuestionIndex]?._id)
                }
                sx={{
                  width: 170,
                  backgroundColor: "#A855F7",
                  color: "white",
                  textTransform: "none",
                }}
              >
                {markedForReview[questions[currentQuestionIndex]?._id]
                  ? "Unmark Review"
                  : "Mark as Review"}
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            mt: 3,
            mb: 4,
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        >
          {/* Disable Previous button for the first question */}
          <Button
            variant="outlined"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            sx={{
              backgroundColor:
                currentQuestionIndex === 0
                  ? "grey.400"
                  : theme.header.primary.main,
              color: "white",
              textTransform: "none",
              "&.Mui-disabled": {
                backgroundColor: "grey.300",
                color: "#888",
              },
            }}
          >
            Previous
          </Button>

          {/* Disable Next button for the last question */}
          <Button
            variant="outlined"
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            sx={{
              backgroundColor:
                currentQuestionIndex === questions.length - 1
                  ? "grey.400"
                  : theme.header.primary.main,
              color: "white",
              textTransform: "none",
              "&.Mui-disabled": {
                backgroundColor: "grey.300",
                color: "#888",
              },
            }}
          >
            Next
          </Button>

          <Button
            variant="outlined"
            onClick={handleReset}
            sx={{
              backgroundColor: "#C5322A",
              color: "white",
              textTransform: "none",
            }}
          >
            Reset
          </Button>

          <Button
            onClick={() => handleSkip(questions[currentQuestionIndex]?._id)}
            sx={{
              border: `1px solid ${theme.palette.primary.trimesterAcccordianText}`,
              backgroundColor: theme.palette.primary.trimesterAcccordian,
              color: theme.palette.primary.skippedText,
              textTransform: "none",
            }}
          >
            Skip
          </Button>

          <Button
            onClick={() =>
              handleMarkForReview(questions[currentQuestionIndex]?._id)
            }
            sx={{
              backgroundColor: "#A855F7",
              color: "white",
              textTransform: "none",
            }}
          >
            {markedForReview[questions[currentQuestionIndex]?._id]
              ? "Unmark Review"
              : "Mark for Review"}
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#22C55E",
              color: "white",
              textTransform: "none",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Container>

      <TestFooter />

      <Dialog
        open={openSubmitDialog}
        onClose={() => setOpenSubmitDialog(false)}
      >
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit the test?
          </DialogContentText>
          <DialogContentText>
            Please ensure that all questions marked for review have been
            addressed before submitting
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenSubmitDialog(false)}
            sx={{
              backgroundColor: "#183251",
              color: "white",
              textTransform: "none",
            }}
          >
            No
          </Button>
          <Button
            onClick={confirmSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#183251",
              color: "white",
              textTransform: "none",
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* mark as review dailog box */}
      <Dialog
        open={openReviewWarning}
        onClose={() => setOpenReviewWarning(false)}
      >
        <DialogTitle>Mark for Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please choose an option before marking this question for review.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenReviewWarning(false)}
            sx={{ textTransform: "none" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TestPage2;
