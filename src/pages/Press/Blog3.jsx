const styles = {
  wrapper: {
    backgroundColor: "#fff",
    py: 8,
  },
  title: {
    fontWeight: 700,
    mb: 4,
    mt: 5,
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
  smallCardMedia: {
    height: 180,
    objectFit: "cover",
  },
  subtitleText: {
    fontWeight: 500,
    fontSize: "16px",
    mb: 1,
  },
};



const BlogSection3 = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
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


  const responsiveText = isXs ? "body2" : "body1";

  return (
    <Box sx={styles.wrapper}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: "20px", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="360"
            image="/images/newaeroplane.png"
            alt="Main Blog"
          />
        </Card>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 , mt: 5, fontSize: "42px"}}>
              Code 7500: How Hijacking Protocols Changed Aviation Forever
            </Typography>
            <Typography variant="h8" sx={{ fontWeight: 300, mb: 1 }}>
              On a clear day at 35,000 feet, the cockpit is a sanctuary of
              precision and control—until a chilling message from the cabin crew
              crackles through the interphone: "We have a situation. Possible
              hijacker." The pilot’s hand moves swiftly to the transponder,
              dialing in 7500, the universal code for unlawful interference.
              Within seconds, air traffic control (ATC) sees a "HIJK" flash on
              their radar, and the world below springs into action. This is the
              story of Code 7500, the silent alarm that transformed aviation
              security.
            </Typography>
        <Typography variant="h6" sx={styles.subheading}>
          The Birth of Code 7500
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          The transponder code 7500 is part of aviation’s standardized
          communication system, designed to alert ATC to a hijacking without
          tipping off the perpetrators. When a pilot sets the transponder to
          7500, it sends a unique signal that appears as a "sunburst" or "HIJK"
          on radar screens, instantly prioritizing the aircraft for ATC and
          triggering a coordinated response. But this code wasn’t always the
          linchpin of hijack response—it took the seismic events of September
          11, 2001, to redefine its role and reshape aviation forever.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          Before 9/11, hijackings were often treated as negotiable crises.
          Pilots followed a "total compliance" strategy, cooperating with
          hijackers to land safely and resolve the situation through ground
          negotiations. Cases like the 1971 D.B. Cooper hijacking, where a lone
          hijacker parachuted from a Boeing 727 with $200,000, exemplified this
          era—pilots complied, passengers survived, and the plane landed. But
          9/11, where hijacked planes were used as weapons, shattered this
          approach. The loss of 2,977 lives exposed the vulnerability of
          cockpits and the catastrophic potential of suicide hijackings.
        </Typography>

        <Typography variant="h6" sx={styles.subheading}>
          Post-9/11: A New Era of Protocols
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          The 9/11 attacks forced a complete overhaul of hijacking protocols,
          with Code 7500 at the heart of the response. Here’s how pilots are
          trained to handle a hijack today, blending urgency with precision:
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          <strong>Squawk 7500 Immediately:</strong> As soon as a hijack threat
          is confirmed—whether through a cabin crew alert or suspicious
          activity—pilots set the transponder to 7500. This discreet signal
          avoids alerting hijackers, who may be monitoring communications.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          <strong>Declare Mayday (If Safe):</strong> In some cases, pilots may
          declare "Mayday" over the radio to explicitly signal distress,
          especially if the hijacker is unaware of cockpit communications.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          <strong>Lock the Cockpit Door:</strong> Post-9/11, reinforced cockpit
          doors became mandatory. Pilots are trained to keep the door locked at
          all times, using surveillance cameras to monitor cabin activity.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          <strong>Adjust Altitude and Speed:</strong> If a hijack is confirmed,
          ATC may instruct pilots to cruise at a lower altitude (typically
          10,000–25,000 feet) and reduce speed (under 400 knots) to make the
          aircraft easier to track and intercept.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          <strong>Divert to the Nearest Airport:</strong> Pilots prioritize
          landing at the closest suitable airport, where security forces can
          intervene.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          <strong>Ground Protocols—Evacuate If Safe:</strong> If the aircraft is
          on the ground when a hijack occurs, pilots may initiate an evacuation.
          Standard procedure involves shutting down engines, deploying slides,
          and directing passengers to exit via emergency routes.
        </Typography>

        <Typography variant="h6" sx={styles.subheading}>
          The Ground Response: A Coordinated Effort
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          Once Code 7500 is activated, the response on the ground is immediate.
          ATC clears airspace around the aircraft, notifies military
          authorities, and prepares a designated airport for landing.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          In the U.S., NORAD may scramble fighter jets to intercept the plane,
          guiding it to a secure location or, in extreme cases, preparing for a
          shoot-down order if the aircraft threatens strategic targets.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          The 2016 Indian Anti-Hijacking Act empowers the Indian Air Force to
          shoot down a hijacked plane as a last resort—a policy echoed globally
          post-9/11.
        </Typography>

        <Typography variant="h6" sx={styles.subheading}>
          Real-World Impact: Lessons from History
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          The evolution of hijacking protocols is written in the stories of past
          incidents. The 1999 Indian Airlines Flight IC-814 hijacking, where 155
          passengers were held hostage for eight days, exposed the need for
          faster response times and stricter cockpit security.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          Today, pilots are trained under the FAA and ICAO’s “Crew Training
          Common Strategy,” which emphasizes case-by-case evaluation over blind
          compliance.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          <strong>Why Code 7500 Matters:</strong> Code 7500 is more than a
          number—it’s a lifeline that connects pilots, ATC, and security forces
          in a race against time. It represents the aviation industry’s
          commitment to never again let a hijacked plane become a weapon.
        </Typography>

        <Typography variant={responsiveText} color="text.secondary" paragraph>
          As one veteran pilot put it, “When you squawk 7500, you’re not just
          signaling a problem—you’re handing the reins to a global system built
          to protect lives.”
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
  );
};

export default BlogSection3;
