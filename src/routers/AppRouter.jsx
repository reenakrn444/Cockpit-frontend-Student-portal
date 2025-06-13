import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Home from '../pages/Home/home'; 
import FooterSection from '../components/Footer/footer';
import Profile from '../pages/Profile/profile'; 
import TrainingSyllabus from '../pages/Training/TrainingSyllabus';
import Chapter from '../pages/Chapter/chapter';
import TrainingQuestion from '../pages/Training/TrainingQuestions';
import TestSyllabus from '../pages/Test/TestSyllabus';
import TestRules from '../pages/Test/TestRules';
import TestPage2 from '../pages/Test/TestPage2';
import UserProfile from '../pages/Profile/UserProfile';
import Subscription from '../pages/subscription/subscription';

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/profile";

  return (
    <>
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/training" element={<TrainingSyllabus />} />
        <Route path="/chapter" element={<Chapter />} />
        <Route path="/trainingQuestion/:syllabusName/:bookName/:chapterName" element={<TrainingQuestion />} />
        <Route path="/test" element={<TestSyllabus />} />
        <Route path="/testRules" element={<TestRules />} />
        <Route path="/testpage" element={<TestPage2 />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/pricing" element={<Subscription />} />
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
