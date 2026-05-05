export function initTaskDiscardModal(): void {
  const modal = document.getElementById("task-discard-modal");
  if (!modal) return;

  const form = modal.querySelector<HTMLFormElement>("#task-discard-form");
  const titleEl = modal.querySelector<HTMLElement>("#modal-task-title");
  const cancelBtn = modal.querySelector<HTMLButtonElement>("#modal-cancel");
  const backdrop = modal.querySelector<HTMLElement>("#modal-backdrop");

  const closeModal = (): void => {
    modal.setAttribute("hidden", "");
  };

  document.querySelectorAll<HTMLButtonElement>(".js-discard-trigger").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const taskTitle = btn.dataset.taskTitle ?? "";
      const discardUrl = btn.dataset.discardUrl ?? "";

      if (titleEl) titleEl.textContent = taskTitle;
      if (form) form.action = discardUrl;

      const textarea = form?.querySelector<HTMLTextAreaElement>("textarea[name='reason']");
      if (textarea) textarea.value = "";

      modal.removeAttribute("hidden");
      textarea?.focus();
    });
  });

  cancelBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hasAttribute("hidden")) {
      closeModal();
    }
  });
}
