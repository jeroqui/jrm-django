import { postForm } from "../utils";
import { getGroupsData } from "./groups";
import { openDiscardModal } from "../modal";

// ─── Popover ──────────────────────────────────────────────────────────────────

export let currentPopoverTaskId: number | null = null;

function getTomorrowDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function initPopover(): void {
  const popover = document.getElementById("task-popover");
  const box = document.getElementById("popover-box");
  const groupsEl = document.getElementById("popover-groups");
  const discardBtn = document.getElementById("popover-discard");
  const rescheduleBtn = document.getElementById("popover-reschedule");
  const rescheduleForm = document.getElementById("popover-reschedule-form");
  const rescheduleDateInput = document.getElementById("popover-reschedule-date") as HTMLInputElement | null;
  const rescheduleConfirmBtn = document.getElementById("popover-reschedule-confirm");

  if (!popover || !box) return;

  // Build group picker once
  if (groupsEl) {
    const noBtn = document.createElement("button");
    noBtn.type = "button";
    noBtn.className = "group-pick-btn group-pick-none js-swatch";
    noBtn.title = "Sense grup";
    noBtn.textContent = "Cap";
    noBtn.dataset.groupId = "";
    noBtn.addEventListener("click", () => applyGroupChange(null));
    groupsEl.appendChild(noBtn);

    for (const g of getGroupsData()) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "group-pick-btn js-swatch";
      btn.style.setProperty("--group-color", g.color);
      btn.title = g.name;
      btn.textContent = g.name;
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

  rescheduleBtn?.addEventListener("click", () => {
    if (!rescheduleForm || !rescheduleDateInput) return;
    const isHidden = rescheduleForm.hasAttribute("hidden");
    if (isHidden) {
      rescheduleDateInput.value = getTomorrowDateString();
      rescheduleForm.removeAttribute("hidden");
      rescheduleDateInput.focus();
    } else {
      rescheduleForm.setAttribute("hidden", "");
    }
  });

  rescheduleConfirmBtn?.addEventListener("click", async () => {
    if (currentPopoverTaskId === null || !rescheduleDateInput) return;
    const toDate = rescheduleDateInput.value;
    if (!toDate) return;

    const node = document.querySelector<HTMLElement>(`[data-task-id="${currentPopoverTaskId}"]`);
    const url = node?.getAttribute("data-reschedule-url") ?? "";
    if (!url) return;

    const taskId = currentPopoverTaskId;
    closePopover();

    const json = await postForm(url, new URLSearchParams({ to_date: toDate }));
    if (json.ok) {
      const taskNode = document.querySelector<HTMLElement>(`[data-task-id="${taskId}"]`);
      taskNode?.remove();
    }
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
  document.getElementById("popover-reschedule-form")?.setAttribute("hidden", "");
  currentPopoverTaskId = null;
}

function updateGroupBadge(node: HTMLElement, groupId: number | null): void {
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

async function applyGroupChange(groupId: number | null): Promise<void> {
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
