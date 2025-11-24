import { apiGet, apiPostToken } from "../../api/axios";
import { toCapitalize } from "../../Helper/convertUpperCase";

const Syllabus = ({ handleClick, syllabusType }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [syllabus, setSyllabus] = useState([]);
  const [countResult, setCountResult] = useState();
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("user"));
  const [userSyllabuses, setUserSyllabuses] = useState([]);
  const [showSubscribeCard, setShowSubscribeCard] = useState(false);
  const [subscriptionDaysLeft, setSubscriptionDaysLeft] = useState(null);

  useEffect(() => {
    const fetchFlightLogData = async () => {
      try {
        const requestBody = {
          fromDate: userData?.userRegisteredDate,
          toDate: new Date().toISOString(),
        };
        const response = await apiPostToken("/countTotalTest", requestBody);
        setCountResult(response?.data?.data?.completedTest || 0);
      } catch (error) {}
    };

    const fetchSyllabus = async () => {
      try {
        const response = await apiGet("/getSyllabus");
        setSyllabus(response.data.data);
        getStudentProgress();
      } catch (error) {
        console.error("Error fetching syllabus:", error);
      }
    };

    const getStudentProgress = async () => {
      try {
        const response = await apiGet(
          `/task/studentTaskProgress?userId=${userData._id}`
        );
        if (response?.data?.status === 200) {
          setUserSyllabuses(response?.data?.data?.syllabuses || []);
        }
      } catch (err) {}
    };

    fetchFlightLogData();
    fetchSyllabus();

    if (userData?.isSubscribed && userData?.subscriptionEndDate) {
      const now = new Date();
      const end = new Date(userData.subscriptionEndDate);
      const diffInMs = end - now;
      const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      setSubscriptionDaysLeft(days);
    }
  }, []);

  const isButtonDisabledForTraining = (index) => {
    if (token) return false;
    return index >= 2;
  };

  const shouldDisableTestButton = (index) => {
    if (!token) return false;

    const { isSubscribed, subscriptionEndDate } = userData || {};
    const now = new Date();
    const end = new Date(subscriptionEndDate);

    if (isSubscribed && end < now) return true;
    if (isSubscribed && end >= now) return false;
    if (!isSubscribed && countResult >= 3) return true;
    return false;
  };

  useEffect(() => {
    if (!token || !userData) return;

    const { isSubscribed, subscriptionEndDate } = userData;

    const isPlanExpired =
      isSubscribed && new Date(subscriptionEndDate) < new Date();
    const isFreeTestLimitReached = !isSubscribed && countResult >= 3;

    if (isFreeTestLimitReached && !isPlanExpired) {
      setShowSubscribeCard(true);
    }
  }, [countResult, syllabusType, token, userData]);

  return (
    <Box sx={{ backgroundColor: theme.syllabus.background }}>
      <Container maxWidth="xl">
        <Box sx={{ py: 5 }} p={5}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography
                variant="h4"
                fontWeight={700}
                color={theme.header.primary.main}
                mb={2}
              >
                Discover Our DGCA Question Banks
              </Typography>
              <Typography
                variant="body1"
                color={theme.header.primary.secondary}
                fontSize={18}
                mb={4}
              >
                Practice Questions for Air Navigation, Meteorology, Technical
                General, Regulation & More - Crafted for CPL & ATPL aspirants.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }} ml="auto">
              {subscriptionDaysLeft !== null &&
                (subscriptionDaysLeft > 0 && subscriptionDaysLeft <= 2 ? (
                  <Card
                    sx={{
                      p: 3,
                      mb: 3,
                      backgroundColor: "#FFF3CD",
                      border: "1px solid #FFEEBA",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={600}
                    >
                      Your subscription will expire in {subscriptionDaysLeft}{" "}
                      day
                      {subscriptionDaysLeft > 1 ? "s" : ""}. Renew now to avoid
                      interruption.
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        backgroundColor: "#EAB308",
                        textTransform: "none",
                      }}
                      onClick={() => navigate("/pricing")}
                    >
                      Renew Plan
                    </Button>
                  </Card>
                ) : subscriptionDaysLeft <= 0 ? (
                  <Card
                    sx={{
                      p: 3,
                      mb: 3,
                      backgroundColor: "#F8D7DA",
                      border: "1px solid #F5C6CB",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body1" color="error" fontWeight={600}>
                      Your subscription has expired. Please renew to continue
                      taking tests.
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        backgroundColor: "#C5322A",
                        textTransform: "none",
                      }}
                      onClick={() => navigate("/pricing")}
                    >
                      Renew Plan
                    </Button>
                  </Card>
                ) : null)}

              {showSubscribeCard && (
                <Card
                  sx={{
                    p: 3,
                    mb: 3,
                    backgroundColor: "#FFF3CD",
                    border: "1px solid #FFEEBA",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.primary"
                    fontWeight={600}
                  >
                    You’ve completed your 2 free tests. Subscribe to unlock full
                    access.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      backgroundColor: "#EAB308",
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/pricing")}
                  >
                    View Subscription Plans
                  </Button>
                </Card>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {syllabus.map((course, index) => {
              const matchedUserSyllabus = userSyllabuses.find(
                (item) => item._id === course._id
              );

              const total = matchedUserSyllabus?.totalChapters || 0;
              const completed = matchedUserSyllabus?.completedChapters || 0;
              const completionPercentage =
                total > 0 ? Math.round((completed / total) * 100) : 0;

              const handleBtnClick = () => {
                if (syllabusType === "Training" && !token && index >= 2) {
                  navigate("/login");
                  return;
                }
                if (syllabusType === "Test" && !token) {
                  navigate("/login");
                  return;
                }
                handleClick(course.title, course?._id);
              };

              const isDisabled = shouldDisableTestButton(index);

              return (
                <Grid
                  key={course._id}
                  size={{ xs: 12, sm: 6, md: 3, lg: 2 }}
                  sx={{ display: "flex" }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      width: "100%",
                      backgroundColor: theme.card.bgcolor,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={course.imageUrl}
                      alt={course.title}
                    />

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {toCapitalize(course?.title)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#EAB308" }}>
                          {course.category}
                        </Typography>

                        {syllabusType === "Training" &&
                          matchedUserSyllabus &&
                          completionPercentage > 0 && (
                            <>
                              <Box mt={1}>
                                <LinearProgress
                                  variant="determinate"
                                  value={completionPercentage}
                                  sx={(theme) => ({
                                    height: 8,
                                    borderRadius: 5,
                                    backgroundColor:
                                      theme.palette.mode === "dark"
                                        ? "#181515"
                                        : "#e0e0e0",
                                    "& .MuiLinearProgress-bar": {
                                      backgroundColor: "#1e3a8a",
                                    },
                                  })}
                                />
                              </Box>
                              <Typography
                                variant="caption"
                                color="textSecondary"
                                mt={1}
                                display="block"
                              >
                                {completionPercentage}% completed
                              </Typography>
                            </>
                          )}
                      </Box>
                    </CardContent>

                    <Box py={2} display="flex" justifyContent="center">
                      <Button
                        variant="contained"
                        onClick={handleBtnClick}
                        disabled={isDisabled}
                        sx={(theme) => ({
                          backgroundColor: "#EAB308",
                          color:
                            theme.palette.mode === "dark"
                              ? "#000000"
                              : "#FFFFFF",
                          fontWeight: 600,
                          px: 4,
                          m: 2,
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#d9a600",
                          },
                        })}
                      >
                        {syllabusType === "Training" && !token && index >= 2
                          ? "Login to continue"
                          : syllabusType === "Training" &&
                            matchedUserSyllabus &&
                            completionPercentage > 0
                          ? "Resume"
                          : syllabusType === "Test" && !token
                          ? "Login to Start"
                          : "Start"}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Syllabus;
