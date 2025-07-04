import { Link } from "react-router-dom";
import { DayCalculation } from "../../Helper/DayCalculation/Daycalculation";


function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    userId: user?._id,
    profileImage: ""
  });

  const [subscriptionInfo, setSubscriptionInfo] = useState({
    subscription: "",
    daysLeft: 0,
    subscriptionStartDate: "",
    subscriptionEndDate: "",
  });

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };


  useEffect(() => {
    const updateUserFromStorage = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUserData({
          username: storedUser.username,
          email: storedUser.email,
          userId: storedUser._id,
          profileImage: storedUser.profileImage || "/default-profile.png",
        });
      }
    };

    // Initial call
    updateUserFromStorage();

    // Update on custom event
    window.addEventListener("userUpdated", updateUserFromStorage);
    return () => window.removeEventListener("userUpdated", updateUserFromStorage);
  }, []);

  const navItems = [
    { text: "Home", path: "/" },
    { text: "Training", path: "/training" },
    // { text: 'Test', path: '/test' },
    // { text: "Pricing", path: "/pricing" },
  ];

  const drawerContent = (
    <Box sx={{ width: 200, mt: 5 }} role="presentation">

      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path} onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          {user ? (
            <ListItemButton onClick={() => {
              navigate("/userprofile")
              setDrawerOpen(false);
            }}>
              <Avatar
                src={userData?.profileImage}
                sx={{ width: 56, height: 56, cursor: "pointer" }}
              />
              <ListItemText primary={userData?.username} />
            </ListItemButton>
          ) : (
            <ListItemButton component={Link} to="/login">
              <Button variant="outlined" component={Link}
                to="/login"
                // color="warning"
                sx={{
                  border: "2px solid #EAB308", // custom yellow
                  color: "#EAB308",
                  fontWeight: "500",
                  borderRadius: "8px",
                  py: 1.5,
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                }}>
                Get Boarding Pass
              </Button>

            </ListItemButton>


          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      component="header"
      sx={{
        py: 2,
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
        position: "sticky", // or "fixed" if you want it to stay even when scrolling past it
        top: 0,
        zIndex: 9999,
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ maxWidth: "xl", mx: "auto", px: 2 }}
      >
        {/* Logo */}
        <Grid >
          <Box component={Link}
            to="/" sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/src/assests/images/fulllogo.svg"
              alt="Plane"
              style={{ height: "60px" }}
            />
          </Box>
        </Grid>

        {/* Desktop Nav */}
        {!isMobile && (
          <>
            <Grid >
              <Box sx={{ display: "flex", gap: 4 }}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.text}
                      to={item.path}
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: isActive ? "92px" : "auto",
                        height: isActive ? "35px" : "auto",
                        gap: "10px",
                        borderRadius: isActive ? "8px" : "0px",
                        backgroundColor: isActive ? "#183251" : "transparent",
                        color: isActive ? "#FFFFFF" : "#183251",
                        fontFamily: "Be Vietnam Pro",
                        fontWeight: 400,
                        fontSize: "18px",
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {item.text}
                    </Link>
                  );
                })}
              </Box>
            </Grid>

            <Grid >
              {user ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/userprofile")
                  }}
                >
                  <Avatar
                    src={userData?.profileImage}
                    sx={{ width: 56, height: 56, cursor: "pointer" }}
                  />
                  <Typography>{userData.username}</Typography>
                </Box>
              ) : (
                <Button variant="outlined" component={Link}
                  to="/login"
                  sx={{
                    border: "2px solid #EAB308", // custom yellow
                    color: "#EAB308",
                    fontWeight: "500",
                    borderRadius: "8px",
                    py: 1.5,
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                  }}>
                  Get Boarding Pass
                </Button>
              )}
            </Grid>
          </>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <Grid>
            <IconButton onClick={toggleDrawer(!drawerOpen)}>
              {drawerOpen ? <CloseIcon /> : <MenuIcon /> }
            </IconButton>
          </Grid>
        )}
      </Grid>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export default Header;
