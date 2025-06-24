import { apiPost } from '../../api/axios';
import { CustomButton } from '../../components';
import { snackbarEmitter } from '../../components/snackbar/CustomSnackBar';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { token } = useParams();
    const cleanedToken = token.startsWith(':') ? token.substring(1) : token;
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        if (field === 'password') setPassword(value);

        setErrors((prev) => {
            let errorMsg = '';

            if (value.trim() === '') {
                errorMsg = `${field[0].toUpperCase() + field.slice(1)} is required`;
            }

            return { ...prev, [field]: errorMsg };
        });
    };



    const validateRegister = () => {
        const newErrors = {};

        if (!password.trim()) newErrors.password = 'Password is required';

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
                            backgroundColor: '#f1b600',
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
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
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
                    <CustomButton
                        onClick={handleRegister}
                        loading={loading}
                        bgColor="#f1b600"
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

