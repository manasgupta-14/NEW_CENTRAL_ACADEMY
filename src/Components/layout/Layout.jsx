import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../common/ScrollToTop";
import ScrollProgress from "../common/ScrollProgress";
import WhatsAppButton from "../common/WhatsAppButton";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Wraps every route: Navbar + page + Footer. Pages only render their own content.
function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      {/* key= re-runs the page-in animation on every route change */}
      <main key={pathname} className="animate-page-in">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Layout;
