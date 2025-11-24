const LegendItem = ({ color, label }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: color,
      }}
    />
    <Typography variant="body2" sx={{ fontSize: 14 }}>
      {label}
    </Typography>
  </Stack>
);

const TestFooter = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? "#3932326e" : "#f0f0f0",
        padding: "8px 16px",
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        spacing={{ xs: 2, sm: 4, md: 6 }}
        flexWrap="wrap"
      >
        <LegendItem color="#0D76F3" label="Current" />
        <LegendItem color="#ffffff" label="Skipped" />
        <LegendItem color="#22C55E" label="Answered" />
        <LegendItem color="#EAB308" label="Not Answered" />
        <LegendItem color="#A855F7" label="Review" />
      </Stack>
    </Box>
  );
};

export default TestFooter;
