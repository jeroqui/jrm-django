import { initHeader } from "./header";
import { initSmoothScroll } from "./smooth-scroll";

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();

  // Only init header on home page
  if (document.body.classList.contains("home")) {
    initHeader();
  }
});

