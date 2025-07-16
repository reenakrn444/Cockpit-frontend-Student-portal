const LegendItem = ({ color, label }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: color,
      }}
    />
    <Typography variant="body2" sx={{ fontSize: 14 }}>
      {label}
    </Typography>
  </Stack>
);

const TestFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        padding: '8px 16px',
        width: '100%',
        position: 'fixed',
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
        <LegendItem color="#1976d2" label="Current" />
        <LegendItem color="#ffffff" label="Not Attempted" />
        <LegendItem color="#2e7d32" label="Answered" />
        <LegendItem color="#f9a825" label="Not Answered" />
        <LegendItem color="#9c27b0" label="Review" />
      </Stack>
    </Box>
  );
};

export default TestFooter;
