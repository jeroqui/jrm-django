export function initSmoothScroll(): void {
  const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();

      const targetId = link.getAttribute("href")?.slice(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          history.pushState(null, "", `#${targetId}`);
        }
      }
    });
  });
}

