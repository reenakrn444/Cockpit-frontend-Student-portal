import { apiGetToken, apiPostToken, apiPostImageUpload } from "../../api/axios";
import { snackbarEmitter } from "../../components/snackbar/CustomSnackBar";
import { CustomButton } from "../../components";
import { DayCalculation, formatedDate } from "../../Helper/DayCalculation/Daycalculation";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);


  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    accessKey: "",
    userId: user?._id,
    createdAt : new Date(),
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
  });


  const [subscriptionInfo, setSubscriptionInfo] = useState({
    subscription: "",
    daysLeft: 0,
    subscriptionStartDate: "",
    subscriptionEndDate: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchUserData = useCallback(async () => {
    const data = await apiGetToken(`/getUser?userId=${user._id}`);
    if (data?.data?.status === 200) {
      const userInfo = data.data.data;
console.log(userInfo, "userInfo");

      setUserData({
        username: userInfo.username,
        email: userInfo.email,
        accessKey: userInfo?.accessKey ? userInfo.accessKey : "",
        userId: userInfo._id,
        createdAt : userInfo?.createdAt
      });
      setProfileImage(userInfo?.image || "/default-profile.png");


      if (userInfo?.is_subscribed) {
        setSubscriptionInfo({
          subscription: data?.subscription,
          daysLeft: DayCalculation(userInfo?.subscription_start_date, userInfo?.subscription_end_date),
          subscriptionStartDate: userInfo?.subscription_start_date,
          subscriptionEndDate: userInfo?.subscription_end_date,
        });
      }
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const res = apiPostImageUpload(`/uploadUserImage?userId=${userData?.userId}`, formData);
      res.then((response) => {
        if (response?.data?.status === 200) {
          snackbarEmitter("Profile image updated successfully!", "success");
          setProfileImage(response.data.data.image);
          const updatedUser = {
            ...user,
            profileImage: response?.data?.data?.image,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          // Step 4 (optional): Dispatch a custom event to notify other components (like Header)
          window.dispatchEvent(new Event("userUpdated"));
        } else {
          snackbarEmitter("Failed to upload image. Please try again.", "error");
        }
      }).catch((error) => {
        console.error("Error uploading image:", error);
        snackbarEmitter("Error uploading image. Please try again.", "error");
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "username") {
        newErrors.username = value.trim() ? "" : "User name is required";
      }

      if (name === "email") {
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          newErrors.email = emailRegex.test(value)
            ? ""
            : "Invalid email format";
        }
      }

      return newErrors;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const { username, email } = userData;
    const errors = { username: "", email: "" };
    let isValid = true;

    if (!username.trim()) {
      errors.username = "User name is required";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
        isValid = false;
      }
    }

    setFormErrors(errors);
    if (isValid) {
      setLoading(true);
      const { data } = await apiPostToken("/updateUser", userData);
      if (data?.status === 200) {
        const updatedUser = {
          ...user,
          username: userData?.username
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        // Step 4 (optional): Dispatch a custom event to notify other components (like Header)
        window.dispatchEvent(new Event("userUpdated"));

        snackbarEmitter("User data updated successfully!", "success");
        setLoading(false);
      } else {
        snackbarEmitter(data?.message, "error");
        setLoading(false);
      }
      fetchUserData();
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          Good Morning, Captain
        </Typography>
        <Typography variant="subtitle2">🟡 In-Flight</Typography>
      </Grid>
      <Typography variant="caption" color="gray">
        {formatedDate(subscriptionInfo?.subscriptionStartDate ? subscriptionInfo?.subscriptionStartDate :userData?.createdAt )}
      </Typography>

      <Typography
        variant="h5"
        mt={4}
        mb={2}
        fontWeight={700}
        color="goldenrod"
      >
        USER STATUS
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm :6, md: 6 }}>
          <Box display="flex" alignItems="center" gap={2} mb={{xs : 0 , md:2}}>
            {/* <Avatar sx={{ width: 56, height: 56 }} /> */}
            <Box position="relative" display="inline-block">
              <Avatar
                src={profileImage || "/default-profile.png"}
                sx={{ width: 56, height: 56, cursor: "pointer" }}
                onClick={() => document.getElementById("profile-image-input").click()}
              />
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </Box>
            <Box>
              <Typography fontWeight="bold">{userData.username}</Typography>
              <Typography variant="body2" color="gray">
                {userData.email}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12,sm:6, md: 6 }}>
          <Box display="flex" justifyContent="center">
            <Button sx={{ mb: 2, backgroundColor: "#f1b600" }} variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <form onSubmit={handleSave}>
            <Box sx={{ maxWidth: 600, }}>
              <Grid container spacing={isMobile ? 2 : 1}>
                <Grid size={{ xs: 12, md: 12 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>
                    User Name
                  </Typography>
                  <TextField
                    placeholder="Your First Name"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={!!formErrors.username}
                    helperText={formErrors.username}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>
                    E-Mail
                  </Typography>
                  <TextField
                    placeholder="mail"
                    name="email"
                    type="email"
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    value={userData.email}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </Grid>

                {/* <Grid size={{ xs: 12, md: 12 }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 500, mb: 0.5 }}>
                    Access key
                  </Typography>
                  <TextField
                    placeholder="key"
                    name="accessKey"
                    value={userData.accessKey}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </Grid> */}

                <Grid size={{ xs: 12, md: 12 }} display="flex" justifyContent="center">

                  <CustomButton
                    onClick={handleSave}
                    loading={loading}
                    bgColor="#f1b600"
                    borderRadius="8px"
                    sx={{ mt: 2, display: "flex", justifyContent: "center", alignItems: "center", width: "fit-content", padding: "10px 20px" }}
                  >
                    Save
                  </CustomButton>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ backgroundColor: "#0c2340", color: "white", borderRadius: 2, margin: 5, maxWidth: 400, m: "auto", }}>
            <CardContent>
              <Typography variant="h6" align="center" color="#f1b600" gutterBottom>
                FLIGHT PLAN
              </Typography>
              <Divider sx={{ borderColor: "#f1b600", mb: 2 }} />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography variant="body2">SUBSCRIPTION</Typography>
                <Typography variant="body2">{subscriptionInfo.subscription ? subscriptionInfo.subscription : "Free plan for 7 days"}</Typography>
              </Box>
              <Divider sx={{ borderColor: "#575757", my: 1 }} />
              {/* <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
                <Typography variant="body2">RENEWAL</Typography>
                <Typography variant="body2">
                  {subscriptionInfo?.daysLeft ? subscriptionInfo.daysLeft : "7"} DAYS LEFT
                </Typography>
              </Box> */}
              <Box display="flex" justifyContent="center">
                {/* <Button variant="contained" sx={{ backgroundColor: "#f1b600" }} onClick={() => navigate("/pricing")}>
                  Subscribe now
                </Button> */}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Navigation Boxes */}
      <Grid container spacing={2} mt={4}>
        {["FLIGHT DECK", "MAINTENANCE", "FLIGHT LOG"].map((label) => (
          <Grid size={{ xs: 12, md: 4 }} key={label} >
            <Box
              sx={{
                backgroundColor: "#0c2340",
                height: 130,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
                mx: "auto",
                color: "#f1b600",
                fontWeight: 700,
                fontSize: 16,
                maxWidth: 200,
                cursor: "pointer",
              }}
              onClick={() => {
                if (label === "FLIGHT DECK") {
                  navigate("/report");
                }
                else if (label === "MAINTENANCE") {
                  navigate("/changepassword");
                }
                else if (label === "FLIGHT LOG") {
                  navigate("/theme");
                }
              }}
            >
              {label}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserProfile;
