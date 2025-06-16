import {
  Link,
} from "@mui/material";
import "./home.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function HomeSection() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/training");

  const testimonial = {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget. Et integer facilisi",
    name: "Awlad Hossain",
    role: "UI Designer",
    rating: 5,
  };

  const [expanded, setExpanded] = useState("panel0");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const cardDetails = [
    {
      title: "Latest Practice Material",
      text: "Dive into a rich collection of chapter-wise practice questions, updated regularly to cover the latest syllabus topics. Explore a variety of subjects with well-organized content designed to help you master each concept step-by-step.",
    },
    {
      title: "Realistic Practice Tests",
      text: "Experience exam-like tests that mimic real conditions, complete with a timer and a variety of question formats to enhance your readiness. Get instant feedback on your performance to identify areas for improvement and boost your confidence.",
    },
    {
      title: "Personalized Progress Tracking",
      text: "Monitor your learning journey with easy-to-read charts and graphs that show your strengths and weak areas. Get tailored suggestions to improve your scores over time.",
    },
    {
      title: "Be A Part Of Our Club",
      text: "Connect with a vibrant community of learners and get personalized help from peers and experienced educators. Ask doubts, share tips, and receive guidance tailored to your exam preparation needs.",
    },
  ];

  const TestimonialCard = () => (
    <Card className="cockpit-testimonial-card" sx={{ fontSize: "1rem" }}>
      <CardContent>
        <Box className="cockpit-testimonial-header">
          <Typography
            sx={{ fontSize: "3rem" }}
            className="cockpit-testimonial-quote"
          >
            “
          </Typography>
          <Rating
            value={testimonial.rating}
            readOnly
            size="small"
            className="cockpit-testimonial-rating"
          />
        </Box>
       <Typography className="cockpit-testimonial-text" sx={{ fontSize: { xs: '18px', sm: '20px',  md: '22px',  lg: '24px',  xl: '26px',},mb: 3,}}>  
         {testimonial.text}
       </Typography>

        <Box className="cockpit-testimonial-user">
          <Box className="cockpit-testimonial-avatar" />
          <Box>
            <Typography
              variant="subtitle1"
              className="cockpit-testimonial-name"
            >
              {testimonial.name}
            </Typography>
            <Typography variant="caption" className="cockpit-testimonial-role">
              {testimonial.role}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <section>
        <Container>
          <Box className="hero-section" sx={{ py: {md:10,xs:0} }}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Grid size={{ xs: 12 }}>
                <Typography fontWeight={600} color="#183251" sx={{ fontFamily: "Exo, sans-serif", fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "3.25rem" } }}>Build Your Skills With <br /><Box component="span" color="#EAB308">COCKPIT</Box> — Your Gateway To The Skies!</Typography>

                <Typography className="banner-text1" sx={{ mt: 3,fontSize:{ xs: '18px', sm: '18px', md: '18px', lg: '18px', xl: '18px' },width: { xs: '100%', sm: '100%', md: '60%', lg: '60%', xl: '60%' } }}>
                  Embark on your aviation journey with expert-led training and
                  personalised learning. Whether you’re a beginner or preparing
                  for exams, we’ll help you soar higher.
                </Typography>
                <Typography fontWeight={600} className="banner-text2">
                  Ready for Takeoff?
                </Typography>

                <Button
                  variant="contained"
                  sx={{ mt: 2, px: 4, py: 1.5 }}
                  onClick={handleClick}
                >
                  Get Started
                </Button>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Box
                  component="img"
                  src="/images/Plane.png"
                  alt="Plane"
                  className="plane-img"
                  sx={{ mt: 4, maxWidth: "100%" }}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </section>

      <section>
        <Box className="offer" sx={{ py: 8 }}>
          <Container>
            <Typography
              variant="h4"
              fontWeight={600}
              fontSize={{xs: "35px", sm: "45px", md: "45px", lg: "45px", xl: "45px" }}
              textAlign="left"
              className="offer-heading"
              gutterBottom
            >
              What We Deliver For Your Takeoff!
            </Typography>
            <Typography className="offer-text" textAlign="left" fontSize={{ xs: "18px", sm: "18px", md: "20px", lg: "26px", xl: "26px" }}>
              Unlock your potential with training and insights built for pilots,
              whether you’re just starting or aiming for the high skies
            </Typography>
            <Grid container spacing={4} mt={3}>
              {cardDetails.map((item, index) => (
                <Grid key={index} size={{ xs: 12, md: 6, lg: 3 }}>
                  {/* Use flex column to push the link to the bottom */}
                  <Card
                    elevation={2}
                    sx={{
                      borderRadius: 4,
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        className="offer-card-title"
                        sx={{ fontWeight: "bold", mb: 2 }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        className="offer-card-text"
                        sx={{ color: "text.secondary", mb: 2 }}
                      >
                        {item.text}
                      </Typography>

                      <Link
                        href="#"
                        underline="none"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          display: "block",
                          mt: "auto",
                        }}
                      >
                        Learn more →
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </section>

      <section>
        <Box
          className="testimonials"
          sx={{ py: 8, backgroundColor: "#f5f5f5" }}
        >
          <Container>
            <Grid container spacing={4} justifyContent="center">
              <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
                <Typography className="testimonial-heading" fontSize={{ xs: "30px", sm: "30px", md: "40px", lg: "40px", xl: "40px" }}>
                  Aviators Review
                </Typography>
                <Typography className="testimonial-text" fontSize={{ xs: "16px", sm: "16px", md: "18px", lg: "18px", xl: "18px" }}>
                  Authentic stories, honest ratings, and first-hand experiences
                  from our student pilots. Discover why future aviators trust{" "}
                  <span style={{ color: "#EAB308" }}>COCKPIT</span> with their
                  dreams.
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 6 }}>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <TestimonialCard />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md:6 }}>
                <TestimonialCard />
              </Grid>
            </Grid>

            <Grid container spacing={4} justifyContent="center" sx={{ mt: 6 }}>
              <Grid item size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  textAlign="center"
                  fontSize={{ xs: "30px", sm: "30px", md: "40px", lg: "40px", xl: "40px" }}
                  gutterBottom
                >
                  Frequently Asked Questions
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  textAlign="center"
                  mb={5}
                  fontSize={{ xs: "16px", sm: "16px", md: "18px", lg: "18px", xl: "18px" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Faucibus in libero risus semper habitant arcu eget.
                </Typography>
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Grid item size={{ xs: 12, md: 8 }}>
                {["What Is Cockpit?", "How Does It Help?", "Who Can Join?"].map(
                  (question, index) => {
                    const panel = `panel${index}`;
                    return (
                      <Accordion
                        key={index}
                        expanded={expanded === panel}
                        onChange={handleChange(panel)}
                        defaultExpanded={index === 0}
                        sx={{ marginBottom: 2, borderRadius: 2 }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          sx={{
                            backgroundColor:
                              expanded === panel ? "#289BDE1A" : "white",
                            height: "80px",
                          }}
                        >
                          <Typography>{question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography color="text.secondary" fontStyle="italic">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Faucibus in libero risus semper habitant arcu
                            eget.
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </section>
    </>
  );
}

export default HomeSection;
