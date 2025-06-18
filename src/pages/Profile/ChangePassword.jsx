const ChangePassword = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box sx={{ p: 5, backgroundColor: "#fafafa", minHeight: "auto" }}>
            <Grid container spacing={4} justifyContent="center">
                {/* Left Card */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                        sx={{
                            backgroundColor: "#0c2340",
                            borderRadius: 3,
                            p: 4,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            color: "#ffffff",
                            boxShadow: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight={700}
                                sx={{ color: "#f1b600", mb: 2 }}
                            >
                                Password
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
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

                {/* Right Form */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box
                        sx={{
                            // backgroundColor: "#ffffff",
                            p: isMobile ? 2 : 4,
                            // borderRadius: 2,
                            // boxShadow: 1,
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            gap={2}
                            mb={4}
                        >
                            <Typography variant="h6" fontWeight={600}>
                                Change Password
                            </Typography>
                            <Avatar
                                src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png"
                                sx={{ width: 40, height: 40 }}
                            />
                        </Box>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Typography sx={{ mb: 0.5 }}>Current Password</Typography>
                                <TextField fullWidth size="small" placeholder="Enter current password" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography sx={{ mb: 0.5 }}>New Password</Typography>
                                <TextField fullWidth size="small" placeholder="Enter new password" />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography sx={{ mb: 0.5 }}>Confirm Password</Typography>
                                <TextField fullWidth size="small" placeholder="Confirm new password" />
                            </Grid>

                            <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#f1b600",
                                        color: "#000",
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        textTransform: "none",
                                        px: 4,
                                        mt: 2,
                                        "&:hover": {
                                            backgroundColor: "#d9a600",
                                        },
                                    }}
                                >
                                    Change Password
                                </Button>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Typography
                                    variant="caption"
                                    display="block"
                                    align="center"
                                    color="gray"
                                    sx={{ mt: 1 }}
                                >
                                    You will be asked to log in again with your new password after you save your changes.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChangePassword;
