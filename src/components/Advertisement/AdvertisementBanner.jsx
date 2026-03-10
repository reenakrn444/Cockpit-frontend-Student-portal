import { apiGet } from "../../api/axios";
import { useLoader } from "../Loader/Loader";

export default function AdvertisementBanner() {
  const { showLoader, hideLoader } = useLoader();
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(true);
  const location = useLocation();
  const timerRef = useRef(null);

  // Pages where ad should NOT appear
  const restrictedRoutes = ["/", "/training", "/test", "/pricing"];

  // Fetch ads
  useEffect(() => {
    const fetchAds = async () => {
      showLoader();
      try {
        const { data } = await apiGet("/admin/getAllAdvertisement");
        const activeAds = data?.data?.filter(
          (ad) => ad.isactive && !ad.expired,
        );
        setAds(activeAds || []);
        hideLoader();
      } catch (err) {
        console.error("Error fetching ads:", err);
        hideLoader();
      }
    };
    fetchAds();
  }, []);

  // Auto-rotate ads based on timeLimit
  useEffect(() => {
    if (ads.length > 0) {
      const limit = (ads[currentIndex]?.timeLimit || 2) * 1000;
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ads.length);
      }, limit);
    }
    return () => clearTimeout(timerRef.current);
  }, [ads, currentIndex]);

  // Hide if route is restricted or no ads
  if (
    !restrictedRoutes.includes(location.pathname) ||
    ads.length === 0 ||
    !show
  ) {
    return null;
  }

  const currentAd = ads[currentIndex];
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          zIndex: 9998,
        }}
        onClick={() => setShow(false)}
      >
        <Card
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 5,
            backgroundColor: "#fff",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxHeight: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={currentAd.image}
              alt="Advertisement"
              sx={{
                maxWidth: "100%",
                maxHeight: "70vh",
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={() => window.open(currentAd.link, "_blank")}
            />
          </Box>

          {/* Close button (top right) */}
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
            }}
            onClick={() => setShow(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* Visit button (bottom center) */}
          <Button
            variant="contained"
            size="small"
            sx={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              textTransform: "none",
              color: "#FFFFFF",
              backgroundColor: "#EAB308",
              "&:hover": { backgroundColor: "#d9a600" },
              borderRadius: "20px",
              px: 3,
              zIndex: 2,
            }}
            onClick={() => window.open(currentAd.link, "_blank")}
          >
            Visit
          </Button>
        </Card>
      </Box>
    </>
  );
}
