import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fafafa",
      policyBgcolor: "#f8fafc",
    },
    primary: {
      main: "#EAB308",
      secondary: "#EAB308",
      trimester: "#ffffff",
      trimesterAcccordian: "#ffffff",
      trimesterAcccordianText: "#000000",
      skippedBackground: "#F6F6F6",
      skippedText: "#000000",
      testQuestion: "#183251",
    },
  },
  header: {
    mode: "light",
    background: {
      default: "#fafafa",
      boderBottom: "1px solid #e0e0e0",
    },
    primary: {
      main: "#183251",
      active: "#ffffff",
      text: "#0f2848",
    },
  },
  footer: {
    mode: "light",
    background: {
      default: "#183251",
    },
  },
  passwordText: {
    main: "#222529",
    input: "#222529",
  },
  userprofie: {
    text: "#3E435D",
  },
  report: {
    headingReport: "#f5f5f5",
    headingReportBorder: "1px solid #e0e0e0",
    transparent: "transparent",
    paperBackground: "transparent",
    report: "#fefdc7",
    filedReport: "#ffffff",
    avatar: "#1976d2",
    filedReportBorder: "#F0F0F0",
    testReportGraph: "#FFFFFF",
  },
  card: {
    bgcolor: "transparent",
    border: "1px solid #E5E7E9",
    textColor: "#000000",
    cardColor: "#ffffff",
    pricingcardBorder: "1px solid #E4E4E7",
    pricingboxShadow: "0px 26px 40px 0px #BCCAFF21",
  },
  HomeHeader: {
    headingText: "#183251",
    homeButton: "#183251",
    backgroundColor: "#f0f7ff",
    background2: "#f9f9f9",
    partnerText: "#1D1D1D",
    smallPartnerText: "#777777",
    reviewBackground: "#f5f5f5",
    reviewCard: "#1e2a44",
    questionBackground: "#289BDE1A",
    questionBackgroundnotchoosed: "#ffffff",
    questionAnswer: "#777777",
    questionBackgroundBorder: "transparent",
  },
  syllabus: {
    background: "#f8faf9",
    chaptersBackground: "#0f2b50",
    booksBackground: "#f5f5f5",
    instructionsText: "#555555",
    instrucctionsTermsText: "#183251",
  },
  policy: {
    text: "#303A42",
    subText: "#303A42",
    sectionsubText: "#000000",
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
    mode: "dark",
    background: {
      default: "#121212",
      policyBgcolor: "#121212",
    },
    primary: {
      main: "#EAB308",
      secondary: "#000000",
      trimester: "#000000",
      trimesterAcccordian: "#000000",
      trimesterAcccordianText: "#ffffff",
      skippedBackground: "#000000",
      skippedText: "#F6F6F6",
      testQuestion: "#ffffff",
    },
  },
  header: {
    mode: "dark",
    background: {
      default: "#121212",
      boderBottom: "1px solid #000000",
    },
    primary: {
      main: "#EAB308",
      active: "#ffffff",
      text: "#ffffff",
    },
  },
  footer: {
    mode: "dark",
    background: {
      default: "#141F2D",
    },
  },
  passwordText: {
    main: "#ffffff",
    input: "#222529",
    inputEyeIcon: "#0000008A",
  },
  userprofie: {
    text: "#EAB308",
  },
  report: {
    headingReport: "#161616",
    headingReportBorder: "2px solid #161616",
    transparent: "#222222",
    paperBackground: "#000000",
    report: "#1A1A1A",
    filedReport: "#000000",
    avatar: "#7BCCFE",
    filedReportBorder: "#1A1A1A",
    testReportGraph: "#1E1E1E",
  },
  card: {
    bgcolor: "#000000",
    border: "1px solid #18212E",
    textColor: "#ffffff",
    cardColor: "#000000",
    pricingcardBorder: "1px solid #191919",
    pricingboxShadow: "0px 26px 40px 0px #BCCAFF21",
  },
  HomeHeader: {
    headingText: "#ffffff",
    homeButton: "#ffffff",
    backgroundColor: "#212121",
    background2: "#000000",
    partnerText: "#EAB308",
    smallPartnerText: "#ffffff",
    reviewBackground: "#000000",
    reviewCard: "#141F2D",
    questionBackground: "#80C4EC1A",
    questionBackgroundnotchoosed: "#000000",
    questionAnswer: "#ffffff",
    questionBackgroundBorder: "1px solid #3D3D3D",
  },
  syllabus: {
    background: "#121212",
    chaptersBackground: "#141F2D",
    booksBackground: "#161616",
    instructionsText: "#ffffff",
    instrucctionsTermsText: "#ffffff",
  },
  policy: {
    text: "#EAB308",
    subText: "#ffffff",
    sectionsubText: "#999999",
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
