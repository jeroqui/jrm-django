import { initAudioPlayers } from "./audio-player";
import { initHeader } from "./header";
import { initNavbar } from "./navbar";
import { initSmoothScroll } from "./smooth-scroll";

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initNavbar();
  initAudioPlayers();

  // Only init header on home page
  if (document.body.classList.contains("home")) {
    initHeader();
  }
});

