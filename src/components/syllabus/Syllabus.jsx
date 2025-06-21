import { apiGetToken } from "../../api/axios";
import { snackbarEmitter } from "../../components/snackbar/CustomSnackBar"

const Syllabus = () => {
  const navigate = useNavigate();
  const [syllabus, setSyllabus] = useState([]);
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem('user'));
  console.log(userData, "userData22222");

  const handleClick = (title, id) => {
    console.log(title, id,  "paramssssss");
    
    navigate('/chapter', { state: {title, id} }); 
  };

  useEffect(() => {
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
        const response = await apiGetToken(`/task/studentTaskProgress?userId=${userData._id}`);
        console.log(response, "responsegetStudentprogress");
        if (response?.data?.status === 200) {
          const taskStatus = response?.data?.data;
          console.log(taskStatus, "taskstatus");
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
    const regDate = new Date(userRegisteredDate);
    const trialEndDate = new Date(regDate);
    trialEndDate.setDate(trialEndDate.getDate() + 7);
    const now = new Date();
    return now > trialEndDate; // disable if trial is over
  };


  return (
    <>
      <Box sx={{ py: 5, bgcolor: "#f8f9fa" }} p={5}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
          Discover Our DGCA Question Banks
        </Typography>
        <Typography variant="body1" color="text.secondary" fontSize={18} mb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in
          libero risus semper habitant arcu eget.
        </Typography>

        <Grid container spacing={2} >
          {syllabus.map((course, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>

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
                      {course.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#EAB308" }}>
                      {course.category}
                    </Typography>
                  </CardContent>
                </Box>

                {/* Button as Footer */}
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
                    Start
                  </Button>
                </Box>
              </Card>

            </Grid>
          ))}
        </Grid>
      </Box>

    </>
  );
};

export default Syllabus;
