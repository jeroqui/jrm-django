function getCsrf(): string {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

async function postForm(url: string, data: FormData | URLSearchParams): Promise<any> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "X-CSRFToken": getCsrf() },
    body: data,
  });
  return res.json();
}

function getGroupsData(): Array<{ id: number; name: string; color: string }> {
  try {
    return JSON.parse(document.getElementById("task-groups-data")?.textContent ?? "[]");
  } catch {
    return [];
  }
}

// ─── Discard modal ────────────────────────────────────────────────────────────

let discardModal: HTMLElement | null = null;
let discardTaskId: number | null = null;

function initDiscardModal(): void {
  discardModal = document.getElementById("task-discard-modal");
  if (!discardModal) return;

  const backdrop = discardModal.querySelector<HTMLElement>("#modal-backdrop");
  const cancelBtn = discardModal.querySelector<HTMLButtonElement>("#modal-cancel");
  const confirmBtn = discardModal.querySelector<HTMLButtonElement>("#modal-confirm");
  const reasonEl = discardModal.querySelector<HTMLTextAreaElement>("#modal-reason");
  const errorEl = discardModal.querySelector<HTMLElement>("#modal-error");

  const close = () => {
    discardModal!.setAttribute("hidden", "");
    discardTaskId = null;
    if (reasonEl) reasonEl.value = "";
    if (errorEl) errorEl.setAttribute("hidden", "");
  };

  cancelBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && discardModal && !discardModal.hasAttribute("hidden")) close();
  });

  confirmBtn?.addEventListener("click", async () => {
    if (!discardTaskId) return;
    const reason = reasonEl?.value.trim() ?? "";
    if (!reason) {
      if (errorEl) { errorEl.textContent = "Cal un motiu."; errorEl.removeAttribute("hidden"); }
      reasonEl?.focus();
      return;
    }

    const btn = confirmBtn;
    btn.disabled = true;

    const taskNode = document.querySelector<HTMLElement>(`[data-task-id="${discardTaskId}"]`);
    const discardUrl = taskNode?.getAttribute("data-discard-url") ?? "";

    const data = new URLSearchParams({ reason });
    const json = await postForm(discardUrl, data);

    btn.disabled = false;

    if (json.ok) {
      markNodes(json.affected_ids, "discarded");
      close();
    } else {
      if (errorEl) { errorEl.textContent = json.error ?? "Error."; errorEl.removeAttribute("hidden"); }
    }
  });
}

function openDiscardModal(taskId: number, taskTitle: string): void {
  if (!discardModal) return;
  discardTaskId = taskId;
  const titleEl = discardModal.querySelector<HTMLElement>("#modal-task-title");
  if (titleEl) titleEl.textContent = taskTitle;
  const reasonEl = discardModal.querySelector<HTMLTextAreaElement>("#modal-reason");
  if (reasonEl) reasonEl.value = "";
  const errorEl = discardModal.querySelector<HTMLElement>("#modal-error");
  if (errorEl) errorEl.setAttribute("hidden", "");
  discardModal.removeAttribute("hidden");
  reasonEl?.focus();
}

// ─── Popover ──────────────────────────────────────────────────────────────────

let currentPopoverTaskId: number | null = null;

function initPopover(): void {
  const popover = document.getElementById("task-popover");
  const box = document.getElementById("popover-box");
  const closeBtn = document.getElementById("popover-close");
  const notesEl = document.getElementById("popover-notes") as HTMLTextAreaElement | null;
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

  closeBtn?.addEventListener("click", closePopover);

  notesEl?.addEventListener("blur", () => {
    if (currentPopoverTaskId === null) return;
    const node = document.querySelector<HTMLElement>(`[data-task-id="${currentPopoverTaskId}"]`);
    if (!node) return;
    const updateUrl = node.getAttribute("data-update-url") ?? "";
    postForm(updateUrl, new URLSearchParams({ notes: notesEl.value }));
    node.dataset.notes = notesEl.value;
  });

  discardBtn?.addEventListener("click", () => {
    if (currentPopoverTaskId === null) return;
    const node = document.querySelector<HTMLElement>(`[data-task-id="${currentPopoverTaskId}"]`);
    const title = node?.querySelector<HTMLElement>(".task-title")?.textContent ?? "";
    closePopover();
    openDiscardModal(currentPopoverTaskId, title);
  });

  document.addEventListener("click", (e) => {
    if (popover.hasAttribute("hidden")) return;
    const t = e.target as Node;
    if (!popover.contains(t) && !(t as Element).closest?.(".js-edit-trigger")) {
      closePopover();
    }
  });
}

function openPopover(taskId: number, anchor: HTMLElement): void {
  const popover = document.getElementById("task-popover");
  const box = document.getElementById("popover-box") as HTMLElement | null;
  const notesEl = document.getElementById("popover-notes") as HTMLTextAreaElement | null;
  const groupsEl = document.getElementById("popover-groups");
  if (!popover || !box) return;

  currentPopoverTaskId = taskId;

  const node = document.querySelector<HTMLElement>(`[data-task-id="${taskId}"]`);
  if (!node) return;

  if (notesEl) notesEl.value = node.dataset.notes ?? "";

  const currentGroupId = node.dataset.groupId ?? "";
  groupsEl?.querySelectorAll<HTMLElement>(".js-swatch").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.groupId === currentGroupId);
  });

  popover.removeAttribute("hidden");

  // Position relative to anchor
  const anchorRect = anchor.getBoundingClientRect();
  let top = anchorRect.bottom + 6;
  let left = anchorRect.left;
  const boxW = box.offsetWidth || 260;
  const boxH = box.offsetHeight || 180;
  if (left + boxW > window.innerWidth - 8) left = window.innerWidth - boxW - 8;
  if (top + boxH > window.innerHeight - 8) top = anchorRect.top - boxH - 6;
  box.style.top = `${top + window.scrollY}px`;
  box.style.left = `${left}px`;
}

function closePopover(): void {
  document.getElementById("task-popover")?.setAttribute("hidden", "");
  currentPopoverTaskId = null;
}

async function applyGroupChange(groupId: number | null): Promise<void> {
  if (currentPopoverTaskId === null) return;
  const node = document.querySelector<HTMLElement>(`[data-task-id="${currentPopoverTaskId}"]`);
  if (!node) return;

  const updateUrl = node.getAttribute("data-update-url") ?? "";
  const json = await postForm(updateUrl, new URLSearchParams({ group: groupId !== null ? String(groupId) : "" }));
  if (!json.ok) return;

  node.dataset.groupId = groupId !== null ? String(groupId) : "";

  const existingBadge = node.querySelector(".task-group-badge");
  if (groupId !== null) {
    const group = getGroupsData().find(g => g.id === groupId);
    if (group) {
      if (existingBadge) {
        (existingBadge as HTMLElement).style.setProperty("--group-color", group.color);
        existingBadge.textContent = group.name;
      } else {
        const badge = document.createElement("span");
        badge.className = "task-group-badge";
        badge.style.setProperty("--group-color", group.color);
        badge.textContent = group.name;
        node.querySelector(".task-title")?.insertAdjacentElement("beforebegin", badge);
      }
    }
  } else {
    existingBadge?.remove();
  }

  const groupsEl = document.getElementById("popover-groups");
  groupsEl?.querySelectorAll<HTMLElement>(".js-swatch").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.groupId === (groupId !== null ? String(groupId) : ""));
  });
}

// ─── Inline title editing ─────────────────────────────────────────────────────

function startTitleEdit(titleEl: HTMLElement): void {
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

// ─── DOM helpers ──────────────────────────────────────────────────────────────

function markNodes(ids: number[], status: "completed" | "discarded"): void {
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

function removeEmptyState(): void {
  document.getElementById("task-empty-state")?.remove();
}

function insertTaskHtml(html: string, parentId: number | null): void {
  const tree = document.getElementById("task-tree");
  if (!tree) return;
  removeEmptyState();

  if (parentId !== null) {
    const allChildren = Array.from(tree.querySelectorAll<HTMLElement>(`[data-parent-id="${parentId}"]`));
    const last = allChildren[allChildren.length - 1];
    if (last) { last.insertAdjacentHTML("afterend", html); return; }
    const parentNode = tree.querySelector<HTMLElement>(`[data-task-id="${parentId}"]`);
    if (parentNode) { parentNode.insertAdjacentHTML("afterend", html); return; }
  }
  tree.insertAdjacentHTML("beforeend", html);
  renumberTasks(tree);
}

function renumberTasks(tree: HTMLElement): void {
  let counter = 0;
  tree.querySelectorAll<HTMLElement>("[data-task-id]").forEach(node => {
    const numEl = node.querySelector<HTMLElement>(".task-order-num");
    if (numEl) {
      counter++;
      numEl.textContent = String(counter);
    }
  });
}

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

function initDragAndDrop(): void {
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
    tree.querySelectorAll(".dragging, .drop-before, .drop-after").forEach(el => {
      el.classList.remove("dragging", "drop-before", "drop-after");
    });
  });

  tree.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer!.dropEffect = "move";
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-task-id]");
    if (!target) return;
    tree.querySelectorAll(".drop-before, .drop-after").forEach(el => {
      el.classList.remove("drop-before", "drop-after");
    });
    const rect = target.getBoundingClientRect();
    target.classList.add(e.clientY < rect.top + rect.height / 2 ? "drop-before" : "drop-after");
  });

  tree.addEventListener("dragleave", (e) => {
    if (!tree.contains(e.relatedTarget as Node)) {
      tree.querySelectorAll(".drop-before, .drop-after").forEach(el => {
        el.classList.remove("drop-before", "drop-after");
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
    const descendants = getDomDescendants(tree, droppedId);
    const group = [draggedEl, ...descendants];

    const fragment = document.createDocumentFragment();
    group.forEach(el => fragment.appendChild(el));

    if (isBefore) {
      tree.insertBefore(fragment, target);
    } else {
      const targetDesc = getDomDescendants(tree, Number(target.dataset.taskId));
      const anchor = targetDesc.length ? targetDesc[targetDesc.length - 1] : target;
      tree.insertBefore(fragment, anchor.nextSibling);
    }

    tree.querySelectorAll(".dragging, .drop-before, .drop-after").forEach(el => {
      el.classList.remove("dragging", "drop-before", "drop-after");
    });
    renumberTasks(tree);

    const items = Array.from(tree.querySelectorAll<HTMLElement>("[data-task-id]")).map((el, i) => ({
      id: Number(el.dataset.taskId),
      order: i,
    }));
    await postForm(reorderUrl, new URLSearchParams({ items: JSON.stringify(items) }));
  });
}

// ─── Quick-add form ───────────────────────────────────────────────────────────

function initQuickAdd(): void {
  const form = document.getElementById("task-quick-add") as HTMLFormElement | null;
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = form.querySelector<HTMLInputElement>("input[name='title']");
    if (!input?.value.trim()) { input?.focus(); return; }

    const data = new FormData(form);
    data.set("scheduled_date", form.dataset.scheduledDate ?? "");

    const submitBtn = form.querySelector<HTMLButtonElement>("[type='submit']");
    if (submitBtn) submitBtn.disabled = true;

    const json = await postForm(form.dataset.createUrl!, data);

    if (submitBtn) submitBtn.disabled = false;

    if (json.ok) {
      insertTaskHtml(json.html, json.parent_id);
      input.value = "";
      input.focus();
    }
  });
}

// ─── Subtask inline add ───────────────────────────────────────────────────────

function createInlineForm(parentId: number, date: string, createUrl: string): HTMLFormElement {
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

// ─── Event delegation ─────────────────────────────────────────────────────────

function initTaskTreeEvents(): void {
  const tree = document.getElementById("task-tree");
  if (!tree) return;

  tree.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;

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

    // Add subtask
    if (target.classList.contains("js-add-subtask")) {
      const parentId = Number(target.getAttribute("data-task-id"));
      const date = target.getAttribute("data-date") ?? "";
      const createUrl = (document.getElementById("task-quick-add") as HTMLFormElement | null)
        ?.dataset.createUrl ?? "";

      const parentNode = tree.querySelector<HTMLElement>(`[data-task-id="${parentId}"]`);
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

// ─── Entry point ──────────────────────────────────────────────────────────────

export function initTasks(): void {
  initDiscardModal();
  initPopover();
  initQuickAdd();
  initTaskTreeEvents();
  initDragAndDrop();
}
