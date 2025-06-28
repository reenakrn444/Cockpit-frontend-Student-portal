import { Header, FooterSection } from '../components';
import Home from '../pages/Home/home';
import Login from '../pages/Auth/Login';
import TrainingSyllabus from '../pages/Training/TrainingSyllabus';
import Chapter from '../pages/Chapter/chapter';
import TrainingQuestion from '../pages/Training/TrainingQuestions';
import TestSyllabus from '../pages/Test/TestSyllabus';
import TestRules from '../pages/Test/TestRules';
import TestPage2 from '../pages/Test/TestPage2';
import UserProfile from '../pages/Profile/UserProfile';
import Subscription from '../pages/subscription/subscription';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import ReportPage from '../pages/Report/ReportPage';
import ChangePassword from '../pages/Profile/ChangePassword';
import ThemeSettings from '../pages/Profile/ThemeSetting';
import ComingSoon from '../pages/CommingSoon/commingSoon';
import ScrollToTop from '../components/ScrollToTop';
import TermsAndConditions from '../components/Footer/TermsAndConditions';
import PrivacyPolicy from '../components/Footer/PrivacyPolicy';
import CookiesPolicy from '../components/Footer/Cookies';


const AppContent = () => {
  const location = useLocation();
  const { pathname } = location
  const AuthRoute = () => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  const hideHeaderFooter = pathname === "/login" ||
    pathname === "/forgetpassword" ||
    pathname.startsWith("/resetpassword");;

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Box sx={{ flex: 1, minHeight: {xs : 'calc(100vh - 64px)', md : 'calc(80vh - 64px)'} }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/training" element={<TrainingSyllabus />} />
          <Route path="/chapter" element={<Chapter />} />
          <Route path="/trainingQuestion/:syllabusName/:bookName/:chapterName" element={<TrainingQuestion />} />
          <Route path="/test" element={<TestSyllabus />} />
          <Route path="/testRules" element={<TestRules />} />
          <Route path="/testpage" element={<TestPage2 />} />
          <Route path="/pricing" element={<Subscription />} />
          <Route path="/syllabus" element={<ComingSoon />} />
          <Route path="/taketest" element={<ComingSoon />} />


          <Route element={<AuthRoute />}>
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/theme" element={<ThemeSettings />} />
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
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



