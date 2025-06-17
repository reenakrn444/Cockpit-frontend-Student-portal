import { apiPost } from '../../api/axios';
import { CustomButton } from '../../components';
import { snackbarEmitter } from '../../components/snackbar/CustomSnackBar';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        if (field === 'email') setEmail(value);

        setErrors((prev) => {
            let errorMsg = '';

            if (value.trim() === '') {
                errorMsg = `${field[0].toUpperCase() + field.slice(1)} is required`;
            } else if (
                field === 'email' &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ) {
                errorMsg = 'Invalid email format';
            }

            return { ...prev, [field]: errorMsg };
        });
    };



    const validateRegister = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = 'Invalid email format';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleForgetPassword = async (e) => {
        e.preventDefault();

        if (!validateRegister()) return;
        setLoading(true);

        try {
            const response = await apiPost('/forgot-password', {
                email,
            });
            if (response.data.status === 200) {
                snackbarEmitter(`Reset link sent to ${email}. Please check your inbox.`, 'success');
                setEmail('');
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        } catch (error) {
            snackbarEmitter('Someting went wrong please try again!', 'error');
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
                        alignItems: 'center',
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
                        Forget Password
                    </Box>
                </Box>

                <Typography variant="body2" align="center" color="white" mb={3}>
                    Enter your registered email to receive a password reset link.
                </Typography>

                <form onSubmit={handleForgetPassword}>
                    <Typography variant="body2" color="white" mt={2} mb={0}>
                        {'Email Address'}
                    </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        placeholder="Enter your Email Address"
                        value={email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                            sx: { borderRadius: '50px', backgroundColor: 'white' },
                        }}
                    />


                    <CustomButton
                        onClick={handleForgetPassword}
                        loading={loading}
                        bgColor="#f1b600"
                        sx={{ my: 2 }}
                        borderRadius="50px"
                    >
                        Send
                    </CustomButton>
                </form>
            </Box>
        </Box>
    );
};

export default ForgetPassword;