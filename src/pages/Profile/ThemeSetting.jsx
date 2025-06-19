const ThemeSettings = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{ p: 10, minHeight: "auto", backgroundColor: "#fafafa" }}>
            <Grid container spacing={4} justifyContent="center">
                {/* Left Password Card */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box
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
                    </Box>
                </Grid>

                {/* Light/Dark Mode Cards */}
                {[
                    {
                        title: "Light Mode",
                        image:
                            "https://images.unsplash.com/photo-1504199364136-0048ba908f9c?auto=format&fit=crop&w=600&q=80",
                    },
                    {
                        title: "Dark Mode",
                        image:
                            "https://images.unsplash.com/photo-1529253355930-8c1346cc6f5f?auto=format&fit=crop&w=600&q=80",
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
                                image={mode.image}
                                alt={mode.title}
                            />
                            <CardActions sx={{ justifyContent: "center", p: 2 }}>
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
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="h5" fontWeight={700} color="#0c2340">
                    Comming Soon.....
                </Typography>
               </Box>
        </Box>
    );
};

export default ThemeSettings;
