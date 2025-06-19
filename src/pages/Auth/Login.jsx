import { apiPost } from '../../api/axios';
import { CustomButton } from '../../components';
import { snackbarEmitter } from '../../components/snackbar/CustomSnackBar';
import CopyrightFooter from '../../components/copyrighttext';

const Login = () => {
  const [activeForm, setActiveForm] = useState('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    if (field === 'email') setEmail(value);
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);

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

  const validateLogin = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email format';

    if (!password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email format';

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateRegister()) return;
    setLoading(true);

    try {
      const response = await apiPost('/registerUser', {
        email,
        username,
        password,
      });
      snackbarEmitter('User registered successfully!', 'success');
      setEmail('');
      setUsername('');
      setPassword('');
      setActiveForm('login');
      setLoading(false);
    } catch (error) {
      snackbarEmitter('Registration failed', 'error');
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);

    try {
      const response = await apiPost('/loginUser', { email, password });
      console.log('Login response:', response);
      if (response?.data?.status === 200) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        const userdata = {
          _id: response.data.userData._id,
          username: response.data.userData.username,
          isSunscribed: response.data.userData.is_subscribed,
          subscriptionStartDate: response.data.userData.is_subscribed ? response.data.userData.subscription_start_date : "",
          subscriptionEndDate: response.data.userData.is_subscribed ? response.data.userData.subscription_end_date : "",
        }
        localStorage.setItem('user', JSON.stringify(userdata));
        setLoading(false);
        snackbarEmitter('Logged in successfully!', 'success');
        navigate('/');
      } else {
        setLoading(false);
        snackbarEmitter(response?.data?.message, 'error');
      }
    } catch (error) {
      console.log('Login failed', error);
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
          <Button
            onClick={() => {
              setActiveForm('login');
              setErrors({});
              setEmail('');
              setUsername('');
              setPassword('');
            }}
            sx={{
              flex: 1,
              borderRadius: '999px',
              px: 2,
              py: 1,
              color: activeForm === 'login' ? '#000' : '#fff',
              backgroundColor:
                activeForm === 'login' ? '#f1b600' : 'transparent',
              fontWeight: 500,
              textTransform: 'none',
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              setActiveForm('register');
              setErrors({});
              setEmail('');
              setUsername('');
              setPassword('');
            }}
            sx={{
              flex: 1,
              borderRadius: '999px',
              px: 2,
              py: 1,
              color: activeForm === 'register' ? '#000' : '#fff',
              backgroundColor:
                activeForm === 'register' ? '#f1b600' : 'transparent',
              fontWeight: 500,
              textTransform: 'none',
            }}
          >
            Register
          </Button>
        </Box>

        <Typography variant="body2" align="center" color="white" mb={3}>
          Your gateway to the skies — manage your pilot profile & access
          training resources.
        </Typography>

        <form onSubmit={activeForm === 'login' ? handleLogin : handleRegister}>
          <Typography variant="body2" color="white" mt={2} mb={0}>
            {activeForm === 'login' ? 'Pilot ID / E-mail' : 'Email Address'}
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

          {activeForm === 'register' && (
            <>
              <Typography variant="body2" color="white" mt={2} mb={0}>
                User Name
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                placeholder="Enter your User name"
                value={username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                  sx: { borderRadius: '50px', backgroundColor: 'white' },
                }}
              />
            </>
          )}

          <Typography variant="body2" color="white" mt={2} mb={0}>
            {activeForm === 'login' ? 'Access Key' : 'Password'}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            placeholder="Enter your Password"
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
              sx: { borderRadius: '50px', backgroundColor: 'white' },
            }}
          />


          <Grid container alignItems="center" my={2}>
            {activeForm === 'login' &&
              <Grid
                size={{ xs: 12 }}
                display="flex"
                justifyContent="flex-end"
              >
                <Typography
                  variant="caption"
                  color="white"
                  sx={{ fontSize: '12px', cursor: 'pointer' }}
                  onClick={() => navigate('/forgetpassword')}
                  component="span"
                  display="inline"
                >
                  Forgot Password ?
                </Typography>
              </Grid>
            }
          </Grid>

          <CustomButton
            onClick={activeForm === 'login' ? handleLogin : handleRegister}
            loading={loading}
            bgColor="#f1b600"
            borderRadius="50px"
          >
            {activeForm === 'login' ? 'Board me' : 'Register'}
          </CustomButton>
        </form>

        {/* <Typography variant="body2" align="center" color="white" my={2}>
          - OR -
        </Typography>

        <Grid container justifyContent="center" spacing={2}>
          {['apple', 'google', 'twitter'].map((provider) => (
            <Grid key={provider}>
              <Avatar
                src={`/images/${provider}.png`}
                sx={{ width: 40, height: 40, backgroundColor: 'white' }}
              />
            </Grid>
          ))}
        </Grid> */}
      </Box>

      {/* Footer Typography OUTSIDE the card */}
      <Typography
        variant="caption"
        align="center"
        sx={{
          position: 'absolute',
          bottom: 10,
          left: 5,
          width: '100%',
          color: 'white',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <CopyrightFooter />
      </Typography>
    </Box>
  );
};

export default Login;

