import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './Theme/theme';
import { CustomSnackbarProvider } from './components';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <CustomSnackbarProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CustomSnackbarProvider>
  // </React.StrictMode>
);
