const ComingSoon = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: '#EAB308',
          textAlign: 'center',
        }}
      >
        Coming Soon...
      </Typography>
    </Box>
  );
};

export default ComingSoon;
