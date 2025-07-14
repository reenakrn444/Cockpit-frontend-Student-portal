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

const BlogSection4 = () => {
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
            image="/images/aeroplaneparts.png"
            alt="Airborne Weather Radar"
          />
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Storm Spotters in the Sky: How Airborne Weather Radar Keeps
              Flights Safe
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 1, display: "block" }}
            >
              By CockpitNews | July 11, 2025
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 300, mb: 1 }}>
              Airborne weather radar is a critical tool mounted in an aircraft’s
              nose, designed to detect storms and turbulence. Using radio waves
              in the super high-frequency range, it helps pilots navigate safely
              around hazardous weather, ensuring smoother and safer flights.
              From detecting precipitation to predicting wind shear, modern
              pulse-Doppler systems provide pilots with real-time data to make
              informed decisions in the skies.
            </Typography>
          </CardContent>
        </Card>
      </Container>

      {/* Blog Content */}
      <Box sx={styles.wrapper}>
        <Container maxWidth="md">
          <Typography variant="h5" sx={styles.title}>
            How Airborne Weather Radar Works
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Airborne weather radar is a specialized instrument housed in an
            aircraft’s nose, protected by a radome that allows radio waves to
            pass through. Unlike ground-based radars, these systems move with
            the aircraft, leveraging the ram air effect—high-pressure airflow
            from the plane’s speed—to enhance signal transmission. Operating in
            the super high-frequency (SHF) range (5–9 GHz), the radar sends out
            radio waves that reflect off precipitation like rain, hail, or snow,
            displaying results on cockpit screens.
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Radio Wave Transmission:</strong> A directional antenna
            emits short pulses (about 1 microsecond) of radio waves, typically
            at frequencies like 5.44 GHz or 9.375 GHz, designed to reflect off
            water droplets or ice particles.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Signal Return and Display:</strong> The antenna captures
            returning signals, with stronger returns (heavy precipitation) shown
            as red, medium as yellow, and light as green on cockpit displays.
            Magenta indicates extreme conditions or turbulence.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Doppler Effect:</strong> Modern pulse-Doppler radars detect
            droplet movement, revealing turbulence or wind shear, such as in
            cumulonimbus clouds with strong updrafts.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Antenna Stabilization:</strong> Linked to a vertical
            gyroscope, the antenna adjusts for the aircraft’s pitch and roll,
            ensuring accurate scans. Pilots can tilt the beam (e.g., -15° to
            +4°) to avoid ground clutter or scan storm tops.
          </Typography>

          <Typography variant="h6" sx={styles.subheading}>
            Pilots and Radar: Navigating the Storm
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Pilots use airborne weather radar to make real-time decisions,
            balancing safety and efficiency. The radar’s data helps them avoid
            hazards and optimize flight paths.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Hazard Avoidance:</strong> Red or magenta returns indicate
            heavy precipitation or turbulence, prompting pilots to reroute
            around thunderstorms, hail, or icing conditions to prevent
            structural damage.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Turbulence Detection:</strong> Doppler radars identify
            turbulent areas by analyzing droplet motion, allowing pilots to
            adjust altitude or course for passenger comfort and aircraft safety.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Route Optimization:</strong> Integrated with flight
            management systems, radar data helps pilots select fuel-efficient
            paths. Systems like Honeywell’s RDR-7000 offer a 320-nautical-mile
            range and automated tilt adjustments.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Tilt Management:</strong> Pilots use techniques like “cruise
            ground park” to distinguish storms from terrain, tilting the beam
            downward until ground returns appear at the display’s edge.
          </Typography>

          <Typography variant="h6" sx={styles.subheading}>
            Evolution and Challenges
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Since the 1950s, airborne weather radar has evolved from basic
            reflectivity systems to advanced tools like Honeywell’s IntuVue
            RDR-7000, offering 3D imaging and lightning detection. However,
            challenges persist:
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Dry Hail and Ice:</strong> Dry hail or ice crystals reflect
            poorly, potentially underestimating storm severity at high
            altitudes.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Radome Issues:</strong> Ice buildup or radome damage can
            block signals, requiring regular maintenance to ensure reliability.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Non-Weather Returns:</strong> Insects, birds, or chaff can
            mimic precipitation, necessitating cross-checks with lightning
            detectors or other data.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Training Gaps:</strong> Many pilots learn radar use on the
            job, leading to errors in tilt or range calibration. Proper training
            is critical.
          </Typography>

          <Typography variant="h6" sx={styles.subheading}>
            Real-World Impact: Saving Lives
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Airborne weather radar has proven its value. In 2018, Southwest
            Flight 1380 used radar to avoid a severe storm, allowing focus on an
            engine failure emergency. During Hurricane Carla in 1961, early
            airborne radar helped pilots steer clear of the storm’s core. These
            systems reduce delays, save fuel, and ensure smoother, safer
            flights.
          </Typography>

          <Typography variant="h6" sx={styles.subheading}>
            Why Airborne Weather Radar Matters
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            By turning unpredictable skies into a manageable challenge, airborne
            weather radar empowers pilots with critical data. Leveraging ram air
            and advanced technology, it enhances safety and efficiency. As AI
            and satellite integration advance, the future of weather radar
            promises even safer skies.
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

export default BlogSection4;
