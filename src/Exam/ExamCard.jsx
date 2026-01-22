import { BookIcon } from "../Exam/images";

const ExamCard = ({ exam }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box className="exam-card">
      {/* HEADER */}
      <Box className="exam-header">
        <img src={BookIcon} alt="BookIcon" className="Bookicon" />

        <Chip
          label={exam.authority}
          size="small"
          sx={{
            fontWeight: 500,
            backgroundColor: "#0f2a44",
            color: "white",
          }}
        />
      </Box>

      {/* TITLE */}
      <Typography
        variant="h6"
        fontWeight={600}
        sx={{
          mt: 2,
          fontFamily: "Exo, sans-serif",
        }}
      >
        {exam.title}
      </Typography>

      {/* DESCRIPTION */}
      <Typography
        sx={{
          mt: 1,
          mb: 2,
          fontFamily: "Exo, sans-serif",
          color: "#6b7280",
          fontSize: "0.9rem",
          lineHeight: 1.5,
        }}
      >
        {exam.desc}
      </Typography>

      {/* SYLLABUS */}
      <Box
        className="syllabus"
        onClick={() => setOpen(!open)}
        sx={{ cursor: "pointer" }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: 500,
            fontSize: 20,

            textAlign: 18,
          }}
        >
          Syllabus
        </Typography>
        <Typography
          component="span"
          className="chapter"
          sx={{
            fontWeight: 500,
            fontSize: 18,
            textAlign: 50,
          }}
        >
          {exam.chapters} chapters
        </Typography>
        <span
          className="dropdowns-arrow"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "0.3s",
          }}
        >
          ⏷
        </span>
      </Box>
      {/* EXPANDED CONTENT (ONLY ON CLICK) */}
      <Collapse in={open}>
        <Box sx={{ mt: 2 }}>
          {[...Array(exam.chapters)].map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                mb: 1.5,
                borderRadius: 2,
                backgroundColor: "#fffaf0",
              }}
            >
              <Typography fontWeight={600}>METEOROLOGY</Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#fbbf24",
                  color: "#000",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#f59e0b",
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default ExamCard;
