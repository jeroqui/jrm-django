import { postForm } from "../utils";

// ─── Inline notes ─────────────────────────────────────────────────────────────

export function initNotes(): void {
  document.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>(".js-notes-toggle");
    if (!btn) return;

    const node = btn.closest<HTMLElement>("[data-task-id]");
    if (!node) return;

    const area = node.querySelector<HTMLElement>(".task-notes-area");
    if (!area) return;

    const isHidden = area.hasAttribute("hidden");
    if (isHidden) {
      const textarea = area.querySelector<HTMLTextAreaElement>(".task-notes-input");
      if (textarea) textarea.value = node.dataset.notes ?? "";
      area.removeAttribute("hidden");
      area.querySelector<HTMLTextAreaElement>(".task-notes-input")?.focus();
    } else {
      area.setAttribute("hidden", "");
    }
  });

  document.addEventListener("blur", async (e) => {
    const textarea = (e.target as HTMLElement);
    if (!textarea.classList.contains("task-notes-input")) return;

    const node = textarea.closest<HTMLElement>("[data-task-id]");
    if (!node) return;

    const url = node.getAttribute("data-update-url");
    if (!url) return;

    const newNotes = (textarea as HTMLTextAreaElement).value;
    if (newNotes === (node.dataset.notes ?? "")) return;

    const json = await postForm(url, new URLSearchParams({ notes: newNotes }));
    if (json.ok) {
      node.dataset.notes = newNotes;
    }
  }, true);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const textarea = e.target as HTMLElement;
    if (!textarea.classList.contains("task-notes-input")) return;

    const node = textarea.closest<HTMLElement>("[data-task-id]");
    if (!node) return;

    (textarea as HTMLTextAreaElement).value = node.dataset.notes ?? "";
    node.querySelector<HTMLElement>(".task-notes-area")?.setAttribute("hidden", "");
    (textarea as HTMLTextAreaElement).blur();
  });
}
