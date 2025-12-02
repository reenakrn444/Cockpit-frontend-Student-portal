import { apiGet } from "../../api/axios";

export default function AdvertisementBanner() {
    const [ads, setAds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [show, setShow] = useState(true);
    const location = useLocation();
    const timerRef = useRef(null);

    // Pages where ad should NOT appear
    const restrictedRoutes = ["/test", "/testpage"];

    // Fetch ads
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const { data } = await apiGet("/admin/getAllAdvertisement");
                const activeAds = data?.data?.filter(ad => ad.isactive && !ad.expired);
                setAds(activeAds || []);
            } catch (err) {
                console.error("Error fetching ads:", err);
            }
        };
        fetchAds();
    }, []);

    // Auto-rotate ads based on timeLimit
    useEffect(() => {
        if (ads.length > 0) {
            const limit = (ads[currentIndex]?.timeLimit || 2) * 1000;
            timerRef.current = setTimeout(() => {
                setCurrentIndex(prev => (prev + 1) % ads.length);
            }, limit);
        }
        return () => clearTimeout(timerRef.current);
    }, [ads, currentIndex]);

    // Hide if route is restricted or no ads
    if (restrictedRoutes.includes(location.pathname) || ads.length === 0 || !show) {
        return null;
    }

    const currentAd = ads[currentIndex];

    return (
        <Card
            sx={{
                position: "absolute",
                top: 100,
                left: 50,
                maxWidth: 300,
                height: 200,
                margin: "10px auto",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                zIndex: 999,
            }}
        >
            {/* Ad Image (Full background) */}
            <CardMedia
                component="img"
                image={currentAd.image}
                alt="Advertisement"
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer"
                }}
                onClick={() => window.open(currentAd.link, "_blank")}
            />

            {/* Close button (top right) */}
            <IconButton
                size="small"
                sx={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    backgroundColor: "rgba(255,255,255,0.7)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" }
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
                    zIndex: 2
                }}
                onClick={() => window.open(currentAd.link, "_blank")}
            >
                Visit
            </Button>
        </Card>

    );
}
