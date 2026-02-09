
const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const storedMode = localStorage.getItem('appTheme');
    if (storedMode) setMode(storedMode);
  }, []);

  const toggleTheme = (newMode) => {
    setMode(newMode);
    localStorage.setItem('appTheme', newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
