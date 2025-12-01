import { HeaderLogo } from "../Home/ImagesRender";

const TestHeader = () => {
  const theme = useTheme();
  return (
    <Box
      component="header"
      sx={{
        py: 2,
        backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
        borderBottom:
          theme.palette.mode === "dark"
            ? "1px solid #0e0e0e"
            : "1px solid #e0e0e0",
        position: "sticky", // or "fixed" if you want it to stay even when scrolling past it
        top: 0,
        zIndex: 9999,
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ maxWidth: "xl", mx: "auto", px: 2 }}
      >
        {/* Logo */}
        <Grid>
          <Box
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={HeaderLogo} alt="Plane" style={{ height: "60px" }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestHeader;
