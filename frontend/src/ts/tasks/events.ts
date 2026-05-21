import { postForm } from "../utils";
import { markNodes } from "./dom";
import { currentPopoverTaskId, openPopover, closePopover } from "./popover";
import { startTitleEdit } from "./title-edit";
import { createInlineForm } from "./forms";

// ─── Event delegation ─────────────────────────────────────────────────────────

export function initTaskTreeEvents(): void {
  document.addEventListener("contextmenu", (e) => {
    const node = (e.target as HTMLElement).closest<HTMLElement>("[data-task-id]");
    if (!node || !node.closest(".task-tree")) return;
    if (!node.querySelector(".js-edit-trigger")) return;
    e.preventDefault();
    const taskId = Number(node.dataset.taskId);
    if (currentPopoverTaskId === taskId) { closePopover(); return; }
    openPopover(taskId, { x: e.clientX, y: e.clientY });
  });

  document.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".task-tree")) return;

    // Checkbox → complete
    if (target.classList.contains("js-complete-check")) {
      const node = target.closest<HTMLElement>("[data-task-id]");
      if (!node) return;
      const url = node.getAttribute("data-complete-url");
      if (!url) { target.checked = false; return; }
      target.disabled = true;
      const json = await postForm(url, new URLSearchParams());
      if (json.ok) {
        markNodes(json.affected_ids, "completed");
      } else {
        target.checked = false;
        target.disabled = false;
      }
      return;
    }

    // Options button → popover
    if (target.classList.contains("js-edit-trigger")) {
      const taskId = Number(target.getAttribute("data-task-id"));
      if (currentPopoverTaskId === taskId) { closePopover(); return; }
      openPopover(taskId, target);
      return;
    }

    // Editable title → inline edit
    if (target.classList.contains("js-editable-title")) {
      startTitleEdit(target);
      return;
    }

    // Add subtask (day tasks only)
    if (target.classList.contains("js-add-subtask")) {
      const parentId = Number(target.getAttribute("data-task-id"));
      const date = target.getAttribute("data-date") ?? "";
      const createUrl = (document.getElementById("task-quick-add") as HTMLFormElement | null)
        ?.dataset.createUrl ?? "";

      const tree = document.getElementById("task-tree");
      const parentNode = tree?.querySelector<HTMLElement>(`[data-task-id="${parentId}"]`);
      if (!parentNode) return;

      const existing = parentNode.nextElementSibling;
      if (existing?.classList.contains("task-inline-add")) { existing.remove(); return; }

      const form = createInlineForm(parentId, date, createUrl);
      parentNode.insertAdjacentElement("afterend", form);
      form.querySelector<HTMLInputElement>("input")?.focus();
      return;
    }
  });
}
