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
                setAds(activeAds);
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
        <Box sx={{ position: "relative", width: "100%", background: "#fff" }}>
            {/* Close button */}
            <IconButton
                size="small"
                sx={{ position: "absolute", right: 4, top: 4, zIndex: 2 }}
                onClick={() => setShow(false)}
            >
                <CloseIcon fontSize="small" />
            </IconButton>

            {/* Ad Image */}
            <Box
                component="img"
                src={currentAd.image}
                alt="Advertisement"
                sx={{
                    // m:10,
                    width: "30%",
                    height: { xs: 80, md: 100 },
                    objectFit: "cover",
                    cursor: "pointer"
                }}
                onClick={() => window.open(currentAd.link, "_blank")}
            />
        </Box>
    );
}
