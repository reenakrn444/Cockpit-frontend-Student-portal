import { apiPostToken } from "../../api/axios";
import { snackbarEmitter } from "../../components/snackbar/CustomSnackBar";
import { CustomButton } from "../../components";
import { Link } from 'react-router-dom';


const ChangePassword = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [formErrors, setFormErrors] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        const { oldPassword, newPassword, confirmPassword } = formData;

        if (!oldPassword.trim()) {
            errors.oldPassword = "Current password is required";
        }

        if (!newPassword.trim()) {
            errors.newPassword = "New password is required";
        } else if (newPassword.length < 6) {
            errors.newPassword = "Password must be at least 6 characters";
        }

        if (confirmPassword !== newPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        // Make API call
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const requestData = {
                userId: user._id,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            };
            const res = await apiPostToken("/resetPasswordByOldPassword", requestData); // Adjust endpoint as needed
            if (res?.data?.status === 200) {
                setLoading(false);
                snackbarEmitter("Password changed successfully!", "success");
                setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
                localStorage.clear(); // Clear local storage
                navigate("/login"); // Redirect to login after password change
            } else {
                setLoading(false);
                snackbarEmitter(res?.data?.message || "Something went wrong", "error");
            }
        } catch (err) {
            snackbarEmitter("Server error", "error");
        }
    };


    return (
        <Box sx={{ p: 5, backgroundColor: "#fafafa", minHeight: "auto" }}>
            <Grid container spacing={4} justifyContent="center">
                {/* Left Card */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                        sx={{
                            backgroundColor: "#0c2340",
                            borderRadius: 3,
                            px: 4,
                            py: 4,
                            height: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around",
                            boxShadow: 2,

                        }}
                    >
                        <Grid container spacing={2} >
                            <Grid size={{ xs: 12, justifyContent: "center", display: "flex", }} >
                                <Box>
                                    <Typography
                                        component={Link}
                                        to="/changepassword"
                                        variant="h6"
                                        fontWeight={700}
                                        sx={{ color: "#f1b600", textDecoration: "none" }}
                                    >
                                        Password
                                    </Typography>

                                </Box>

                                <Box style={{ marginTop: "20px" }}>

                                    <Typography variant="body2" sx={{ color: "#ffff", textDecoration: "none" }}
                                        component={Link}
                                        to="/theme"
                                    >
                                        Theme
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, }}>
                                <Box style={{ marginTop: "10px", marginBottom: "30px", border: "1px solid #f1b600 " }}></Box>

                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Button
                                    // variant="contained"
                                    fullWidth

                                    sx={{
                                        // backgroundColor: "#f1b600",
                                        backgroundColor: "transparent",
                                        color: "transparent",
                                        // fontWeight: 600,
                                        // borderRadius: 0,
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#d9a600",
                                        },
                                    }}
                                >
                                    Delete Account
                                </Button>
                            </Grid>
                        </Grid>




                    </Box>
                </Grid>

                {/* Right Form */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <form onSubmit={handleSubmit}>
                        <Box
                            sx={{

                                p: isMobile ? 2 : 4,

                            }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap={2}
                                mb={4}
                            >
                                <Typography variant="h6" fontWeight={600}>
                                    Change Password
                                </Typography>

                            </Box>

                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <Typography sx={{ mb: 0.5 }}>Current Password</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Enter current password"
                                        name="oldPassword"
                                        type={showPassword.current ? "text" : "password"}
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        error={!!formErrors.oldPassword}
                                        helperText={formErrors.oldPassword}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword((prev) => ({ ...prev, current: !prev.current }))
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword.current ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                backgroundColor: "white", '& input': {
                                                    fontWeight: showPassword?.current ? 400 : 700, // ✅ Apply to input text only
                                                },
                                                '& input::placeholder': {
                                                    fontWeight: "400",                      // ✅ Normal weight for placeholder
                                                },
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 0.5 }}>New Password</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Enter new password"
                                        name="newPassword"
                                        type={showPassword.new ? "text" : "password"}
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        error={!!formErrors.newPassword}
                                        helperText={formErrors.newPassword}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword.new ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                backgroundColor: "white", '& input': {
                                                    fontWeight: showPassword?.new ? 400 : 700, // ✅ Apply to input text only
                                                },
                                                '& input::placeholder': {
                                                    fontWeight: "400",                      // ✅ Normal weight for placeholder
                                                },
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 0.5 }}>Confirm Password</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Confirm new password"
                                        name="confirmPassword"
                                        type={showPassword.confirm ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={!!formErrors.confirmPassword}
                                        helperText={formErrors.confirmPassword}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword.confirm ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            sx: {
                                                backgroundColor: "white", '& input': {
                                                    fontWeight: showPassword?.confirm ? 400 : 700, // ✅ Apply to input text only
                                                },
                                                '& input::placeholder': {
                                                    fontWeight: "400",                      // ✅ Normal weight for placeholder
                                                },
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
                                    <CustomButton
                                        sx={{
                                            backgroundColor: "#f1b600",
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            textTransform: "none",
                                            px: 4,
                                            mt: 2,
                                            width: "fit-content",
                                            "&:hover": {
                                                backgroundColor: "#d9a600",
                                            },
                                        }}
                                        loading={loading}
                                        type="submit"
                                    >
                                        Change Password
                                    </CustomButton>
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        align="center"
                                        color="gray"
                                        sx={{ mt: 1 }}
                                    >
                                        You will be asked to log in again with your new password after you save your changes.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChangePassword;
