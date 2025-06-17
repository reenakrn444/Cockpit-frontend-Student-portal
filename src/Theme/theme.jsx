import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: '"Jost"',
    },
    // Optional: override components
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: '"Jost"',
                },
            },
        },
       
    },
});

export default theme;
