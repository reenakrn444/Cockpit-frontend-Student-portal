import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { apiPostToken, apiGetToken } from "../../api/axios";
import ReactSpeedometer from "react-d3-speedometer";
import { toCapitalize } from "../../Helper/convertUpperCase";

const FlightLog = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [countResult, setCountResult] = useState();
  const [userSyllabuses, setUserSyllabuses] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleClick = (title, id) => {
    console.log(title, id, "paramssssss");
    navigate("/chapter", { state: { title, id } });
  };
  let data;
  useEffect(() => {
    const fetchFlightLogData = async () => {
      try {
        const requestBody = {
          fromDate: userData?.userRegisteredDate,
          toDate: new Date().toISOString(),
        };
        const response = await apiPostToken("/countTotalTest", requestBody);
        // Handle the response data as needed
        console.log(response.data, "fflightLogDetails");
        setCountResult(response?.data?.data);
        data = [
          {
            name: "Score",
            value: 62, // percentage
            fill: "#F5B400",
          },
        ];
      } catch (error) {}
    };

    fetchFlightLogData();

    const fetchSyllabus = async () => {
      try {
        const response = await apiGetToken("/getSyllabus");
        setSyllabus(response.data.data);
        getStudentProgress();
      } catch (error) {
        console.error("Error fetching syllabus:", error);
      }
    };

    const getStudentProgress = async () => {
      try {
        const response = await apiGetToken(
          `/task/studentTaskProgress?userId=${userData._id}`
        );
        console.log(response, "responsegetStudentprogress");
        if (response?.data?.status === 200) {
          const taskStatus = response?.data?.data;
          console.log(taskStatus, "taskstatus");
          setUserSyllabuses(taskStatus?.syllabuses || []);
        }
      } catch (err) {
        return err;
        // snackbarEmitter("")
      }
    };
    fetchSyllabus();
  }, []);

  const grade = useMemo(() => {
    const raw = countResult?.grade ?? 0;
    return raw > 0 && raw < 1 ? 1 : Number(raw.toFixed(2));
  }, [countResult]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight={700}
        mb={0.5}
        sx={{ color: theme.userprofie.text }}
      >
        Welcome back, {userData?.username || "User"}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Your Flight log.
      </Typography>

      {/* Stats Section */}
      {/* <Grid container spacing={3} mb={5}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              border: theme.card.border,
              backgroundColor: theme.card.bgcolor,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography fontWeight={600} mb={1}>
                Completed Test
              </Typography>
              <Typography fontSize={48} fontWeight={700} color="#EAB308">
                {countResult?.completedTest}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                sx={{
                  textTransform: "none",
                  color: "#EAB308",
                  fontWeight: 600,
                  mt: 1,
                }}
                size="small"
                endIcon={<span>→</span>}
                onClick={() => navigate("/flight-log-report")}
              >
                report
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 5, lg: 4 }}>
          {/* <Card sx={{ p: {xs: 1, sm :3}, borderRadius: 3, }}> */}
      {/* <Typography fontWeight={600} sx={{ mb: 2 }}>Performance</Typography> */}

      {/* <Card
            sx={{
              p: { xs: 1, sm: 1 },
              borderRadius: 3,
              border: theme.card.border,
              backgroundColor: theme.card.bgcolor,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight={600}>Test Performance</Typography>
                <Select
                  size="small"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  sx={{ fontSize: 14 }}
                >
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </Box>
            </CardContent>
            {countResult && (
              <ReactSpeedometer
                value={grade}
                minValue={0}
                maxValue={100}
                segments={100}
                segmentColors={["#EAB308", "#F8EFE2"]}
                startColor="#EAB308"
                endColor="#F8EFE2"
                needleColor="#EAB308"
                needleTransition="easeElastic"
                needleHeightRatio={0.5}
                ringWidth={15}
                textColor={theme.card.textColor}
                customSegmentStops={[0, grade, 100]}
                currentValueText={`Your Grade: ${
                  countResult?.grade ? countResult?.grade?.toFixed(2) : "0"
                }%`}
                height={180}
                width={270}
              />
            )}
            {/* <Typography variant="caption" color="text.secondary" mt={1}>
                {`Your grade is ${countResult?.grade.toFixed(2)}%`}
              </Typography> */}
      {/* </Card> */}
      {/* </Card> */}
      {/* </Grid> */}
      {/* </Grid>  */}

      <Grid container spacing={3} mb={5}>
        {/* Completed Test Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              border: theme.card.border,
              backgroundColor: theme.card.bgcolor,
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: 300, // ✅ equal height
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography fontWeight={600} mb={1}>
                Completed Test
              </Typography>
              {/* <Typography fontSize={48} fontWeight={700} color="#EAB308">
                {countResult?.completedTest}
              </Typography> */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  mt: 4,
                }}
              >
                <Typography
                  fontSize={48}
                  fontWeight={700}
                  color="#EAB308"
                  sx={{ textAlign: "center" }}
                >
                  {countResult?.completedTest}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                sx={{
                  textTransform: "none",
                  color: "#EAB308",
                  fontWeight: 600,
                  mt: 1,
                }}
                size="small"
                endIcon={<span>→</span>}
                onClick={() => navigate("/flight-log-report")}
              >
                report
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Test Performance Card */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              border: theme.card.border,
              backgroundColor: theme.card.bgcolor,
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: 300, // ✅ same as above
            }}
          >
            <CardContent sx={{ flexGrow: 1, width: "100%" }}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography fontWeight={600}>Test Performance</Typography>
                <Select
                  size="small"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  sx={{ fontSize: 14 }}
                >
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </Box>
              {countResult && (
                <ReactSpeedometer
                  value={grade}
                  minValue={0}
                  maxValue={100}
                  segments={100}
                  segmentColors={["#EAB308", "#F8EFE2"]}
                  startColor="#EAB308"
                  endColor="#F8EFE2"
                  needleColor="#EAB308"
                  needleTransition="easeElastic"
                  needleHeightRatio={0.5}
                  ringWidth={15}
                  textColor={theme.card.textColor}
                  customSegmentStops={[0, grade, 100]}
                  currentValueText={`Your Grade: ${
                    countResult?.grade ? countResult?.grade?.toFixed(2) : "0"
                  }%`}
                  height={150}
                  width={220}
                  valueTextFontSize="16px"
                  paddingBottom="12px"
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Section */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Progress
      </Typography>

      {/* <Box display="flex" justifyContent="flex-end" mb={1} gap={1}>
                <IconButton size="small">
                    <ArrowBackIos fontSize="small" />
                </IconButton>
                <IconButton size="small">
                    <ArrowForwardIos fontSize="small" />
                </IconButton>
            </Box> */}

      <Grid container spacing={3}>
        {userSyllabuses
          .filter((userSyllabus) => {
            const total = userSyllabus.totalChapters || 0;
            const completed = userSyllabus.completedChapters || 0;
            const percentage =
              total > 0 ? Math.round((completed / total) * 100) : 0;
            return percentage > 0;
          })
          .map((userSyllabus) => {
            const course = syllabus.find((s) => s._id === userSyllabus._id);
            if (!course) return null;

            const total = userSyllabus.totalChapters || 0;
            const completed = userSyllabus.completedChapters || 0;
            const completionPercentage = Math.round((completed / total) * 100);

            return (
              <Grid key={course._id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    height: "100%",
                    display: "auto",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    backgroundColor: theme.card.bgcolor,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={course.imageUrl}
                    alt={course.title}
                  />
                  <Box sx={{ ml: 2 }}>
                    <CardContent sx={{ px: 0 }}>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {toCapitalize(course?.title)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#EAB308" }}>
                        {course.category}
                      </Typography>

                      <Box mt={1} pr={1.5}>
                        <LinearProgress
                          variant="determinate"
                          value={completionPercentage}
                          sx={(theme) => ({
                            height: 8,
                            borderRadius: 5,
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "#151515"
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
                      >
                        {completionPercentage}% completed
                      </Typography>
                    </CardContent>
                  </Box>

                  <Box mt="auto" py={2} display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      onClick={() => handleClick(course.title, course._id)}
                      sx={(theme) => ({
                        backgroundColor: "#EAB308",
                        color:
                          theme.palette.mode === "dark" ? "#000000" : "#FFFFFF",
                        fontWeight: 600,
                        px: 4,
                        borderRadius: "8px",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#d9a600",
                        },
                      })}
                    >
                      Resume
                    </Button>
                  </Box>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default FlightLog;
