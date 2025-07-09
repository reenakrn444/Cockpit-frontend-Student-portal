import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './Theme/theme';
import { CustomSnackbarProvider } from './components';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="352852639472-vf52eadnfk7ke069obfvl9t0e7oeu95m.apps.googleusercontent.com">
    <CustomSnackbarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CustomSnackbarProvider>
  </GoogleOAuthProvider>
);
