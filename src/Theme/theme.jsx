// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//     typography: {
//         fontFamily: '"Jost"',
//     },
//     // Optional: override components
//     components: {
//         MuiCssBaseline: {
//             styleOverrides: {
//                 body: {
//                     fontFamily: '"Jost"',
//                 },
//             },
//         },

//     },
// });

// export default theme;

import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#fafafa',
        },
        primary: {
            main: '#EAB308',
        },
    },
    header: {
        mode: 'light',
        background: {
            default: '#fafafa',
            boderBottom: "1px solid #e0e0e0",
        },
        primary: {
            main: '#183251',
            active: "#ffffff"
        },
    },
    footer: {
        mode: 'light',
        background: {
            default: '#183251',
        },
    },
    passwordText: {
        main: '#222529',
        input: '#222529',
    },
    userprofie: {
        text: "#3E435D",
    },
    report: {
        headingReport: '#f5f5f5',
        headingReportBorder: '1px solid #e0e0e0',
        transparent: "transparent",
        paperBackground: "transparent",
        report: '#fefdc7',
        filedReport: '#ffffff',
        avatar: "#1976d2",
        filedReportBorder: "#F0F0F0",
        testReportGraph :'#FFFFFF'

    },
    card: {
        bgcolor: "transparent",
        border: '1px solid #E5E7E9',
        textColor : "#000000"
    },
    typography: {
        fontFamily: '"Jost"',
    },
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

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
        },
        primary: {
            main: '#EAB308',
        },
    },
    header: {
        mode: 'dark',
        background: {
            default: '#121212',
            boderBottom: "1px solid #000000",
        },
        primary: {
            main: '#EAB308',
            active: "#ffffff"
        },
    },
    footer: {
        mode: 'dark',
        background: {
            default: '#141F2D',
        },
    },
    passwordText: {
        main: '#ffffff',
        input: '#222529',
        inputEyeIcon: '#0000008A',
    },
    userprofie: {
        text: "#EAB308",
    },
    report: {
        headingReport: '#161616',
        headingReportBorder: '2px solid #161616',
        transparent: "#222222",
        paperBackground: "#000000",
        report: '#1A1A1A',
        filedReport: '#000000',
        avatar: "#7BCCFE",
        filedReportBorder: "#1A1A1A",
        testReportGraph :'#1E1E1E'
    },
    card: {
        bgcolor: "#000000",
        border: '1px solid #18212E',
        textColor : "#ffffff"
    },
    typography: {
        fontFamily: '"Jost"',
    },
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

