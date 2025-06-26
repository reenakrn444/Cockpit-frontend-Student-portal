// const ComingSoon = () => {
//   return (
//     <Box
//       sx={{
//         height: '100vh',
//         width: '100vw',
//         bgcolor: '#f5f5f5',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Typography
//         variant="h3"
//         sx={{
//           fontWeight: 700,
//           color: '#EAB308',
//           textAlign: 'center',
//         }}
//       >
//         Coming Soon...
//       </Typography>
//     </Box>
//   );
// };

// export default ComingSoon;

// ✅ Import your two images here
import ComingTextImage from '../../assests/images/ComingNextText.svg';
import AirplaneImage from '../../assests/images/AiroplaneComingNext.svg';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        // minHeight: '100vh',
        bgcolor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        px: 2,
        py: { xs: 8, sm: 10 },
        textAlign: 'center',
      }}
    >
      {/* Image Row */}
      <Stack
        direction={{ xs: 'column', sm: "row", md: 'row' }}
        spacing={0}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: { xs: 5, sm: 10 } }}
      >
        <Box
          component="img"
          src={ComingTextImage}
          alt="Coming Soon"
          sx={{
            width: { xs: '80%', md: "210px", },
            height: "111px",
            maxWidth: 300,
            mb: "20px"
          }}
        />
        <Box
          component="img"
          src={AirplaneImage}
          alt="Airplane Maintenance"
          sx={{
            width: { xs: '100%', md: "570px" },
            heigt: "278px",
            maxWidth: 500,
            ml: "-30px"
          }}
        />
      </Stack>

      {/* Text and Button Row */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 500,
            color: "#222529"
          }}
        >
          Stay Connected, Click Here To Go To Home Page.
        </Typography>

        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            backgroundColor: '#EAB308',
            color: '#ffffff',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '16px',
            px: 4,
            py: 1,
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#cf9f06',
            },
          }}
        >
          Home Page
        </Button>
      </Stack>
    </Box>
  );
};

export default ComingSoon;
