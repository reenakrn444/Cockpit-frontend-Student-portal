import { Link } from 'react-router-dom';
import "./footer.css";
import CopyrightFooter from '../../Helper/copyrighttext';
import FacebookIcon from "../../assests/images/FaceBookIcon.svg";
import TwitterIcon from "../../assests/images/TwitterIcon.svg";
import instagramIcon from "../../assests/images/InstagramIcon.svg";
import TelegramIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { platformLinks, ResourcesLink } from './UrlLinksColor';


function FooterSection() {
  console.log(platformLinks, "UrlColor");
  const location = useLocation();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#183251',
        color: 'white',
        py: 4,
        px: 4,
      }}
    >
      <Box sx={{ maxWidth: "xl", mx: 'auto' }}>
        <Grid container spacing={2} alignItems={{ xs: "center", sm: "flex-start" }} justifyContent="center" textAlign="left">
          <Grid size={{ xs: 12, sm: 3, md: 3 }} sx={{ display: "grid", justifyContent: "center", m: "auto", textAlign: { xs: "center", sm: "left", md: 'left' }, }}>
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
              <img src="/src/assests/images/logo_tagline_White.svg" alt="plane" style={{ height: 150, width: 200 }} />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 3, md: 3, }}
            sx={{
              display: 'grid',
              justifyContent: { xs: 'center', sm: "right", md: 'center' },
              textAlign: { xs: "center", sm: "left", md: 'left' },
            }}
            className="footer-platforms" >
            <Typography variant="h6" sx={{ color: '#EAB308', mb: 2 }}>
              Resources
            </Typography>
            {ResourcesLink.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Typography key={link.path} variant="body1">
                  <Link
                    to={link.path}
                    style={{
                      textDecoration: 'none',
                      color: isActive ? '#EAB308' : 'white',
                      textAlign: "center"
                    }}
                  >
                    {link.label}
                  </Link>
                </Typography>
              );
            })}
          </Grid>

          <Grid size={{ xs: 12, sm: 3, md: 3, }} sx={{ display: "grid", justifyContent: "center", textAlign: { xs: "center", sm: "left", md: 'left' }, }} className="footer-platforms" >

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

          <Grid size={{ xs: 12, sm: 3, md: 3, }} sx={{ display: "grid", justifyContent: "center", textAlign: { xs: "center", sm: "left", md: 'left' }, }} className="footer-platforms">
            {/* <Grid container spacing={0} > */}
            <Typography variant="h6" sx={{ color: '#EAB308', mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body1">
              <EmailIcon /> support@thecockpit.in
              {/* <Link href="mailto:support@thecockpit.in" underline="none" color="inherit" sx={{ ml: 1, underline: "none" }}>support@thecockpit.com</Link> */}
            </Typography>

            <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: { xs: "center", sm: "left", md: 'left' }, textAlign: { xs: "center", sm: "left", md: 'left' }, }}>
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


// import { Link } from 'react-router-dom';
// import CopyrightFooter from '../../Helper/copyrighttext';
// import FacebookIcon from '../../assests/images/FaceBookIcon.svg';
// import TwitterIcon from '../../assests/images/TwitterIcon.svg';
// import instagramIcon from '../../assests/images/InstagramIcon.svg';
// import TelegramIcon from '@mui/icons-material/Send';
// import EmailIcon from '@mui/icons-material/Email';
// import { platformLinks, ResourcesLink } from './UrlLinksColor';

// function FooterSection() {
//   const location = useLocation();

//   return (
//     <Box
//       component="footer"
//       sx={{
//         backgroundColor: '#183251',
//         color: 'white',
//         py: 4,
//         px: 2,
//         fontFamily: 'Poppins, sans-serif',
//       }}
//     >
//       {/* Centering the whole grid on large screens */}
//       <Box sx={{ maxWidth: 'xl', mx: 'auto' }}>
//         <Grid
//           container
//           spacing={4}
//           justifyContent="center"
//         >
//           {/* Logo */}
//           <Grid
//             item
//             size={{ xs: 12, sm: 3, md: 3 }}
//             sx={{
//               display: 'flex',
//               justifyContent: { xs: 'center', md: 'center' },
//               textAlign: 'left',
//             }}
//           >
//             <Box component={Link} to="/" sx={{ display: 'flex' }}>
//               <img
//                 src="/src/assests/images/logo_tagline_White.svg"
//                 alt="Cockpit Logo"
//                 style={{ height: 100 }}
//               />
//             </Box>
//           </Grid>

//           {/* Resources */}
//           <Grid
//             item
//             size={{ xs: 12, sm: 3, md: 3 }}
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: { xs: 'center', md: 'flex-start' },
//               textAlign: 'left',
//               gap: 1,
//             }}
//           >
//             <Typography variant="h6" sx={{ color: '#EAB308' }}>
//               Resources
//             </Typography>
//             {ResourcesLink.map((link) => {
//               const isActive = location.pathname === link.path;
//               return (
//                 <Typography key={link.path} variant="body1">
//                   <Link
//                     to={link.path}
//                     style={{
//                       textDecoration: 'none',
//                       color: isActive ? '#EAB308' : 'white',
//                     }}
//                   >
//                     {link.label}
//                   </Link>
//                 </Typography>
//               );
//             })}
//           </Grid>

//           {/* Platforms */}
//           <Grid
//             item
//             size={{ xs: 12, sm: 3, md: 3 }}
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: { xs: 'center', md: 'flex-start' },
//               textAlign: 'left',
//               gap: 1,
//             }}
//           >
//             <Typography variant="h6" sx={{ color: '#EAB308' }}>
//               Platforms
//             </Typography>
//             {platformLinks.map((link) => {
//               const isActive = location.pathname === link.path;
//               return (
//                 <Typography key={link.path} variant="body1">
//                   <Link
//                     to={link.path}
//                     style={{
//                       textDecoration: 'none',
//                       color: isActive ? '#EAB308' : 'white',
//                     }}
//                   >
//                     {link.label}
//                   </Link>
//                 </Typography>
//               );
//             })}
//           </Grid>

//           {/* Contact */}
//           <Grid
//             item
//             size={{ xs: 12, sm: 3, md: 3 }}
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: { xs: 'center', md: 'flex-start' },
//               textAlign: 'left',
//               gap: 1,
//             }}
//           >
//             <Typography variant="h6" sx={{ color: '#EAB308' }}>
//               Contact Us
//             </Typography>
//             <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <EmailIcon sx={{ fontSize: 18 }} /> support@thecockpit.in
//             </Typography>
//             <Box
//               sx={{
//                 display: 'flex',
//                 gap: 2,
//                 mt: 1,
//                 justifyContent: { xs: 'center', md: 'flex-start' },
//               }}
//             >
//               <IconButton
//                 component="a"
//                 href="https://www.facebook.com/profile.php?id=61577631697630"
//                 target="_blank"
//                 rel="noopener"
//                 sx={{ color: '#FFFFFF', padding: 0 }}
//               >
//                 <img src={FacebookIcon} alt="Facebook" style={{ width: 20, height: 20 }} />
//               </IconButton>
//               <IconButton
//                 component="a"
//                 href="https://x.com/cockpitaviation?t=GcxKo1eO1uc-JbocOFrCOQ&s=09"
//                 target="_blank"
//                 rel="noopener"
//                 sx={{ color: '#FFFFFF', padding: 0 }}
//               >
//                 <img src={TwitterIcon} alt="Twitter" style={{ width: 20, height: 20 }} />
//               </IconButton>
//               <IconButton
//                 component="a"
//                 href="https://www.instagram.com/thecockpit_official?igsh=dHdqMW13M2lnOGoy"
//                 target="_blank"
//                 rel="noopener"
//                 sx={{ color: '#FFFFFF', padding: 0 }}
//               >
//                 <img src={instagramIcon} alt="Instagram" style={{ width: 20, height: 20 }} />
//               </IconButton>
//               <IconButton
//                 component="a"
//                 href="https://t.me/thecockpit_official"
//                 target="_blank"
//                 rel="noopener"
//                 sx={{ color: '#FFFFFF', padding: 0 }}
//               >
//                 <TelegramIcon />
//               </IconButton>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Bottom Divider */}
//         <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.5)', my: 3 }} />

//         {/* Copyright */}
//         <Typography variant="body2" align="center" sx={{ mt: 3 }}>
//           <CopyrightFooter />
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// export default FooterSection;

