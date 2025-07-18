const styles = {
  wrapper: {
    backgroundColor: "#fff",
    py: 8,
    mt: { xs: 2, sm: 8 },
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
};

const BlogSection2 = () => {
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
            image="/images/doctor.png"
            alt="Main Blog"
          />
        </Card>
      </Container>

      {/* Blog Content */}
      <Box sx={styles.wrapper}>
        <Container maxWidth="md">
           <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, fontSize: "42px" }}>
              DGCA’s Medical Test Mandate at IAF Centres: Pros and Cons for
              Pilots
            </Typography>
            <Typography variant="h8" sx={{ fontWeight: 300, mb: 1 }}>
              The Directorate General of Civil Aviation (DGCA) in India mandated
              that all medical examinations for commercial pilots—both initial
              Class 1 and renewal Class 2 assessments—be conducted exclusively
              at Indian Air Force (IAF) Boarding Centres. This policy shift,
              driven by concerns over falsified medical records and a
              high-profile incident involving a co-pilot’s fatal cardiac arrest,
              marks a significant departure from the previous system, which
              allowed tests at private hospitals and DGCA-empanelled medical
              examiners. As India’s aviation sector, the third-largest domestic
              market globally, continues to grow, this change has sparked
              intense debate among pilots, airlines, and industry stakeholders.
            </Typography>

          <Typography variant="h5" sx={styles.title}>
            Background: The Push for Change
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            The DGCA’s decision was prompted by a series of incidents, notably a
            co-pilot’s cardiac arrest after a flight in 2024, which revealed
            undetected health issues. Investigations uncovered instances of
            falsified medical records at private facilities, raising concerns
            about the integrity of pilot medical assessments. The DGCA, aiming
            to align with stringent safety standards, turned to IAF Boarding
            Centres—renowned for their expertise in aviation medicine and
            rigorous military protocols. These centres, including facilities in
            Delhi, Bengaluru, Jorhat, Mumbai, Chennai, and Kolkata, now handle
            all pilot medicals, replacing a decentralized system. While the
            intent is to enhance safety, the mandate has raised concerns about
            accessibility, stricter standards, and operational disruptions.
            Below, we dissect the advantages and challenges for pilots.
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Pros of the DGCA’s IAF Medical Test Mandate:</strong> IAF
            Boarding Centres are staffed by aviation medicine specialists
            trained to assess the unique physiological demands of flying. Their
            military-grade protocols minimize the risk of falsified records,
            ensuring that only medically fit pilots operate aircraft. This
            addresses the DGCA’s concerns about private facilities, where
            oversight was sometimes lax. For instance, IAF centres conduct
            comprehensive tests like treadmill stress tests (TMT), ECGs, and
            neurological evaluations, reducing the likelihood of undetected
            conditions like cardiovascular issues or epilepsy.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Standardized and Fair Evaluations</strong>Private hospitals
            and DGCA-approved examiners often varied in their interpretation of
            medical standards, leading to inconsistencies. IAF centres apply
            uniform military protocols, ensuring every pilot is assessed using
            the same criteria, regardless of location. This eliminates
            discrepancies and reduces the risk of arbitrary approvals or
            rejections.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Access to Specialized Expertise</strong> The IAF’s Institute
            of Aerospace Medicine (IAM) in Bengaluru is a global leader in
            aviation medicine, training specialists who understand the
            physiological stresses of flying, such as hypoxia, G-forces, and
            prolonged sitting. IAF centres are equipped with advanced tools like
            audiometry booths and vision testing equipment, enabling precise
            diagnoses of conditions that could affect flight safety.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Cost-Effective and Streamlined Process</strong> The DGCA’s
            eGCA portal enables online appointment booking, simplifying access
            to IAF centres. The cost of a Class 1 initial medical at an IAF
            centre is INR 3,000, significantly lower than the INR 6,000–8,000
            charged by private hospitals. Renewal medicals are also more
            affordable, making the process accessible for aspiring pilots and
            those on tight budgets.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Alignment with National Safety Goals</strong> By leveraging
            IAF infrastructure, the DGCA underscores aviation safety as a
            national priority. This move aligns civil aviation with military
            standards, potentially enhancing India’s reputation in the global
            aviation community, where safety records influence airline rankings
            and international partnerships.
          </Typography>

          <Typography variant="h6" sx={styles.subheading}>
            Cons of the DGCA’s IAF Medical Test Mandate
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            <strong> Overly Stringent Military Standards:</strong> IAF centres
            apply medical standards designed for fighter pilots, who face
            extreme conditions like high G-forces and rapid altitude changes.
            These standards are stricter than the International Civil Aviation
            Organization (ICAO) norms for commercial pilots, who operate less
            physically demanding aircraft. For example, minor issues like a
            slight astigmatism or borderline blood pressure, acceptable under
            ICAO guidelines, may lead to temporary or permanent grounding at IAF
            centres.
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            <strong> Limited Accessibility and Capacity Constraints:</strong>
            India has only six IAF Boarding Centres, primarily designed for
            military personnel. The influx of thousands of commercial pilots
            (India has over 10,000 active pilots) could overwhelm these
            facilities, leading to long wait times for appointments and results.
            Pilots must also take a mandatory three-day off-duty period for
            medicals, and those in remote areas face travel costs and logistical
            challenges to reach centres.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Risk of Pilot Shortages</strong> Airlines warn that stricter
            IAF standards could deem a significant number of pilots unfit,
            exacerbating India’s pilot shortage. With the country projected to
            need 30,000 pilots by 2030 to support its growing fleet (over 1,200
            aircraft in 2025), even a small percentage of disqualifications
            could disrupt operations, delay flights, and increase ticket prices.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Additional Costs for Secondary Tests</strong> IAF centres
            may require follow-up tests, such as ultrasounds or specialist
            consultations, at NABH/NABL/ISO-accredited labs. These tests, which
            must include QR-coded reports for verification, can cost INR
            5,000–10,000 each, and pilots may need to visit multiple facilities
            if tests aren’t available on-site.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong>Deviation from Global Practices</strong> India is reportedly
            the only country mandating commercial pilot medicals at military
            facilities. Most nations, including the FAA (United States) and EASA
            (European Union), rely on civilian examiners following ICAO
            standards tailored to commercial aviation. This divergence may
            disadvantage Indian pilots in the global job market.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            <strong> Infrastructure Gaps</strong> IAF centres lack the capacity
            to handle the volume of commercial pilot medicals, and their primary
            mandate is military personnel. Scaling infrastructure to meet civil
            aviation needs requires significant investment, which the DGCA and
            IAF have yet to address fully.
          </Typography>

          <Typography variant="h6" sx={styles.subheading}>
            The Pilot’s Perspective: Balancing Safety and Challenges
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            The DGCA’s mandate offers clear benefits: enhanced safety,
            standardized assessments, and access to expert facilities at lower
            costs. However, the challenges—stricter standards, limited
            accessibility, and potential shortages—create significant hurdles.
            Pilots worry about career disruptions, financial burdens, and
            logistical issues, particularly those in smaller cities. The
            Federation of Indian Pilots and the Airline Pilots’ Association of
            India have called for reforms, advocating for ICAO-aligned standards
            and a dedicated civil aviation medical institute to reduce reliance
            on IAF facilities. Industry experts, like Captain Shakti Lumba,
            argue that while safety is critical, commercial aviation requires
            tailored standards distinct from military protocols.
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

export default BlogSection2;
