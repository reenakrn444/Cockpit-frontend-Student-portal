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


const AppContent = () => {
  const location = useLocation();
  const { pathname } = location
  const hideHeaderFooter = pathname === "/login" ||
    pathname === "/forgetpassword" ||
    pathname.startsWith("/resetpassword");;

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/training" element={<TrainingSyllabus />} />
        <Route path="/chapter" element={<Chapter />} />
        <Route path="/trainingQuestion/:syllabusName/:bookName/:chapterName" element={<TrainingQuestion />} />
        <Route path="/test" element={<TestSyllabus />} />
        <Route path="/testRules" element={<TestRules />} />
        <Route path="/testpage" element={<TestPage2 />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/pricing" element={<Subscription />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>

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
