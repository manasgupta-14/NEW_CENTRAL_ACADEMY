import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Without this, navigating to a new route (e.g. Home -> Activities)
// keeps the previous scroll position instead of starting at the top.
// If the link included a hash (e.g. "/#about"), scroll to that section
// instead — used by the navbar's About link.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // The target section may not be painted yet right after navigating
    // from another route, so retry briefly until it shows up.
    const id = hash.replace("#", "");
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 20) {
        attempts += 1;
        requestAnimationFrame(tryScroll);
      }
    };
    tryScroll();
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
