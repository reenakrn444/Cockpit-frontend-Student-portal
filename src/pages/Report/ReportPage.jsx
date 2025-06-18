
import ReportList from "./ReportList";

const ReportPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box sx={{ p: isMobile ? 2 : 4, minHeight: "auto" }}>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 1131,
                    height: 64,
                    backgroundColor: "#f9f9f9",
                    borderRadius: "12px 12px 0 0",
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0px 0px 2px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                }}
            >
                <Grid container columns={12} spacing={0}
                    sx={{ width: "100%", height: "100%" }}>
                    {["Report", "", "", ""].map((label, index) => (
                        <Grid
                            size={{ xs: 3, md: 3 }}
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: index === 0 ? "#f5f5f5" : "transparent",
                                borderRight: index < 3 ? "1px solid #e0e0e0" : "none",
                                borderRadius:
                                    index === 0
                                        ? "12px 0 0 0"
                                        : index === 3
                                            ? "0 12px 0 0"
                                            : "0",
                            }}
                        >
                            {label && <Typography
                                sx={{
                                    fontWeight: 700,
                                    color: index === 0 ? "#f1b600" : "#999",
                                    fontSize: 18,
                                    textAlign: "center",
                                    width: "100%",
                                }}
                            >
                                {label}
                            </Typography>}
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <ReportList />
        </Box>
    );
};

export default ReportPage;
