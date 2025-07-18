import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './Theme/theme';
import { CustomSnackbarProvider } from './components';
import { GoogleLoginClientId } from './config';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GoogleLoginClientId}>
    <CustomSnackbarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CustomSnackbarProvider>
  </GoogleOAuthProvider>
);
