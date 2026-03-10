import { lazy, Suspense } from "react";
import { Header, FooterSection } from "../components";
import ScrollToTop from "../components/ScrollToTop";
import AdvertisementBanner from "../components/Advertisement/AdvertisementBanner";
import TokenExpiry from "../utils/TokenExpiry";
import AviationAuthority from "../Exam/AviationAuthority";

// Lazy-loaded page components
const Home = lazy(() => import("../pages/Home/home"));
const Login = lazy(() => import("../pages/Auth/Login"));
const TrainingSyllabus = lazy(() =>
  import("../pages/Training/TrainingSyllabus")
);
const Chapter = lazy(() => import("../pages/Chapter/chapter"));
const TrainingQuestion = lazy(() =>
  import("../pages/Training/TrainingQuestions")
);
const TestSyllabus = lazy(() => import("../pages/Test/TestSyllabus"));
const TestRules = lazy(() => import("../pages/Test/TestRules"));
const TestPage2 = lazy(() => import("../pages/Test/TestPage2"));
const UserProfile = lazy(() => import("../pages/Profile/UserProfile"));
const Subscription = lazy(() => import("../pages/subscription/subscription"));
const ForgetPassword = lazy(() => import("../pages/Auth/ForgetPassword"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));
const ReportPage = lazy(() => import("../pages/Report/ReportPage"));
const ChangePassword = lazy(() => import("../pages/Profile/ChangePassword"));
const ThemeSettings = lazy(() => import("../pages/Profile/ThemeSetting"));
const ComingSoon = lazy(() =>
  import("../pages/CommingSoon/commingSoon")
);
const TermsAndConditions = lazy(() =>
  import("../components/Footer/TermsAndConditions")
);
const TestTermsAndConditions = lazy(() =>
  import("../components/Footer/TestTermsAndConditions")
);
const PrivacyPolicy = lazy(() => import("../components/Footer/PrivacyPolicy"));
const CookiesPolicy = lazy(() => import("../components/Footer/Cookies"));
const PressPage = lazy(() => import("../pages/Press/Press"));
const FlightLog = lazy(() => import("../pages/Profile/FlightLog"));
const FlightLogReport = lazy(() =>
  import("../pages/Profile/FlightLogReport")
);
const BlogSection1 = lazy(() => import("../pages/Press/Blog1"));
const BlogSection2 = lazy(() => import("../pages/Press/Blog2"));
const BlogSection3 = lazy(() => import("../pages/Press/Blog3"));
const BlogSection4 = lazy(() => import("../pages/Press/Blog4"));
const TestResultPage = lazy(() => import("../pages/Test/TestResult"));
const PartnerWithUsForm = lazy(() =>
  import("../pages/PartnerWithUs/PartnerWithUsForm")
);
const PaymentPolicy = lazy(() =>
  import("../components/Footer/PaymentPolicy")
);

const PageLoader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 64px)",
    }}
  >
    <CircularProgress />
  </Box>
);

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (TokenExpiry()) {
      //check for initial render when component mounts
      navigate("/");
    }

    const interval = setInterval(() => {
      //checks at every minute
      if (TokenExpiry()) {
        navigate("/");
      }
    }, 60 * 1000); // check every 1 min

    return () => clearInterval(interval);
  }, [navigate]);

  const location = useLocation();
  const { pathname } = location;

  const AuthRoute = () => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  const hideHeaderFooter =
    pathname === "/login" ||
    pathname === "/forgetpassword" ||
    pathname === "/testpage" ||
    pathname.startsWith("/resetpassword");

  const hideAdvertisement =
    pathname === "/login" ||
    pathname === "/forgetpassword" ||
    pathname === "/AviationAuthority" ||
    pathname === "/testRules" ||
    pathname === "/testpage" ||
    pathname === "/test-result" ||
    pathname.startsWith("/resetpassword");

  return (
    <>
      {!hideHeaderFooter && <Header />}

      {!hideAdvertisement && <AdvertisementBanner />}

      <Box
        sx={{
          flex: 1,
          minHeight: { xs: "calc(100vh - 64px)", md: "calc(80vh - 64px)" },
        }}
      >
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/Exam" element={<AviationAuthority />} />
          {/* <Route path="/Exam" element={<AviationAuthority />} /> */}

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route
            path="/test-terms-and-conditions"
            element={<TestTermsAndConditions />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/payment-policy" element={<PaymentPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/training" element={<TrainingSyllabus />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route
            path="/trainingQuestion/:syllabusName/:bookName/:chapterName"
            element={<TrainingQuestion />}
          />
          <Route path="/test" element={<TestSyllabus />} />
          <Route path="/testRules" element={<TestRules />} />
          <Route path="/testpage" element={<TestPage2 />} />
          <Route path="/pricing" element={<Subscription />} />
          <Route path="/syllabus" element={<ComingSoon />} />
          <Route path="/taketest" element={<ComingSoon />} />
          <Route path="/press" element={<PressPage />} />
          <Route path="/blog1" element={<BlogSection1 />} />
          <Route path="/blog2" element={<BlogSection2 />} />
          <Route path="/blog3" element={<BlogSection3 />} />
          <Route path="/blog4" element={<BlogSection4 />} />
          <Route path="/partner-with-us" element={<PartnerWithUsForm />} />

          <Route element={<AuthRoute />}>
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/theme" element={<ThemeSettings />} />
            <Route path="/flight-log" element={<FlightLog />} />
            <Route path="/flight-log-report" element={<FlightLogReport />} />
            <Route path="/test-result" element={<TestResultPage />} />
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </Suspense>
      </Box>
      {!hideHeaderFooter && <FooterSection />}
    </>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default AppRouter;
