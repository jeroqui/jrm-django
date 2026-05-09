import { postForm } from "../utils";
import { getGroupsData } from "./groups";
import { openDiscardModal } from "../modal";

// ─── Popover ──────────────────────────────────────────────────────────────────

export let currentPopoverTaskId: number | null = null;

export function initPopover(): void {
  const popover = document.getElementById("task-popover");
  const box = document.getElementById("popover-box");
  const groupsEl = document.getElementById("popover-groups");
  const discardBtn = document.getElementById("popover-discard");

  if (!popover || !box) return;

  // Build group swatches once
  if (groupsEl) {
    const noBtn = document.createElement("button");
    noBtn.type = "button";
    noBtn.className = "group-swatch group-swatch-none js-swatch";
    noBtn.title = "Sense grup";
    noBtn.textContent = "×";
    noBtn.dataset.groupId = "";
    noBtn.addEventListener("click", () => applyGroupChange(null));
    groupsEl.appendChild(noBtn);

    for (const g of getGroupsData()) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "group-swatch js-swatch";
      btn.style.setProperty("--swatch-color", g.color);
      btn.title = g.name;
      btn.dataset.groupId = String(g.id);
      btn.addEventListener("click", () => applyGroupChange(g.id));
      groupsEl.appendChild(btn);
    }
  }

  discardBtn?.addEventListener("click", () => {
    if (currentPopoverTaskId === null) return;
    const node = document.querySelector<HTMLElement>(`[data-task-id="${currentPopoverTaskId}"]`);
    const title = node?.querySelector<HTMLElement>(".task-title")?.textContent ?? "";
    const url = node?.getAttribute("data-discard-url") ?? "";
    closePopover();
    openDiscardModal(currentPopoverTaskId, title, url);
  });

  document.addEventListener("click", (e) => {
    if (popover.hasAttribute("hidden")) return;
    const t = e.target as Node;
    if (!popover.contains(t) && !(t as Element).closest?.(".js-edit-trigger")) {
      closePopover();
    }
  });
}

export function openPopover(taskId: number, anchorOrPos: HTMLElement | { x: number; y: number }): void {
  const popover = document.getElementById("task-popover");
  const box = document.getElementById("popover-box") as HTMLElement | null;
  const groupsEl = document.getElementById("popover-groups");
  if (!popover || !box) return;

  currentPopoverTaskId = taskId;

  const node = document.querySelector<HTMLElement>(`[data-task-id="${taskId}"]`);
  if (!node) return;

  const currentGroupId = node.dataset.groupId ?? "";
  groupsEl?.querySelectorAll<HTMLElement>(".js-swatch").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.groupId === currentGroupId);
  });

  popover.removeAttribute("hidden");

  // Position: from anchor element or from cursor coordinates
  let rawLeft: number, rawTop: number;
  if (anchorOrPos instanceof HTMLElement) {
    const rect = anchorOrPos.getBoundingClientRect();
    rawLeft = rect.left;
    rawTop = rect.bottom + 6;
  } else {
    rawLeft = anchorOrPos.x;
    rawTop = anchorOrPos.y + 4;
  }

  const boxW = box.offsetWidth || 180;
  const boxH = box.offsetHeight || 120;
  let left = rawLeft;
  let top = rawTop;
  if (left + boxW > window.innerWidth - 8) left = window.innerWidth - boxW - 8;
  if (top + boxH > window.innerHeight - 8) top = rawTop - boxH - 4;
  box.style.top = `${top + window.scrollY}px`;
  box.style.left = `${left}px`;
}

export function closePopover(): void {
  document.getElementById("task-popover")?.setAttribute("hidden", "");
  currentPopoverTaskId = null;
}

export function updateGroupBadge(node: HTMLElement, groupId: number | null): void {
  node.dataset.groupId = groupId !== null ? String(groupId) : "";
  const existing = node.querySelector(".task-group-badge");
  if (groupId !== null) {
    const group = getGroupsData().find(g => g.id === groupId);
    if (group) {
      if (existing) {
        (existing as HTMLElement).style.setProperty("--group-color", group.color);
        existing.textContent = group.name;
      } else {
        const badge = document.createElement("span");
        badge.className = "task-group-badge";
        badge.style.setProperty("--group-color", group.color);
        badge.textContent = group.name;
        node.querySelector(".task-title")?.insertAdjacentElement("beforebegin", badge);
      }
    }
  } else {
    existing?.remove();
  }
}

export async function applyGroupChange(groupId: number | null): Promise<void> {
  if (currentPopoverTaskId === null) return;
  const node = document.querySelector<HTMLElement>(`[data-task-id="${currentPopoverTaskId}"]`);
  if (!node) return;

  const json = await postForm(
    node.getAttribute("data-update-url") ?? "",
    new URLSearchParams({ group: groupId !== null ? String(groupId) : "" }),
  );
  if (!json.ok) return;

  updateGroupBadge(node, groupId);

  const groupsEl = document.getElementById("popover-groups");
  groupsEl?.querySelectorAll<HTMLElement>(".js-swatch").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.groupId === (groupId !== null ? String(groupId) : ""));
  });
}
