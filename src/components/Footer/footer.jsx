import { Link } from 'react-router-dom';
import "./footer.css";
import CopyrightFooter from '../../Helper/copyrighttext';
import FacebookIcon from "../../assests/images/FaceBookIcon.svg";
import TwitterIcon from "../../assests/images/TwitterIcon.svg";
import instagramIcon from "../../assests/images/InstagramIcon.svg";
import TelegramIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { platformLinks } from './UrlLinksColor';


function FooterSection() {
  console.log(platformLinks, "UrlColor");
  const location = useLocation();
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
      <Box sx={{ maxWidth: "xl", mx: 'auto' }}>
        <Grid container spacing={2} alignItems="flex-start" justifyContent="center" textAlign="left">
          <Grid size={{ xs: 12, sm: 12, md: 4 }} sx={{ display: "grid", justifyContent: "center", m:"auto" }}>
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
              <img src="/src/assests/images/logo_tagline_White.svg" alt="plane" style={{ height: 100 }} />
            </Box>
            {/* <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
              RUNWAY TO SKY
            </Typography> */}

          </Grid>

          {/* <Grid size={{ xs: 12, sm: 12, md: 3, xl: 3, lg: 3 }} className="footer-platforms">
            <Typography variant="h6" sx={{ color: '#EAB308', mb: 2 }}>
              Resources
            </Typography>
            <Typography variant="body1">Press</Typography>
            <Typography variant="body1">FAQ</Typography>
          </Grid> */}

          <Grid size={{ xs: 12, sm: 12, md: 4, }} sx={{ display: "grid", justifyContent: "center" }} className="footer-platforms" >
           
            <Typography variant="h6" sx={{ color: '#EAB308', mb: 2 }}>
              Platforms
            </Typography>
            {platformLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Typography key={link.path} variant="body1">
                  <Link
                    to={link.path}
                    style={{
                      textDecoration: 'none',
                      color: isActive ? '#EAB308' : 'white',
                    }}
                  >
                    {link.label}
                  </Link>
                </Typography>
              );
            })}
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 4, }} sx={{ display: "grid", justifyContent: "center" }} className="footer-platforms">
            {/* <Grid container spacing={0} > */}
            <Typography variant="h6" sx={{ color: '#EAB308', mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body1">
              <EmailIcon /> support@thecockpit.in
              {/* <Link href="mailto:support@thecockpit.in" underline="none" color="inherit" sx={{ ml: 1, underline: "none" }}>support@thecockpit.com</Link> */}
            </Typography>

            <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "left" }}>
              <IconButton component="a" href="https://www.facebook.com/profile.php?id=61577631697630" target="_blank" rel="noopener" sx={{ color: "#FFFFFF", padding: 0 }}>
                <img src={FacebookIcon} alt="Facebook" style={{ width: "20px", height: "20px" }} />
              </IconButton>
              <IconButton component="a" href="https://x.com/cockpitaviation?t=GcxKo1eO1uc-JbocOFrCOQ&s=09" target="_blank" rel="noopener" sx={{ color: "#FFFFFF" }}>
                <img src={TwitterIcon} alt="Facebook" style={{ width: "20px", height: "20px" }} />
              </IconButton>
              <IconButton component="a" href="https://www.instagram.com/thecockpit_official?igsh=dHdqMW13M2lnOGoy" target="_blank" rel="noopener" sx={{ color: "#FFFFFF" }}>
                <img src={instagramIcon} alt="Facebook" style={{ width: "20px", height: "20px" }} />
              </IconButton>
              <IconButton component="a" href="https://t.me/thecockpit_official" target="_blank" rel="noopener" sx={{ color: "#FFFFFF" }}>
                <TelegramIcon />
              </IconButton>
            </Grid>
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