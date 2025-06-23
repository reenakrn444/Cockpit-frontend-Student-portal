import { Link } from 'react-router-dom';
import "./footer.css";
import CopyrightFooter from '../../Helper/copyrighttext';


function FooterSection() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#112b4b',
        color: 'white',
        py: 2,
        px: 2,
        // position: 'fixed',
        // bottom: 0,
        // left: 0,
        // width: '100%',
        // zIndex: 9999,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }} textAlign={{ xs: 'center', md: 'left' }}>
          <Grid size={{ xs: 12, sm: 12, md: 4 }} item>
            <Box component={Link}
              to="/" sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 2 }}>
              <img src="images/logo.png" alt="plane" style={{ height: 65 }} />
            </Box>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
              RUNWAY TO SKY
            </Typography>
          </Grid>

          {/* <Grid size={{ xs: 12, sm: 12, md: 3, xl: 3, lg: 3 }} className="footer-platforms">
            <Typography variant="h6" sx={{ color: '#ffc107', mb: 2 }}>
              Resources
            </Typography>
            <Typography variant="body1">Press</Typography>
            <Typography variant="body1">FAQ</Typography>
          </Grid> */}

          <Grid size={{ xs: 12, sm: 12, md: 4 }} className="footer-platforms">
            <Typography variant="h6" sx={{ color: '#ffc107', mb: 2 }}>
              Platforms
            </Typography>
            <Typography variant="body1">
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                Home
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link to="/training" style={{ textDecoration: 'none', color: 'white' }}>
                Training
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link to="/taketest" style={{ textDecoration: 'none', color: 'white' }}>
                Test
              </Link>
            </Typography>
            <Typography variant="body1"> <Link to="/syllabus" style={{ textDecoration: 'none', color: 'white' }}>
              Syllabus
            </Link></Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 4 }} className="footer-platforms">
            <Typography variant="h6" sx={{ color: '#ffc107', mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body1">Tel: + (91) 0000000000</Typography>
            <Typography variant="body1">Mail: support@gmail.com</Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.5)', my: 3 }} />
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          <CopyrightFooter />
        </Typography>
      </Box>
    </Box>
  );
}

export default FooterSection;