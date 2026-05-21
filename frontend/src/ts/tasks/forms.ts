import { postForm } from "../utils";
import { insertTaskHtmlInTree, removeEmptyState } from "./dom";

// ─── Quick-add form ───────────────────────────────────────────────────────────

export function initQuickAdd(): void {
  document.querySelectorAll<HTMLFormElement>(".task-quick-add").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = form.querySelector<HTMLInputElement>("input[name='title']");
      if (!input?.value.trim()) { input?.focus(); return; }

      const data = new FormData(form);
      const granularity = form.dataset.granularity ?? "day";
      data.set("granularity", granularity);
      if (granularity === "day") {
        data.set("scheduled_date", form.dataset.scheduledDate ?? "");
      }

      const submitBtn = form.querySelector<HTMLButtonElement>("[type='submit']");
      if (submitBtn) submitBtn.disabled = true;

      const json = await postForm(form.dataset.createUrl!, data);

      if (submitBtn) submitBtn.disabled = false;

      if (json.ok) {
        const treeId = form.dataset.treeId ?? "task-tree";
        const tree = document.getElementById(treeId);
        if (tree) insertTaskHtmlInTree(json.html, json.parent_id, tree);
        input.value = "";
        input.focus();
      }
    });
  });
}

// ─── Subtask inline add ───────────────────────────────────────────────────────

export function createInlineForm(parentId: number, date: string, createUrl: string): HTMLFormElement {
  const form = document.createElement("form");
  form.className = "task-inline-add";
  form.innerHTML = `
    <input type="text" name="title" class="form-input task-quick-input" placeholder="Subtasca…" autocomplete="off">
    <button type="submit" class="btn-link btn-small" title="Afegir">+</button>
    <button type="button" class="btn-link btn-small btn-secondary js-cancel-inline" title="Cancel·lar">✕</button>
  `;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>("input[name='title']");
    if (!input?.value.trim()) { input?.focus(); return; }

    const data = new URLSearchParams({
      title: input.value.trim(),
      parent: String(parentId),
      scheduled_date: date,
    });

    const json = await postForm(createUrl, data);
    if (json.ok) {
      form.insertAdjacentHTML("beforebegin", json.html);
      form.remove();
      removeEmptyState();
    }
  });

  form.querySelector(".js-cancel-inline")?.addEventListener("click", () => form.remove());
  return form;
}
