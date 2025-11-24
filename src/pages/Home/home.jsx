import { Link } from "@mui/material";
import "./home.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Faq from "./Faq";
import getFeatures from "./Features";
import reviews from "./Reviews";
import PartnerSection from "./partners";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

function HomeSection() {
  const Features = getFeatures();
  const navigate = useNavigate();
  const handleClick = () => navigate(!token ? "/login" : "/training");
  const token = localStorage.getItem("authToken");

  const [expanded, setExpanded] = useState("panel0");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const cardsToShow = isSmallScreen ? 1 : 2;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - cardsToShow, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + cardsToShow, reviews.length - cardsToShow)
    );
  };

  const visibleCards = reviews.slice(currentIndex, currentIndex + cardsToShow);

  const TestimonialCard = ({ testimonial }) => (
    <Card
      sx={{
        fontSize: "6px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "1rem",
        padding: "1rem",
        color: "#ffffff",
        width: "100%",
        backgroundColor: theme.HomeHeader.reviewCard,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          className="cockpit-testimonial-header"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <img
            src="/src/assests/images/RatingHeader.svg"
            alt="“"
            width={30}
            height={30}
          ></img>
          <Rating value={testimonial.rating} readOnly size="small" />
        </Box>
        <Typography
          sx={{ fontSize: { xs: "16px", sm: "14px", md: "14px" }, mt: 2 }}
        >
          {testimonial.review}
        </Typography>
      </CardContent>

      <CardActions sx={{ pt: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            alt={testimonial.userName}
            src={testimonial.image || undefined}
          />
          <Box>
            <Typography variant="subtitle1">{testimonial.userName}</Typography>
            <Typography variant="caption">
              {testimonial.studentDesig}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );

  return (
    <>
      <section>
        <Container maxWidth="xl">
          <Box
            component="div"
            sx={{
              backgroundImage: `url("/images/world-map.png")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "100% auto",
              position: "relative",
              py: { md: 10, xs: 0 },
            }}
          >
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Grid size={{ xs: 12 }}>
                <Typography
                  fontWeight={600}
                  color={theme.HomeHeader.headingText}
                  sx={{
                    fontFamily: "Exo, sans-serif",
                    fontSize: {
                      xs: "1.75rem",
                      sm: "2rem",
                      md: "2.5rem",
                      lg: "3rem",
                      xl: "3.25rem",
                    },
                  }}
                >
                  Build Your Skills For DGCA Exams With <br />
                  <Box component="span" color="#EAB308">
                    COCKPIT
                  </Box>{" "}
                  — Your Gateway To The Skies!
                </Typography>

                <Typography
                  color={theme.HomeHeader.headingText}
                  sx={{
                    mt: 3,
                    fontSize: {
                      xs: "18px",
                      sm: "18px",
                      md: "18px",
                      lg: "18px",
                      xl: "18px",
                    },
                    width: {
                      xs: "100%",
                      sm: "100%",
                      md: "60%",
                      lg: "60%",
                      xl: "60%",
                    },
                  }}
                >
                  Most trusted pilot training platform for aspiring aviators -
                  offering DGCA aligned content, CPL & ATPL exam prep, adaptive
                  mock testing, and expert aviation guidance to help you
                  succeed.
                </Typography>
                <Typography
                  fontWeight={600}
                  color={theme.HomeHeader.headingText}
                >
                  Ready for Takeoff?
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    backgroundColor: theme.HomeHeader.homeButton,
                    color: theme.palette.primary.secondary,
                  }}
                  onClick={handleClick}
                >
                  Get Started
                </Button>
              </Grid>
              <Grid size={{ xs: 12 }} textAlign="center">
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
        <Box sx={{ py: 8, backgroundColor: theme.HomeHeader.backgroundColor }}>
          <Container>
            <Typography
              variant="h4"
              fontWeight={600}
              fontSize={{
                xs: "35px",
                sm: "45px",
                md: "45px",
                lg: "45px",
                xl: "45px",
              }}
              textAlign="left"
              sx={{
                fontFamily: "Exo",
                color: "#eab308",
                textTransform: "Capitalize",
              }}
              gutterBottom
            >
              What We Deliver For Your Takeoff!
            </Typography>
            <Typography
              className="offer-text"
              textAlign="left"
              fontSize={{
                xs: "18px",
                sm: "18px",
                md: "20px",
                lg: "26px",
                xl: "26px",
              }}
            >
              Unlock your potential with training and insights built for pilots,
              whether you’re just starting or aiming for the high skies
            </Typography>
            <Grid container spacing={4} mt={3}>
              {Features?.map((item, index) => (
                // <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                <Grid key={index} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  {/* Use flex column to push the link to the bottom */}
                  <Card
                    elevation={2}
                    sx={{
                      borderRadius: 4,
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      backgroundColor: theme.card.cardColor,
                    }}
                  >
                    <CardHeader
                      title={item.title}
                      className="offer-card-title"
                      sx={{ fontWeight: "bold", mb: 2 }}
                    ></CardHeader>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        className="offer-card-text"
                        sx={{ color: "text.secondary", mb: 2 }}
                      >
                        {item.text}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link
                        href={item?.navigation}
                        underline="none"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          display: "block",
                          mt: "auto",
                        }}
                      >
                        {item?.navigateText} →
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </section>
      <section>
        <PartnerSection />
      </section>
      <section>
        <Box
          className="testimonials"
          sx={{ py: 4, backgroundColor: theme.HomeHeader.reviewBackground }}
        >
          <Container>
            <Grid container spacing={4} justifyContent="center">
              <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
                <Typography
                  fontSize={{
                    xs: "30px",
                    sm: "30px",
                    md: "40px",
                    lg: "40px",
                    xl: "40px",
                    fontFamily: "Exo",
                    fontWeight: 600,
                    textAlign: "center",
                    color: theme.HomeHeader.partnerText,
                  }}
                >
                  Aviators Review
                </Typography>
                <Typography
                  fontSize={{
                    xs: "16px",
                    sm: "16px",
                    md: "18px",
                    lg: "18px",
                    xl: "18px",
                    color: theme.HomeHeader.smallPartnerText,
                  }}
                >
                  Authentic stories, honest ratings, and first-hand experiences
                  from our student pilots. Discover why future aviators trust{" "}
                  <span style={{ color: "#EAB308" }}>COCKPIT</span> with their
                  dreams.
                </Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 4,
                mt: 4,
              }}
            >
              <IconButton
                onClick={handlePrev}
                disabled={currentIndex === 0}
                disableRipple
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&.Mui-disabled": {
                    opacity: 0.3, // optional: customize disabled opacity
                  },
                }}
              >
                <ArrowBackIos />
              </IconButton>
              <Grid container spacing={2}>
                {visibleCards.map((review, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <TestimonialCard testimonial={review} />
                  </Grid>
                ))}
              </Grid>
              <IconButton
                onClick={handleNext}
                disabled={currentIndex + cardsToShow >= reviews.length}
                disableRipple
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                  "&.Mui-disabled": {
                    opacity: 0.3, // optional: customize disabled opacity
                  },
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Box>

            {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 6 }}>
              {reviews.map((review, index) => (
                <Grid size={{ xs: 12, sm: 4, md: 4 }} key={index}>
                  <TestimonialCard testimonial={review} />
                </Grid>
              ))}
            </Grid> */}

            <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  textAlign="center"
                  fontSize={{
                    xs: "30px",
                    sm: "30px",
                    md: "40px",
                    lg: "40px",
                    xl: "40px",
                  }}
                  gutterBottom
                  color={theme.HomeHeader.partnerText}
                >
                  Frequently Asked Questions
                </Typography>
                <Typography
                  variant="body1"
                  color={theme.HomeHeader.smallPartnerText}
                  textAlign="center"
                  mb={5}
                  fontSize={{ xs: "16px", sm: "16px" }}
                >
                  From takeoff to touchdown, we've got your questions on radar.
                </Typography>
              </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Grid size={{ xs: 12, md: 8 }}>
                {Faq?.map((question, index) => {
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
                            expanded === panel
                              ? theme.HomeHeader.questionBackground
                              : theme.HomeHeader.questionBackgroundnotchoosed,
                          border:
                            expanded === panel
                              ? null
                              : theme.HomeHeader.questionBackgroundBorder,
                          height: "80px",
                        }}
                      >
                        <Typography>{question?.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          color={theme.HomeHeader.questionAnswer}
                          fontStyle="italic"
                        >
                          {question?.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </section>
    </>
  );
}

export default HomeSection;
