import { postForm } from "../utils";

// ─── Inline title editing ─────────────────────────────────────────────────────

export function startTitleEdit(titleEl: HTMLElement): void {
  if (titleEl.hasAttribute("contenteditable")) return;
  const originalText = titleEl.textContent ?? "";
  titleEl.setAttribute("contenteditable", "true");
  titleEl.focus();

  const range = document.createRange();
  range.selectNodeContents(titleEl);
  window.getSelection()?.removeAllRanges();
  window.getSelection()?.addRange(range);

  const save = async () => {
    const newTitle = titleEl.textContent?.trim() ?? "";
    titleEl.removeAttribute("contenteditable");
    if (!newTitle || newTitle === originalText) {
      titleEl.textContent = originalText;
      return;
    }
    const node = titleEl.closest<HTMLElement>("[data-task-id]");
    if (!node) return;
    const json = await postForm(
      node.getAttribute("data-update-url") ?? "",
      new URLSearchParams({ title: newTitle }),
    );
    if (!json.ok) titleEl.textContent = originalText;
  };

  titleEl.addEventListener("blur", save, { once: true });
  titleEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); titleEl.blur(); }
    else if (e.key === "Escape") { titleEl.textContent = originalText; titleEl.removeAttribute("contenteditable"); }
  }, { once: true });
}
