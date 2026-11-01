import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Facilities from "./pages/Facilities/Facilities";
import Admissions from "./pages/Admissions/Admissions";
import Activities from "./pages/Activities/Activities";
import Gallery from "./pages/Gallery/Gallery";
import GalleryYear from "./pages/Gallery/GalleryYear";
import GalleryEvent from "./pages/Gallery/GalleryEvent";
import Notice from "./pages/Notice/Notice";
import Fee from "./pages/Fee/Fee";
import Attendance from "./pages/Attendance/Attendance";
import Result from "./pages/Result/Result";
import StudyPoint from "./pages/StudyPoint/StudyPoint";
import PlaywayLkgUkg from "./pages/StudyPoint/PlaywayLkgUkg/PlaywayLkgUkg";
import Playway from "./pages/StudyPoint/PlaywayLkgUkg/Playway";
import Lkg from "./pages/StudyPoint/PlaywayLkgUkg/Lkg";
import Ukg from "./pages/StudyPoint/PlaywayLkgUkg/Ukg";
import Class1to5 from "./pages/StudyPoint/Class1to5/Class1to5";
import Class1 from "./pages/StudyPoint/Class1to5/Class1";
import Class2 from "./pages/StudyPoint/Class1to5/Class2";
import Class3 from "./pages/StudyPoint/Class1to5/Class3";
import Class4 from "./pages/StudyPoint/Class1to5/Class4";
import Class5 from "./pages/StudyPoint/Class1to5/Class5";
import Class6to8 from "./pages/StudyPoint/Class6to8/Class6to8";
import Class6 from "./pages/StudyPoint/Class6to8/Class6";
import Class7 from "./pages/StudyPoint/Class6to8/Class7";
import Class8 from "./pages/StudyPoint/Class6to8/Class8";
import Career from "./pages/Career/Career";
import Help from "./pages/Help/Help";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import ManagerDashboard from "./ManagerDashboard/ManagerDashboard";

function App() {
  return (
    <Routes>
      {/* Manager dashboard ka apna layout hai (sidebar), isliye school ke Navbar/Footer wale Layout ke bahar */}
      <Route path="manager/*" element={<ManagerDashboard />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="activities" element={<Activities />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="gallery/:year" element={<GalleryYear />} />
        <Route path="gallery/:year/:eventId" element={<GalleryEvent />} />
        <Route path="notice" element={<Notice />} />
        <Route path="fee" element={<Fee />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="result" element={<Result />} />
        <Route path="study-point">
          <Route index element={<StudyPoint />} />
          <Route path="playway-lkg-ukg" element={<PlaywayLkgUkg />} />
          <Route path="playway-lkg-ukg/playway/:toolId?" element={<Playway />} />
          <Route path="playway-lkg-ukg/lkg/:toolId?" element={<Lkg />} />
          <Route path="playway-lkg-ukg/ukg/:toolId?" element={<Ukg />} />
          <Route path="class-1-5" element={<Class1to5 />} />
          <Route path="class-1-5/class-1/:toolId?" element={<Class1 />} />
          <Route path="class-1-5/class-2/:toolId?" element={<Class2 />} />
          <Route path="class-1-5/class-3/:toolId?" element={<Class3 />} />
          <Route path="class-1-5/class-4/:toolId?" element={<Class4 />} />
          <Route path="class-1-5/class-5/:toolId?" element={<Class5 />} />
          <Route path="class-6-8" element={<Class6to8 />} />
          <Route path="class-6-8/class-6/:toolId?" element={<Class6 />} />
          <Route path="class-6-8/class-7/:toolId?" element={<Class7 />} />
          <Route path="class-6-8/class-8/:toolId?" element={<Class8 />} />
        </Route>
        <Route path="career" element={<Career />} />
        <Route path="help" element={<Help />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
