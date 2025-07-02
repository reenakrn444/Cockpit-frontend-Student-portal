import { apiGet } from "../../api/axios";
import { toCapitalize } from "../../Helper/convertUpperCase";
import { snackbarEmitter } from "../../components/snackbar/CustomSnackBar"

const Syllabus = ({ handleClick }) => {
  const navigate = useNavigate();
  const [syllabus, setSyllabus] = useState([]);
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem('user'));
  const [userSyllabuses, setUserSyllabuses] = useState([]);
  console.log(userData, "userData22222");

  // const handleClick = (title, id) => {
  //   console.log(title, id, "paramssssss");

  //   navigate('/chapter', { state: { title, id } });
  // };

  useEffect(() => {
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
        const response = await apiGet(`/task/studentTaskProgress?userId=${userData._id}`);
        console.log(response, "responsegetStudentprogress");
        if (response?.data?.status === 200) {
          const taskStatus = response?.data?.data;
          console.log(taskStatus, "taskstatus");
          setUserSyllabuses(taskStatus?.syllabuses || []);
        }
      }
      catch (err) {
        return err
        // snackbarEmitter("")
      }
    }
    fetchSyllabus();

  }, []);


  const isButtonDisabled = () => {
    // 1. No token
    if (!token) return true;

    // 2. Check user existence
    if (!userData) return true;

    const { isSubscribed, subscriptionEndDate, userRegisteredDate } = userData;

    // 3. If subscribed and subscriptionEndDate exists
    if (isSubscribed && subscriptionEndDate) {
      const now = new Date();
      const endDate = new Date(subscriptionEndDate);
      return now > endDate; // disable if today > endDate
    }

    // 4. If not subscribed, check 7-day trial from userRegisteredDate
    // const regDate = new Date(userRegisteredDate);
    // const trialEndDate = new Date(regDate);
    // trialEndDate.setDate(trialEndDate.getDate() + 7);
    // const now = new Date();
    // return now > trialEndDate; // disable if trial is over
  };


  return (
    < div style={{ backgroundColor: "#f8f9fa" }} >
      <Container maxWidth="xl" >
        <Box sx={{ py: 5 }} p={5} >
          <Typography variant="h4" fontWeight={700} color="#183251" mb={2}>
            Discover Our DGCA Question Banks
          </Typography>
          <Typography variant="body1" color="text.secondary" fontSize={18} mb={4}>
            Practice Questions for Air Navigation, Meteorology, Technical General, Regulation & More - Crafted for CPL & ATPL aspirants.
          </Typography>

          <Grid container spacing={2} >
            {syllabus.map((course, index) => {
              const matchedUserSyllabus = userSyllabuses.find(
                (item) => item._id === course._id
              );

              const total = matchedUserSyllabus?.totalChapters || 0;
              const completed = matchedUserSyllabus?.completedChapters || 0;
              const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
              return (
                <Grid key={course._id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>

                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
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
                          {`${toCapitalize(course?.title)}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#EAB308" }}>
                          {course.category}
                        </Typography>
                        {matchedUserSyllabus && completionPercentage > 0 && (
                          <>
                            <Box mt={1} pr={1.5}>
                              <LinearProgress
                                variant="determinate"
                                value={completionPercentage}
                                sx={{
                                  height: 8,
                                  borderRadius: 5,
                                  backgroundColor: "#e0e0e0",
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#1e3a8a', // dark blue
                                  },
                                }}
                              />
                            </Box>
                            <Typography variant="caption" color="textSecondary" mt={1}>
                              {completionPercentage}% completed
                            </Typography>
                          </>
                        )}
                      </CardContent>
                    </Box>

                    <Box mt="auto" py={2} display="flex" justifyContent="center">
                      <Button
                        variant="contained"
                        onClick={() => handleClick(course.title, course?._id)}
                        disabled={index >= 2 && isButtonDisabled()}
                        sx={{
                          backgroundColor: "#EAB308",
                          color: "#FFFFFF",
                          fontWeight: 600,
                          px: 4,
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#d9a600",
                          },
                        }}
                      >
                        {matchedUserSyllabus && completionPercentage > 0 ? "Resume" : "Start"}
                      </Button>
                    </Box>
                  </Card>

                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Syllabus;
