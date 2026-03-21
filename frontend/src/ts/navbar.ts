export function initNavbar(): void {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const hamburger = navbar.querySelector<HTMLButtonElement>(".navbar-hamburger");
  if (!hamburger) return;

  hamburger.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close when clicking outside the navbar
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target as Node)) {
      navbar.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  // Close when a mobile menu link is followed (but not dropdown toggles)
  navbar.querySelectorAll(".navbar-mobile-menu .navbar-btn").forEach((link) => {
    if (link.closest(".dropdown-wrapper")) return;
    link.addEventListener("click", () => {
      navbar.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}
