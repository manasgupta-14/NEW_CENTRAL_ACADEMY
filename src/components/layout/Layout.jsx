import { Outlet, useLocation } from "react-router-dom";
import AdmissionProvider from "../../context/AdmissionProvider";
import ScrollToTop from "../common/ScrollToTop";
import ScrollProgress from "../common/ScrollProgress";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Wraps every route: Navbar + page + Footer. Pages only render their own content.
function Layout() {
  const { pathname } = useLocation();

  return (
    <AdmissionProvider>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      {/* key= re-runs the page-in animation on every route change */}
      <main key={pathname} className="animate-page-in">
        <Outlet />
      </main>
      <Footer />
    </AdmissionProvider>
  );
}

export default Layout;
