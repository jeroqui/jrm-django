import { initAudioPlayers } from "./audio-player";
import { initHeader } from "./header";
import { initNavbar } from "./navbar";
import { initSmoothScroll } from "./smooth-scroll";
import { initTaskDiscardModal } from "./task-discard-modal";

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initNavbar();
  initAudioPlayers();

  initTaskDiscardModal();

  // Only init header on home page
  if (document.body.classList.contains("home")) {
    initHeader();
  }
});

