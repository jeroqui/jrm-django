import { postForm } from "../utils";
import { renumberTasks } from "./dom";

// ─── Drag and drop ────────────────────────────────────────────────────────────

let dragAllowed = false;

function getDomDescendants(tree: HTMLElement, taskId: number): HTMLElement[] {
  const result: HTMLElement[] = [];
  function collect(pid: number) {
    tree.querySelectorAll<HTMLElement>(`[data-parent-id="${pid}"]`).forEach(el => {
      result.push(el);
      collect(Number(el.dataset.taskId));
    });
  }
  collect(taskId);
  return result;
}

function getAllTrees(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(".task-tree"));
}

function cleanDropClasses(): void {
  getAllTrees().forEach(t => {
    t.querySelectorAll(".drop-before, .drop-into, .drop-after").forEach(el => {
      el.classList.remove("drop-before", "drop-into", "drop-after");
    });
  });
}

export function initDragAndDrop(): void {
  const trees = getAllTrees();
  if (!trees.length) return;

  document.addEventListener("mousedown", (e) => {
    dragAllowed = !!(e.target as HTMLElement).closest(".task-drag-handle");
  });

  for (const tree of trees) {
    initTreeDragDrop(tree);
  }
}

function initTreeDragDrop(tree: HTMLElement): void {
  const isDay = tree.dataset.granularity === "day";
  const reorderUrl = tree.dataset.reorderUrl ?? "";

  tree.addEventListener("dragstart", (e) => {
    if (!dragAllowed) { e.preventDefault(); return; }
    const node = (e.target as HTMLElement).closest<HTMLElement>("[data-task-id]");
    if (!node) { e.preventDefault(); return; }
    e.dataTransfer!.effectAllowed = "move";
    e.dataTransfer!.setData("text/plain", node.dataset.taskId ?? "");
    node.classList.add("dragging");
  });

  tree.addEventListener("dragend", () => {
    getAllTrees().forEach(t => {
      t.querySelectorAll(".dragging, .drop-before, .drop-into, .drop-after").forEach(el => {
        el.classList.remove("dragging", "drop-before", "drop-into", "drop-after");
      });
    });
  });

  tree.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-task-id]");
    if (!target) return;
    cleanDropClasses();
    const rect = target.getBoundingClientRect();
    const relY = (e.clientY - rect.top) / rect.height;
    if (relY < 0.3) {
      target.classList.add("drop-before");
    } else if (isDay && relY < 0.7) {
      target.classList.add("drop-into");
    } else {
      target.classList.add("drop-after");
    }
  });

  tree.addEventListener("dragleave", (e) => {
    if (!tree.contains(e.relatedTarget as Node)) {
      tree.querySelectorAll(".drop-before, .drop-into, .drop-after").forEach(el => {
        el.classList.remove("drop-before", "drop-into", "drop-after");
      });
    }
  });

  tree.addEventListener("drop", async (e) => {
    e.preventDefault();
    const droppedId = Number(e.dataTransfer!.getData("text/plain"));
    if (!droppedId) return;

    const trees = getAllTrees();
    cleanDropClasses();

    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-task-id]");
    if (target && Number(target.dataset.taskId) === droppedId) return;

    // Find dragged element and its source tree
    let draggedEl: HTMLElement | null = null;
    let fromTree: HTMLElement | null = null;
    for (const t of trees) {
      const el = t.querySelector<HTMLElement>(`[data-task-id="${droppedId}"]`);
      if (el) { draggedEl = el; fromTree = t; break; }
    }
    if (!draggedEl || !fromTree) return;

    if (fromTree !== tree) {
      // Cross-container: change granularity
      const targetGranularity = tree.dataset.granularity ?? "day";
      const movePeriodUrl = tree.dataset.movePeriodUrl ?? "";
      if (!movePeriodUrl) return;

      const json = await postForm(movePeriodUrl, new URLSearchParams({
        task_id: String(droppedId),
        granularity: targetGranularity,
      }));

      if (json.ok) {
        draggedEl.dataset.granularity = targetGranularity;
        // Reset nesting when leaving the day list
        if (targetGranularity !== "day") {
          draggedEl.style.paddingLeft = "0";
          draggedEl.dataset.parentId = "";
          draggedEl.querySelector(".task-order-num")?.remove();
        }
        if (target) {
          tree.insertBefore(draggedEl, target.nextSibling);
        } else {
          tree.appendChild(draggedEl);
        }
        renumberTasks(fromTree);
      }
      return;
    }

    // Same-container reorder (existing logic)
    const isBefore = target?.classList.contains("drop-before");
    const isInto  = target?.classList.contains("drop-into");

    const newParentId: string = isInto
      ? (target!.dataset.taskId ?? "")
      : (target?.dataset.parentId ?? "");

    const oldParentId = draggedEl.dataset.parentId ?? "";
    const parentChanged = newParentId !== oldParentId;

    const oldDepth   = Math.round((parseFloat(draggedEl.style.paddingLeft) || 0) / 1.5);
    const targetDepth = target ? Math.round((parseFloat(target.style.paddingLeft) || 0) / 1.5) : 0;
    const newDepth   = isInto ? targetDepth + 1 : targetDepth;
    const depthDelta = newDepth - oldDepth;

    const descendants = getDomDescendants(tree, droppedId);

    // Guard: cannot drop onto own descendant
    const descendantIds = new Set(descendants.map(el => Number(el.dataset.taskId)));
    if (target && descendantIds.has(Number(target.dataset.taskId))) return;

    const moveGroup = [draggedEl, ...descendants];
    const fragment = document.createDocumentFragment();
    moveGroup.forEach(el => fragment.appendChild(el));

    if (!target) {
      tree.appendChild(fragment);
    } else if (isBefore) {
      tree.insertBefore(fragment, target);
    } else {
      const targetDesc = getDomDescendants(tree, Number(target.dataset.taskId));
      const anchor = targetDesc.length ? targetDesc[targetDesc.length - 1] : target;
      tree.insertBefore(fragment, anchor.nextSibling);
    }

    if (parentChanged || depthDelta !== 0) {
      draggedEl.dataset.parentId = newParentId;
      draggedEl.style.paddingLeft = `${Math.max(0, newDepth * 1.5)}rem`;

      descendants.forEach(d => {
        const dp = parseFloat(d.style.paddingLeft) || 0;
        d.style.paddingLeft = `${Math.max(0, dp + depthDelta * 1.5)}rem`;
      });

      const numEl = draggedEl.querySelector<HTMLElement>(".task-order-num");
      if (!newParentId && !numEl) {
        const span = document.createElement("span");
        span.className = "task-order-num";
        span.textContent = "0";
        draggedEl.querySelector(".task-drag-handle")?.insertAdjacentElement("afterend", span);
      } else if (newParentId && numEl) {
        numEl.remove();
      }
    }

    renumberTasks(tree);

    const items = Array.from(tree.querySelectorAll<HTMLElement>("[data-task-id]")).map((el, i) => {
      const item: Record<string, unknown> = { id: Number(el.dataset.taskId), order: i };
      if (el === draggedEl && parentChanged) {
        item.parent_id = newParentId ? Number(newParentId) : null;
      }
      return item;
    });
    await postForm(reorderUrl, new URLSearchParams({ items: JSON.stringify(items) }));
  });
}
