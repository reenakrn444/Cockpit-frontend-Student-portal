const styles = {
  wrapper: {
    backgroundColor: "#fff",
    py: 8,
    mt: { xs: 2, sm: 8 },
  },
  title: {
    fontWeight: 700,
    mb: 4,
  },
  subheading: {
    fontWeight: 700,
    mt: 6,
    mb: 2,
  },
  paragraph: {
    color: "text.secondary",
  },
  image: {
    my: 4,
    borderRadius: 2,
  },
  largeCard: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { sm: "center" },
    p: 1,
    borderRadius: 3,
    backgroundColor: "white",
    cursor: "pointer",
  },
};

const BlogSection1 = () => {
  const navigate = useNavigate();
  const cardData = [
    {
      image: "/images/doctor.png",
      title:
        "DGCA’s Medical Test Mandate at IAF Centres: Pros and Cons for Pilots",
      date: "July 04 , 2025",
      onClick: () => navigate("/blog2"),
    },
    {
      image: "/images/newaeroplane.png",
      title: "Code 7500: How Hijacking Protocols Changed Aviation Forever",
      date: "July 11, 2025",
      onClick: () => navigate("/blog3"),
    },
    {
      image: "/images/aeroplaneparts.png",
      title:
        "Storm Spotters in the Sky: How Airborne Weather Radar Keeps Flights Safe",
      date: "July 11, 2025",
      onClick: () => navigate("/blog4"),
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#F9F9F9" }}>
      {/* Hero Blog Card */}
      <Container maxWidth="md" sx={{ pt: 8 }}>
        <Card sx={{ borderRadius: "20px", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="360"
            image="/images/aeroplane.png"
            alt="Main Blog"
          />
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              DGCA’s New FTO Ranking System: What Aspiring Pilots Need to Know
            </Typography>
            <Typography variant="h8" sx={{ fontWeight: 300, mb: 1 }}>
              Picture this: you’re an aspiring pilot, dreaming of soaring
              through the skies, but faced with a daunting choice—picking the
              right flying school in India. With 34 DGCA-approved Flying
              Training Organisations (FTOs) operating across 52 bases, how do
              you know which one will give you the wings to succeed? Enter the
              Directorate General of Civil Aviation’s (DGCA) groundbreaking FTO
              ranking system, launching on October 1, 2025. This new framework
              promises to revolutionize pilot training in India by shining a
              spotlight on quality, safety, and transparency.
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Blog Content */}
      <Box sx={styles.wrapper}>
        <Container maxWidth="md">
          <Typography variant="h5" sx={styles.title}>
            Why the DGCA Introduced the FTO Ranking System
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            India’s aviation sector is booming, with airlines like IndiGo and
            Air India expanding fleets and routes. But recent incidents,
            including crashes involving trainer aircraft, have exposed gaps in
            the quality of some FTOs. Aspiring pilots and their families often
            struggle to identify credible institutions, with concerns about
            safety, training delays, and hidden costs. The DGCA’s new ranking
            system, announced on July 8, 2025, aims to address these issues
            head-on. Here’s why it matters:
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Transparency for Students:</strong> The rankings will help
            you choose FTOs based on objective data, not just flashy websites or
            low fees.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Safety First:</strong> By prioritizing safety standards, the
            system ensures you train in environments that minimize risks.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Standardized Quality:</strong> Uniform criteria will push
            FTOs to maintain high training standards, ensuring you’re job-ready.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Accountability:</strong> Underperforming FTOs will face
            scrutiny, driving a culture of continuous improvement.
          </Typography>

          <Typography variant="h6" sx={styles.subheading}>
            How the Ranking System Works
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            The DGCA’s ranking system evaluates FTOs on four key performance
            categories, assigning scores that place them in one of four tiers:
            A++ (85% and above), A+ (70–84.99%), A (50–69.99%), or B (below
            50%). If an FTO scores below 50%, it receives a notice for
            self-analysis and must improve or face regulatory action.
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Operational Aspects (40%):</strong> This includes the
            instructor-to-aircraft ratio, student-to-instructor ratio, fleet
            size (single and multi-engine aircraft), availability of ground
            school, and simulator facilities.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Safety Standards (20%):</strong> Measures accidents,
            incident reporting, and adherence to safety protocols.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Performance (20%):</strong> Evaluates how quickly students
            complete 200 flight hours and pass DGCA exams.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Compliance Standards (10%):</strong> Assesses adherence to
            DGCA regulations and documentation.
          </Typography>

          <Typography variant="h6" sx={styles.subheading}>
            What This Means for Aspiring Pilots
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>1. Informed Decision-Making:</strong> The biannual rankings
            help you objectively compare FTOs. Top FTOs like Redbird Flying
            Training Institute often stand out for fleet size and operational
            efficiency.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>2. Focus on Safety:</strong> FTOs with clean safety records,
            like Chimes Aviation Academy, will rank higher, helping you pick
            safer schools.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>3. Faster Training Timelines:</strong> FTOs like Carver
            Aviation Academy reduce CPL delays with strong fleet support and
            consistent weather.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>4. Career Opportunities:</strong> Higher-ranked FTOs often
            partner with airlines, boosting your placement prospects
            post-training.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>5. Avoiding Underperformers:</strong> B-rated FTOs will be
            flagged. This helps you steer clear of schools with training or
            safety issues.
          </Typography>

          <Typography variant="h6" sx={styles.subheading}>
            Challenges and What to Watch For
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Challenges remain: instructor shortages, long approval times for
            aircraft/FTOs, and DGCA system delays can still impact training
            timelines—even at top-rated schools. Students should continue
            checking alumni feedback and verifying approval statuses.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Technical issues in the DGCA’s eGCA portal have caused delays in
            license processing. While rankings won’t solve this directly,
            they’ll push FTOs to improve operations overall.
          </Typography>

          <Typography variant="h6" sx={styles.subheading}>
            The Bigger Picture: A Safer, Stronger Aviation Sector
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            The DGCA’s ranking system fosters transparency and rewards
            excellence. It guides students toward better institutions and helps
            build a stronger pipeline of job-ready pilots. With aviation safety
            under scrutiny, this reform supports the industry’s long-term
            health.
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Aspiring pilots can now make smarter choices, choosing schools that
            align with their ambitions and safety expectations. As the aviation
            industry soars, so too does the need for responsible, high-quality
            training. The DGCA’s initiative is a step in that direction.
          </Typography>
        </Container>
      </Box>

      {/* From the Blog */}
      <Box sx={{ backgroundColor: "#F9F9F9", py: 8 }}>
        <Container>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, mb: 4, textAlign: "center" }}
          >
            From the Blog
          </Typography>
          <Grid container spacing={4}>
            {cardData.map((item, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={i}>
                <Card
                  sx={{
                    borderRadius: "20px",
                    maxWidth: 320,
                    width: "100%",
                    overflow: "hidden",
                    margin: "0 auto",
                    cursor: "pointer",
                  }}
                  onClick={item.onClick}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={item.image}
                    alt={`Blog ${i}`}
                  />
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, fontSize: "16px", mb: 1 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default BlogSection1;
