import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ReportCard = ({ data }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const {
    userId,
    reason,
    createdAt,
    status,
    questionId: { syllabus, explanation, question, book, chapter } = {},
  } = data;

  const highlight = reason === "";
  const message = highlight
    ? `You have reported a question on ${syllabus}, book: ${book}, chapter: ${chapter}, ${status === "pending" ? "is" : "has been"} ${status} by Admin.`
    : `Your explanation on a question on ${syllabus}, book: ${book}, chapter: ${chapter}, ${status === "pending" ? "is" : "has been"} ${status} by Admin.`;
  const time = new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <Paper
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        p: 2,
        backgroundColor: theme.report.filedReport,
        border: `2px solid ${theme.report.filedReportBorder}`,
        borderRadius: 2,
        boxShadow: 0,
      }}
    >
      <Avatar sx={{ bgcolor: theme.report.avatar, width: 36, height: 36 }}>
        {userId?.username?.[0]?.toUpperCase() || "U"}
      </Avatar>
      <Box flex={1}>
        {/* <Typography fontSize={14}>{message}</Typography> */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontSize={14}>{message}</Typography>
          <IconButton onClick={() => setExpanded((prev) => !prev)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Typography fontSize={12} color="gray">
          {time}
        </Typography>
        <Collapse in={expanded}>
          <Box
            mt={2}
            p={2}
            sx={{
              backgroundColor: !highlight ? theme.report.filedReportBorder : theme.report.filedReportBorder,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="caption"
              color="orange"
              fontWeight={600}
              sx={{ mb: 0, display: "block" }}
            >
              Question
            </Typography>
            <Typography fontSize={13} mb={1} color="text.secondary">
              {question}
            </Typography>
            {!highlight && reason && (
              <>
                <Typography
                  variant="caption"
                  color="orange"
                  fontWeight={600}
                  sx={{ mb: 0, display: "block" }}
                >
                  Your Answer
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  {reason}
                </Typography>
              </>
            )}
          </Box>
        </Collapse>
      </Box>
    </Paper>
  );
};

export default ReportCard;
