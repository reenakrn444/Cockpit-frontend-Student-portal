import { Backdrop } from "@mui/material";

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const Loader = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {children}

            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
                open={loading}
            >
                <Box>
                    <img
                        src="/images/FlightLoader.gif"
                        alt="Loading..."
                        style={{ width: "180px", height: "180px" }}
                    />
                </Box>
            </Backdrop>
        </LoaderContext.Provider>
    );
};