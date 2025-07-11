// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Container,
//   Grid,
//   MenuItem,
//   Select,
//   Typography,
//   LinearProgress,
//   IconButton,
// } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const courses = Array(4).fill({
    title: "Air Navigation",
    subtitle: "General, Instrument, Radio",
    progress: 60,
});

const FlightLog = () => {
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Typography variant="h4" fontWeight={700} mb={0.5}>
                Welcome back, Bhumika
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={4}>
                Your Flight log.
            </Typography>

            {/* Stats Section */}
            <Grid container spacing={3} mb={5}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, borderRadius: 3 }}>
                        <Typography fontWeight={600} mb={1}>
                            Completed Test
                        </Typography>
                        <Typography fontSize={48} fontWeight={700} color="#F5B400">
                            3
                        </Typography>
                        <Button
                            sx={{
                                textTransform: "none",
                                color: "#9A6C00",
                                fontWeight: 600,
                                mt: 1,
                            }}
                            size="small"
                            endIcon={<span>→</span>}
                            onClick={() => navigate('/flight-log-report')}
                        >
                            report
                        </Button>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 3, borderRadius: 3 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography fontWeight={600}>Performance</Typography>
                            <Select
                                size="small"
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                sx={{ fontSize: 14 }}
                            >
                                <MenuItem value="Weekly">Weekly</MenuItem>
                                <MenuItem value="Monthly">Monthly</MenuItem>
                            </Select>
                        </Box>
                        <Box
                            mt={3}
                            mb={1}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height={120}
                        >
                            {/* Gauge substitute */}
                            <Box
                                sx={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: "50%",
                                    border: "8px solid #F5B400",
                                    borderBottomColor: "#f0f0f0",
                                    transform: "rotate(45deg)",
                                }}
                            />
                        </Box>
                        <Typography align="center" fontWeight={600}>
                            Your Grade: <span style={{ fontWeight: 700 }}>8.966</span>
                        </Typography>
                    </Card>
                </Grid>
            </Grid>

            {/* Progress Section */}
            <Typography variant="h6" fontWeight={600} mb={2}>
                Progress
            </Typography>

            <Box display="flex" justifyContent="flex-end" mb={1} gap={1}>
                <IconButton size="small">
                    <ArrowBackIos fontSize="small" />
                </IconButton>
                <IconButton size="small">
                    <ArrowForwardIos fontSize="small" />
                </IconButton>
            </Box>

            <Grid container spacing={3}>
                {courses.map((course, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <Card sx={{ borderRadius: 3 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://via.placeholder.com/300x140?text=Course"
                                alt={course.title}
                            />
                            <CardContent>
                                <Typography fontWeight={600}>{course.title}</Typography>
                                <Typography fontSize={12} color="text.secondary" mb={1}>
                                    {course.subtitle}
                                </Typography>

                                <Box sx={{ mb: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={course.progress}
                                        sx={{
                                            height: 6,
                                            borderRadius: 5,
                                            backgroundColor: "#f0f0f0",
                                            "& .MuiLinearProgress-bar": {
                                                backgroundColor: "#1A73E8",
                                            },
                                        }}
                                    />
                                </Box>

                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#F5B400",
                                        color: "#fff",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        "&:hover": { backgroundColor: "#e0a400" },
                                    }}
                                >
                                    Resume
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FlightLog;
