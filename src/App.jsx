import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Facilities from "./pages/Facilities/Facilities";
import Admissions from "./pages/Admissions/Admissions";
import Activities from "./pages/Activities/Activities";
import Gallery from "./pages/Gallery/Gallery";
import Notice from "./pages/Notice/Notice";
import Fee from "./pages/Fee/Fee";
import Attendance from "./pages/Attendance/Attendance";
import Result from "./pages/Result/Result";
import StudyPoint from "./pages/StudyPoint/StudyPoint";
import Career from "./pages/Career/Career";
import Help from "./pages/Help/Help";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="facilities" element={<Facilities />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="activities" element={<Activities />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="notice" element={<Notice />} />
        <Route path="fee" element={<Fee />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="result" element={<Result />} />
        <Route path="study-point" element={<StudyPoint />} />
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
