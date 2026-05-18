import { initAudioPlayers } from "./audio-player";
import { initHeader } from "./header";
import { initNavbar } from "./navbar";
import { initSmoothScroll } from "./smooth-scroll";
import { initTasks } from "./tasks/index";

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initNavbar();
  initAudioPlayers();

  initTasks();

  // Only init header on home page
  if (document.body.classList.contains("home")) {
    initHeader();
  }
});

