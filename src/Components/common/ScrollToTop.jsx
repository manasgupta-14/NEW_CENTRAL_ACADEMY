import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Without this, navigating to a new route (e.g. Home -> Activities)
// keeps the previous scroll position instead of starting at the top.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
