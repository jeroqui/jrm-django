import { initHeader } from "./header";
import { initNavbar } from "./navbar";
import { initSmoothScroll } from "./smooth-scroll";

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initNavbar();

  // Only init header on home page
  if (document.body.classList.contains("home")) {
    initHeader();
  }
});

