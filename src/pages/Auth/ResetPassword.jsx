import { apiPost } from '../../api/axios';
import { CustomButton } from '../../components';
import { snackbarEmitter } from '../../components/snackbar/CustomSnackBar';
import { Link } from 'react-router-dom';



const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { token } = useParams();
    const cleanedToken = token.startsWith(':') ? token.substring(1) : token;
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        if (field === 'password') setPassword(value);
        if (field === 'confirmPassword') setConfirmPassword(value);

        setErrors((prev) => {
            let errorMsg = '';

            if (value.trim() === '') {
                errorMsg = `${field[0].toUpperCase() + field.slice(1)} is required`;
            }

            if (field === 'confirmPassword' && value !== password) {
                errorMsg = "Passwords do not match";
            }

            return { ...prev, [field]: errorMsg };
        });
    };



    const validateRegister = () => {
        const newErrors = {};

        if (!password.trim()) newErrors.password = 'Password is required';
        if (!confirmPassword.trim()) newErrors.confirmPassword = 'Confirm Password is required';
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateRegister()) return;
        setLoading(true);

        try {
            const response = await apiPost('/reset-password', {
                token: cleanedToken,
                newPassword: password,
            });
            if (response.data.status === 200) {
                snackbarEmitter('Password reset successful!', 'success');
                setPassword('');
                setLoading(false);
                navigate("/login")
            }
            else {
                setLoading(false);
            }
        } catch (error) {
            snackbarEmitter('Registration failed', 'error');
            setLoading(false);
        }
    };


    return (
        <Box
            sx={{
                backgroundImage: "url('/images/login.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                position: 'relative',
                px: 2,
            }}
        >
            
            <Box component={Link}
                to="/" sx={{
                    position: "fixed", top: { xs: 10, sm: 10 }, left: {
                        xs: '50%',   // Center horizontally on small screens
                        sm: '20px',  // Align to left on larger screens
                        md: '20px',
                    },
                    transform: {
                        xs: 'translateX(-50%)',  // Center adjustment for xs
                        sm: 'none',
                    },
                }}>

                <Box
                    component="img"
                    src="/src/assests/images/fulllogo.svg"
                    alt="Plane"
                    sx={{
                        height: 100,
                        mb: {
                            xs: 15,
                            sm: 0
                        }
                    }}
                />
            </Box>
            <Box
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.19)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '30px',
                    p: 4,
                    width: '100%',
                    maxWidth: 420,
                    color: 'white',
                    zIndex: 2,
                }}
            >
                <Typography variant="h6" align="center" gutterBottom>
                    Welcome to COCKPIT..!
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor: '#0f2c4c',
                        borderRadius: '999px',
                        p: '5px',
                        width: '100%',
                        justifyContent: 'center',
                        mb: 2,
                    }}
                >
                    <Box

                        sx={{
                            flex: 1,
                            borderRadius: '999px',
                            px: 2,
                            py: 1,
                            color: '#fff',
                            backgroundColor: '#EAB308',
                            fontWeight: 500,
                            textTransform: 'none',
                            textAlign: 'center',
                        }}
                    >
                        Reset Password
                    </Box>
                </Box>
                {/* 
                <Typography variant="body2" align="center" color="white" mb={3}>
                    Your gateway to the skies — manage your pilot profile & access
                    training resources.
                </Typography> */}

                <form onSubmit={handleRegister}>

                    <Typography variant="body2" color="white" mt={2} mb={0}>
                        {' New password'}
                    </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        placeholder="Enter your new Password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: '50px', backgroundColor: 'white', '& input': {
                                    fontWeight: showPassword ? 400 : 700, // ✅ Apply to input text only
                                },
                                '& input::placeholder': {
                                    fontWeight: "400",                      // ✅ Normal weight for placeholder
                                },
                            },
                        }}
                    />
                    <Typography variant="body2" color="white" mt={2} mb={0}>
                        {'Confirm password'}
                    </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        placeholder="Confirm your new Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: '50px', backgroundColor: 'white', '& input': {
                                    fontWeight: showConfirmPassword ? 400 : 700,
                                },
                                '& input::placeholder': {
                                    fontWeight: "400",
                                },
                            },
                        }}
                    />
                    <CustomButton
                        onClick={handleRegister}
                        loading={loading}
                        bgColor="#EAB308"
                        borderRadius="50px"
                        sx={{ mt: 2 }}
                    >
                        {'Change password'}
                    </CustomButton>
                </form>
            </Box>
        </Box>
    );
};

export default ResetPassword;

