import { Link } from "react-router-dom";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: "Home", path: "/" },
    { text: "Training", path: "/training" },
    // { text: 'Test', path: '/test' },
    { text: "Pricing", path: "/pricing" },
  ];

  const drawerContent = (
    <Box sx={{ width: 200 }} role="presentation">
      
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          {user ? (
            <ListItemButton onClick={() => navigate("/userprofile")}>
              <Avatar sx={{ mr: 1 }} />
              <ListItemText primary={user.username} />
            </ListItemButton>
          ) : (
            <ListItemButton component={Link} to="/profile">
              <Button variant="outlined" color="warning" sx={{ width: "100%" }}>
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
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ maxWidth: "lg", mx: "auto", px: 2 }}
      >
        {/* Logo */}
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="./images/logo.svg"
              alt="Plane"
              style={{ height: "60px" }}
            />
          </Box>
        </Grid>

        {/* Desktop Nav */}
        {!isMobile && (
          <>
            <Grid item>
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

            <Grid item>
              {user ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/userprofile")}
                >
                  <Avatar />
                  <Typography>{user.username}</Typography>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  color="warning"
                  sx={{ px: 4, py: 1 }}
                  component={Link}
                  to="/profile"
                >
                  Get Boarding Pass
                </Button>
              )}
            </Grid>
          </>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <Grid item>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
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
