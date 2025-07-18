
const styles = {

  heading: {
    color: "#183251",
    fontFamily: "Jost",
    fontWeight: 700,
    fontSize: { xs: "16px", sm: "18px" },
  },
  sectionTitle: {
    color: "#EAB308",
    fontFamily: "Jost",
    fontWeight: 400,
    fontSize: { xs: "16px", sm: "18px" },
  },
  itemText: {
    color: "#555555",
    fontFamily: "Jost",
    fontSize: { xs: "16px", sm: "18px" },
  },
  subHeading: {
    color: "#183251",
    fontFamily: "Jost",
    fontWeight: 700,
    mt: 2,
    fontSize: { xs: "16px", sm: "18px" },
  },
  finalNote: (isSmall) => ({
    color: "#183251",
    fontWeight: "bold",
    fontSize: isSmall ? "0.9rem" : "18px",
    mt: 4,
  }),
  getStartedButton: {
    backgroundColor: "#183251",
    fontFamily: "Be Vietnam Pro",
    fontWeight: 400,
    fontSize: { xs: "16px", sm: "18px" },
    textTransform: "none",
    color: "#EAB308",
    borderRadius: "8px",
    width: "auto"
  },
};



const instructions = [
  {
    title: "Navigation",
    points: [
      "Use the Next and Previous buttons to move between questions.",
      "You may skip questions and revisit them using the Question Palette.",
    ],
  },
  {
    title: "Flagging for Review",
    points: [
      "Use the Flag option to mark questions you wish to revisit before submitting.",
    ],
  },
  {
    title: "Answer Selection",
    points: [
      "Select the correct answer by clicking on one of the options (A, B, C, or D).",
      "You may change your answer anytime before submission.",
    ],
  },
  {
    title: "Timer Management",
    points: [
      "A countdown timer will be visible at the top of the screen.",
      "The test will be auto-submitted once the timer reaches zero.",
    ],
  },
  {
    title: "Submit Test",
    points: [
      "Ensure all answers are reviewed before clicking on the Submit button.",
      "Unanswered questions will remain blank, affecting your score if applicable.",
    ],
  },
];

import { Link } from "@mui/material";

const TestInstructions = ({ syllabusId, bookId, activeBook, syllabusTitle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box sx={styles.container}>

        <Typography gutterBottom sx={styles.heading}>
          General Information
        </Typography>

        <Typography sx={styles.itemText}>Total Questions: [50 Questions]</Typography>
        <Typography sx={styles.itemText}>Total Time: [90 Minutes]</Typography>
        <Typography sx={styles.itemText}>Question Type: Multiple Choice Questions (MCQs)</Typography>
        <Typography sx={styles.itemText}>
          Marking Scheme: [Explain if applicable: No Negative Marking]
        </Typography>

        {/* Test Interface Overview */}
        <Typography variant="h6" sx={{ ...styles.heading, mt: 4 }} gutterBottom>
          Test Interface Overview
        </Typography>

        <Grid container spacing={0}>
          {instructions.map((instruction, index) => (
            <Grid size={{ xs: 12 }} key={index}>
              <Typography display="inline" sx={styles.sectionTitle}>
                {index + 1}. {instruction.title}:
              </Typography>
              <Box ml={2} component="ul" sx={{ pl: 2, m: 0 }}>
                {instruction.points.map((point, i) => (
                  <li key={i} style={{ marginBottom: "4px" }}>
                    <Typography component="span" sx={styles.itemText}>
                      {point}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>


        {/* Rules and Regulations */}
        <Typography variant="h6" sx={styles.subHeading}>
          Rules and Regulations
        </Typography>
        <Typography sx={styles.itemText}>
          No External Help: The use of study materials, electronic devices, or assistance from others is strictly prohibited.
        </Typography>
        <Typography sx={styles.itemText}>
          Single Attempt: Once submitted, the test cannot be resumed or retaken.
        </Typography>
        <Typography sx={{ ...styles.itemText, mt: 1 }}>
          Any attempt to breach the guidelines may lead to termination of your test session and may impact your eligibility for further assessments.
        </Typography>

        {/* Evaluation */}
        <Typography variant="h6" sx={styles.subHeading}>
          Evaluation
        </Typography>
        <Typography sx={styles.itemText}>
          Your results will be displayed upon submission or available in your dashboard.
        </Typography>

        {/* Final Note */}
        <Typography sx={styles.finalNote(isSmall)}>
          By swiping and starting the test, you confirm that you have read, understood, and agreed to the  <Link href="/test-terms-and-conditions" underline="hover" sx={{ color: '#1A7FC1' }}>Terms and Conditions </Link> and the rules outlined above.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        <Button variant="contained" sx={styles.getStartedButton} onClick={() => {
          navigate("/testpage", { state: { syllabusId, bookId, activeBook, syllabusTitle } })
        }
        }>
          Get Started
        </Button>
      </Box>
    </>

  );
};

export default TestInstructions;
