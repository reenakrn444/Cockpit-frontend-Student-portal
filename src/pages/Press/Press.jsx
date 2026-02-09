const PressPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = {
    root: {
      p: { xs: 2, md: 4 },
      backgroundColor: theme.palette.background.default,
    },
    mainHeading: {
      variant: "h4",
      align: "center",
      color: theme.header.primary.main,
      fontWeight: "bold",
      gutterBottom: true,
      fontFamily: "Jost",
      fontSize: { xs: "24px", sm: "30px", md: "36px" },
    },
    subHeading: {
      fontFamily: "Jost",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: { xs: "14px", sm: "16px", md: "18px" },
      lineHeight: "160%",
      letterSpacing: "2%",
      textAlign: "center",
      color: "#000000CC",
      mt: 1,
    },
    pressHeading: {
      fontFamily: "Jost",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: { xs: "20px", sm: "24px", md: "30px" },
      letterSpacing: "2%",
    },
    bodyText: {
      fontFamily: "Jost",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: { xs: "14px", sm: "16px", md: "18px" },
      letterSpacing: "2%",
      marginBottom: 2,
    },
    subtitleText: {
      fontFamily: "Jost",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: { xs: "16px", sm: "18px", md: "20px" },
      lineHeight: "130%",
      letterSpacing: "2%",
    },
    notificationText: {
      fontFamily: "Jost",
      fontWeight: 500,
      fontStyle: "normal",
      fontSize: { xs: "14px", sm: "16px", md: "18px" },
      lineHeight: "130%",
      letterSpacing: "2%",
    },
    largeCard: {
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      alignItems: { sm: "center" },
      p: 1,
      borderRadius: 3,
      backgroundColor: theme.card.bgcolor,
      cursor: "pointer",
    },
    largeCardImage: {
      width: { xs: "100%", sm: "334px" },
      height: { xs: 180, sm: "297px" },
      borderRadius: 3,
      objectFit: "cover",
      flexShrink: 0,
      backgroundColor: "white",
    },
    largeCardText: {
      pl: { sm: 3 },
      pt: { xs: 2, sm: 0 },
      backgroundColor: "fff",
    },
    smallCardMedia: {
      height: 140,
    },
    shortcutCard: {
      display: "flex",
      alignItems: "center",
      borderRadius: "12px",
      backgroundColor :theme.card.bgcolor,
      boxShadow: "none",
      p: 1.5,
      mb: 2,
      cursor: "pointer"
    },
    shortcutImage: {
      width: 64,
      height: 64,
      borderRadius: "12px",
      border: "1px solid #DDDDE033",
    },
    featuredVideoBox: {
      position: "relative",
    },
    videoCard: {
      borderRadius: "20px",
      overflow: "hidden",
    },
    videoWrapper: {
      position: "relative",
      paddingTop: "56.25%", // 16:9 Aspect Ratio
      backgroundColor: "#000",
    },
    thumbnail: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden",
    },
    thumbnailImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "20px",
    },
    iframe: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "none",
      borderRadius: "20px",
    },
    playButton: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      borderRadius: "50%",
      width: 60,
      height: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
      cursor: "pointer",
    },
    playIcon: {
      fontSize: 30,
      color: "#000",
    },
    footerBox: {
      mt: 10,
      px: { xs: 2, md: 6 },
      py: 6,
    backgroundColor :theme.card.bgcolor,
      borderRadius: "33px",
      border: "1px solid #E0E0E0",
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
    },
    footerHeading: {
      fontFamily: "Jost",
      fontWeight: 700,
      fontStyle: "normal",
      fontSize: { xs: "24px", sm: "32px", md: "40px" },
      lineHeight: "120%",
      letterSpacing: "0%",
      color: "#EAB308",
    },
    footerSubtext: {
      fontFamily: "Jost",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: { xs: "14px", sm: "16px", md: "18px" },
      lineHeight: "150%",
      letterSpacing: "0%",
      color: "text.secondary",
      mt: 1,
    },
    emailSection: {
      display: "flex",
      gap: 1,
      width: "100%",
      maxWidth: 400,
    },
    emailInput: {
      backgroundColor: "#fff",
    },
    signUpBtn: {
      fontFamily: "Jost",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: { xs: "14px", sm: "15px", md: "16px" },
      lineHeight: "150%",
      letterSpacing: "0%",
      backgroundColor: "#E4B200",
      color: "#fff",
      px: 3,
      whiteSpace: "nowrap",
      textTransform: "none",
    },
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const cardData = [
    {
      image: "/images/doctor.png",
      text: "DGCA’s Medical Test Mandate at IAF Centres: Pros and Cons for Pilots",
      date: "July 04 , 2025",
      onClick: () => navigate("/blog2"),
    },

  ];

  const runwayKnowledge = [
    {
      image: "/images/newaeroplane.png",
      text: "Code 7500: How Hijacking Protocols Changed Aviation Forever",
      date: "July 11, 2025",
      onClick: () => navigate("/blog3"),
    },
    {
      image: "/images/aeroplaneparts.png",
      text: "Storm Spotters in the Sky: How Airborne Weather Radar Keeps Flights Safe",
      date: "July 11, 2025",
      onClick: () => navigate("/blog4"),
    }
  ]


  const handleBlog1 = () => {
    navigate("/blog1");
  };

  return (
    <Box sx={styles.root}>
      {/* Heading */}
      <Typography {...styles.mainHeading}>PRESS</Typography>
      {/* <Typography {...styles.subHeading}>
        Ut condimentum volutpat, eget mauris senectus.
      </Typography> */}

      <Grid container spacing={4} mt={2}>
        {/* Left Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Card sx={styles.largeCard} onClick={() => handleBlog1()}>
                <Box
                  component="img"
                  src="/images/aeroplane.png"
                  alt="Feature"
                  sx={styles.largeCardImage}
                />
                <Box sx={styles.largeCardText}>
                  <Typography sx={styles.pressHeading} gutterBottom>
                    DGCA’s New FTO Ranking System: What Aspiring Pilots Need to
                    Know
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={styles.bodyText}
                  >
                    India’s aviation sector is booming, with airlines like
                    IndiGo and Air India expanding fleets and routes. But recent
                    incidents, including crashes involving trainer aircraft,
                    have exposed gaps in the quality of some FTOs...
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    July 11, 2025
                  </Typography>
                </Box>
              </Card>
            </Grid>

            {cardData.map((item, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <Card sx={{ borderRadius: "20px", cursor: "pointer" , backgroundColor :theme.card.bgcolor}} onClick={item.onClick} >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={`Plane ${i}`}
                    sx={styles.smallCardMedia}
                  />
                  <CardContent>
                    <Typography sx={styles.subtitleText}>
                      {item.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Shortcut Links
          </Typography>
          {runwayKnowledge.map((data, i) => (
            <Card key={i} sx={styles.shortcutCard} onClick={data.onClick}>
              <CardMedia
                component="img"
                image={data.image}
                alt={`Shortcut ${i}`}
                sx={styles.shortcutImage}
              />
              <Box sx={{ pl: 2 }}>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={styles.notificationText}
                >
                  {data.text}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {data.date}
                </Typography>
              </Box>
            </Card>
          ))}

          {/* <Typography variant="subtitle1" fontWeight="bold" gutterBottom mt={4}>
            Featured Video
          </Typography>
          <Card sx={{ borderRadius: "20px" }}>
            <Box sx={styles.featuredVideoBox}>
              <Card sx={styles.videoCard}>
                <Box sx={styles.videoWrapper}>
                  {!isPlaying ? (
                    <>
                      <Box sx={styles.thumbnail}>
                        <img
                          src="https://img.youtube.com/vi/iDnGD_diZVM/hqdefault.jpg"
                          alt="Thumbnail"
                          style={styles.thumbnailImg}
                        />
                      </Box>
                      <Box sx={styles.playButton} onClick={handlePlayClick}>
                        <PlayArrowIcon sx={styles.playIcon} />
                      </Box>
                    </>
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/iDnGD_diZVM?autoplay=1&mute=0"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      style={styles.iframe}
                    ></iframe>
                  )}
                </Box>
              </Card>
            </Box>
          </Card> */}
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={styles.footerBox}>
        <Box maxWidth={500}>
          <Typography sx={styles.footerHeading}>
            Stay in the Cockpit loop
          </Typography>
          <Typography sx={styles.footerSubtext}>
            Keep up to date with new products, all the goss, and anything else
            you might have missed on twitter.
          </Typography>
        </Box>

        {/* <Box sx={styles.emailSection}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter your email"
            sx={styles.emailInput}
          />
          <Button variant="contained" sx={styles.signUpBtn}>
            Sign Up
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default PressPage;
