import { Link } from 'react-router-dom';
import aeroPlaneTheme from "../../../public/images/AeroplaneTheme.svg"
import nightTheme from "../../../public/images/NightTheme.svg"


const ThemeSettings = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{ p: 10, minHeight: "auto", backgroundColor: "#fafafa" }}>
            <Grid container spacing={4} justifyContent="center">
                {/* Left Password Card */}
                <Grid size={{ xs: 12, md: 4 }}>
                    {/* <Box
                        sx={{
                            backgroundColor: "#0c2340",
                            borderRadius: 4,
                            p: 4,
                            height: "100%",
                            color: "#ffffff",
                            boxShadow: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography variant="body1" color="white" mb={1}>
                                Password
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ color: "#f1b600", fontWeight: 600 }}
                            >
                                Theme
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2, borderColor: "#f1b600" }} />

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: "#f1b600",
                                color: "#000",
                                fontWeight: 600,
                                borderRadius: 2,
                                textTransform: "none",
                                mt: "auto",
                                "&:hover": {
                                    backgroundColor: "#d9a600",
                                },
                            }}
                        >
                            Delete Account
                        </Button>
                    </Box> */}
                    <Box
                        sx={{
                            backgroundColor: "#0c2340",
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
                        <Grid container spacing={2} >
                            <Grid size={{ xs: 12, justifyContent: "center", display: "flex", }} >
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

                                    <Typography variant="h6"
                                        fontWeight={700} sx={{ color: "#f1b600", textDecoration: "none" }}
                                        component={Link}
                                        to="/theme"
                                    >
                                        Theme
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, }}>
                                <Box style={{ marginTop: "10px", marginBottom: "30px", border: "1px solid #f1b600 " }}></Box>

                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Button
                                    // variant="contained"
                                    fullWidth

                                    sx={{
                                        // backgroundColor: "#f1b600",
                                        backgroundColor: "transparent",
                                        color: "transparent",
                                        // fontWeight: 600,
                                        // borderRadius: 0,
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#d9a600",
                                        },
                                    }}
                                >
                                    Delete Account
                                </Button>
                            </Grid>
                        </Grid>




                    </Box>
                </Grid>

                {/* Light/Dark Mode Cards */}
                {[
                    {
                        title: "Light Mode",
                        image: aeroPlaneTheme,
                    },
                    {
                        title: "Dark Mode",
                        image: nightTheme,
                    },
                ].map((mode, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={mode.title}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 3,
                                border: mode.title === "Light Mode" ? "3px solid #f1b600" : "",
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="260"
                                src={mode.image}
                                // image={mode.image}
                                alt={mode.title}
                            />
                            {/* <CardActions sx={{ justifyContent: "center", p: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#f1b600",
                                        color: "#000",
                                        fontWeight: 600,
                                        textTransform: "none",
                                        borderRadius: 2,
                                        "&:hover": {
                                            backgroundColor: "#d9a600",
                                        },
                                    }}
                                >
                                    {mode.title}
                                </Button>
                            </CardActions> */}
                        </Card>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#EAB308",
                                color: "#fffff",
                                fontWeight: 600,
                                textTransform: "none",
                                borderRadius: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin:"auto",
                                my: 2,
                                "&:hover": {
                                    backgroundColor: "#d9a600",
                                },
                            }}
                        >
                            {mode.title}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="h5" fontWeight={700} color="#EAB308">
                    Comming Soon.....
                </Typography>
            </Box>
        </Box>
    );
};

export default ThemeSettings;
