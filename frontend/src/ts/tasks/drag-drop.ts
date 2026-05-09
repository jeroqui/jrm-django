import { postForm } from "../utils";
import { renumberTasks } from "./dom";

// ─── Drag and drop ────────────────────────────────────────────────────────────

let dragAllowed = false;

export function getDomDescendants(tree: HTMLElement, taskId: number): HTMLElement[] {
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

export function initDragAndDrop(): void {
  const tree = document.getElementById("task-tree");
  if (!tree) return;
  const reorderUrl = tree.dataset.reorderUrl ?? "";

  tree.addEventListener("mousedown", (e) => {
    dragAllowed = !!(e.target as HTMLElement).closest(".task-drag-handle");
  });

  tree.addEventListener("dragstart", (e) => {
    if (!dragAllowed) { e.preventDefault(); return; }
    const node = (e.target as HTMLElement).closest<HTMLElement>("[data-task-id]");
    if (!node) { e.preventDefault(); return; }
    e.dataTransfer!.effectAllowed = "move";
    e.dataTransfer!.setData("text/plain", node.dataset.taskId ?? "");
    node.classList.add("dragging");
  });

  tree.addEventListener("dragend", () => {
    tree.querySelectorAll(".dragging, .drop-before, .drop-into, .drop-after").forEach(el => {
      el.classList.remove("dragging", "drop-before", "drop-into", "drop-after");
    });
  });

  tree.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-task-id]");
    if (!target) return;
    tree.querySelectorAll(".drop-before, .drop-into, .drop-after").forEach(el => {
      el.classList.remove("drop-before", "drop-into", "drop-after");
    });
    const rect = target.getBoundingClientRect();
    const relY = (e.clientY - rect.top) / rect.height;
    if (relY < 0.3) {
      target.classList.add("drop-before");
    } else if (relY < 0.7) {
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
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-task-id]");
    if (!target || Number(target.dataset.taskId) === droppedId) return;

    const draggedEl = tree.querySelector<HTMLElement>(`[data-task-id="${droppedId}"]`);
    if (!draggedEl) return;

    const isBefore = target.classList.contains("drop-before");
    const isInto  = target.classList.contains("drop-into");

    // drop-into  → dragged task becomes a child of target
    // drop-before/after → dragged task becomes a sibling of target (same parent)
    const newParentId: string = isInto
      ? (target.dataset.taskId ?? "")
      : (target.dataset.parentId ?? "");

    const oldParentId = draggedEl.dataset.parentId ?? "";
    const parentChanged = newParentId !== oldParentId;

    // Depth is encoded in the existing inline padding-left (depth * 1.5rem)
    const oldDepth   = Math.round((parseFloat(draggedEl.style.paddingLeft) || 0) / 1.5);
    const targetDepth = Math.round((parseFloat(target.style.paddingLeft) || 0) / 1.5);
    const newDepth   = isInto ? targetDepth + 1 : targetDepth;
    const depthDelta = newDepth - oldDepth;

    // Compute descendants before any DOM mutation
    const descendants = getDomDescendants(tree, droppedId);

    // Guard: cannot drop a task onto one of its own descendants
    const descendantIds = new Set(descendants.map(el => Number(el.dataset.taskId)));
    if (descendantIds.has(Number(target.dataset.taskId))) {
      tree.querySelectorAll(".dragging, .drop-before, .drop-into, .drop-after").forEach(el => {
        el.classList.remove("dragging", "drop-before", "drop-into", "drop-after");
      });
      return;
    }

    // Move dragged element (and its descendants) to the new position
    const moveGroup = [draggedEl, ...descendants];
    const fragment = document.createDocumentFragment();
    moveGroup.forEach(el => fragment.appendChild(el));

    if (isBefore) {
      tree.insertBefore(fragment, target);
    } else {
      // drop-after and drop-into both insert after the target's last descendant
      const targetDesc = getDomDescendants(tree, Number(target.dataset.taskId));
      const anchor = targetDesc.length ? targetDesc[targetDesc.length - 1] : target;
      tree.insertBefore(fragment, anchor.nextSibling);
    }

    tree.querySelectorAll(".dragging, .drop-before, .drop-into, .drop-after").forEach(el => {
      el.classList.remove("dragging", "drop-before", "drop-into", "drop-after");
    });

    // Update parent attribute and visual indentation when the parent changed
    if (parentChanged || depthDelta !== 0) {
      draggedEl.dataset.parentId = newParentId;
      draggedEl.style.paddingLeft = `${Math.max(0, newDepth * 1.5)}rem`;

      descendants.forEach(d => {
        const dp = parseFloat(d.style.paddingLeft) || 0;
        d.style.paddingLeft = `${Math.max(0, dp + depthDelta * 1.5)}rem`;
      });

      // Add order-num span when becoming a root task; remove it when becoming a subtask
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

    // Send updated order and, if changed, the new parent to the server
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
