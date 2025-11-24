import { Link } from "react-router-dom";
import aeroPlaneTheme from "../../../public/images/AeroplaneTheme.svg";
import nightTheme from "../../../public/images/NightTheme.svg";
import { useThemeMode } from "../../contextApi/ThemeContext";

const ThemeSettings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleTheme, mode } = useThemeMode();
  return (
    <Box
      sx={{
        p: 10,
        minHeight: "calc(80vh - 64px)",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Left Password Card */}
        <Grid size={{xs:12, md:3}}>
          <Box
            sx={{
              backgroundColor: "#183251",
              borderRadius: 3,
              px: 4,
              py: 4,
              height: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              boxShadow: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid
                size={{ xs: 12, justifyContent: "center", display: "flex" }}
              >
                <Box>
                  <Typography
                    component={Link}
                    to="/changepassword"
                    variant="body2"
                    sx={{ color: "#ffff", textDecoration: "none" }}
                  >
                    Password
                  </Typography>
                </Box>

                <Box style={{ marginTop: "20px" }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#EAB308", textDecoration: "none" }}
                    component={Link}
                    to="/theme"
                  >
                    Theme
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Box
                  style={{
                    marginTop: "10px",
                    marginBottom: "30px",
                    border: "1px solid #EAB308 ",
                  }}
                ></Box>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button
                  // variant="contained"
                  fullWidth
                  sx={{
                    // backgroundColor: "#f1b600",
                    backgroundColor: "transparent",
                    color: "transparent",
                    cursor: "default", // disables pointer hand
                    pointerEvents: "none",
                    // fontWeight: 600,
                    // borderRadius: 0,
                    textTransform: "none",
                    // "&:hover": {
                    //     backgroundColor: "#d9a600",
                    // },
                  }}
                >
                  Delete Account
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Light/Dark Mode Cards */}
        <Grid container spacing={4} justifyContent="center" mt={4}>
          {[
            {
              title: "Light Mode",
              image: aeroPlaneTheme,
              mode: "light",
            },
            {
              title: "Dark Mode",
              image: nightTheme,
              mode: "dark",
            },
          ].map((themeOption, index) => (
            <Grid size={{xs:12, sm:6, md:6}} key={themeOption.title}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  border:
                    themeOption.title === "Light Mode"
                      ? "3px solid #EAB308"
                      : "",
                }}
              >
                <CardMedia
                  component="img"
                  src={themeOption.image}
                  // image={mode.image}
                  alt={themeOption.title}
                  sx={{
                    height: 260,
                    width: "100%",
                  }}
                />
              </Card>
              <Button
                variant="contained"
                onClick={() => toggleTheme(themeOption.mode)}
                sx={{
                  backgroundColor: "##d9a600",
                  color: "rgb(255, 255, 255)",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  my: 2,
                  "&:hover": {
                    backgroundColor: "#d9a600",
                  },
                }}
              >
                {themeOption.title}
              </Button>
            </Grid>
          ))}
        </Grid>

        {/* <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            color: "#EAB308",
            mb: 3,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Coming Soon.....
        </Typography> */}
      </Grid>
    </Box>
  );
};

export default ThemeSettings;
