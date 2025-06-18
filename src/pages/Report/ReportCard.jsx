

const ReportCard = ({ data }) => {
  const { user, message, time, highlight, answer } = data;

  return (
    <Paper
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        p: 2,
        backgroundColor: highlight ? "#fefdc7" : "#f6f8fc",
        borderRadius: 2,
        boxShadow: 0,
      }}
    >
      <Avatar sx={{ bgcolor: "#1976d2", width: 36, height: 36 }}>
        {user}
      </Avatar>
      <Box flex={1}>
        <Typography fontSize={14}>{message}</Typography>
        <Typography fontSize={12} color="gray">
          {time}
        </Typography>
        {answer && (
          <Box
            mt={2}
            p={2}
            sx={{
              backgroundColor: "#f1f1f1",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="caption"
              color="orange"
              fontWeight={600}
              sx={{ mb: 1, display: "block" }}
            >
              Your Answer
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              {answer.text}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ReportCard;
