// ─── DOM helpers ──────────────────────────────────────────────────────────────

export function markNodes(ids: number[], status: "completed" | "discarded"): void {
  for (const id of ids) {
    const node = document.querySelector<HTMLElement>(`[data-task-id="${id}"]`);
    if (!node) continue;
    node.classList.add("task-done");
    node.querySelector(".task-actions")?.remove();
    const badge = status === "completed" ? "✓" : "✗";
    const cls = status === "completed" ? "task-status-completed" : "task-status-discarded";
    const titleEl = node.querySelector(".task-title");
    titleEl?.removeAttribute("contenteditable");
    titleEl?.classList.remove("js-editable-title");
    titleEl?.insertAdjacentHTML("afterend", `<span class="task-status-badge ${cls}">${badge}</span>`);
    const cb = node.querySelector<HTMLInputElement>(".task-checkbox");
    if (cb) { cb.checked = true; cb.disabled = true; cb.classList.remove("js-complete-check"); }
  }
}

export function removeEmptyStateIn(tree: HTMLElement): void {
  tree.querySelector(".task-empty-state")?.remove();
}

export function removeEmptyState(): void {
  const tree = document.getElementById("task-tree");
  if (tree) removeEmptyStateIn(tree);
}

export function insertTaskHtmlInTree(html: string, parentId: number | null, tree: HTMLElement): void {
  removeEmptyStateIn(tree);

  if (parentId !== null && tree.dataset.granularity === "day") {
    const allChildren = Array.from(tree.querySelectorAll<HTMLElement>(`[data-parent-id="${parentId}"]`));
    const last = allChildren[allChildren.length - 1];
    if (last) { last.insertAdjacentHTML("afterend", html); return; }
    const parentNode = tree.querySelector<HTMLElement>(`[data-task-id="${parentId}"]`);
    if (parentNode) { parentNode.insertAdjacentHTML("afterend", html); return; }
  }
  tree.insertAdjacentHTML("beforeend", html);
  if (tree.dataset.granularity === "day") renumberTasks(tree);
}

export function insertTaskHtml(html: string, parentId: number | null): void {
  const tree = document.getElementById("task-tree");
  if (!tree) return;
  insertTaskHtmlInTree(html, parentId, tree);
}

export function renumberTasks(tree: HTMLElement): void {
  let counter = 0;
  tree.querySelectorAll<HTMLElement>("[data-task-id]").forEach(node => {
    const numEl = node.querySelector<HTMLElement>(".task-order-num");
    if (numEl) {
      counter++;
      numEl.textContent = String(counter);
    }
  });
}
