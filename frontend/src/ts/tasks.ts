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
    const discardUrl = taskNode?.querySelector<HTMLElement>(".js-discard-trigger")?.getAttribute("data-discard-url") ?? "";

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

// ─── DOM helpers ──────────────────────────────────────────────────────────────

function markNodes(ids: number[], status: "completed" | "discarded"): void {
  for (const id of ids) {
    const node = document.querySelector<HTMLElement>(`[data-task-id="${id}"]`);
    if (!node) continue;
    node.classList.add("task-done");
    node.querySelector(".task-actions")?.remove();
    const badge = status === "completed" ? "✓" : "✗";
    const cls = status === "completed" ? "task-status-completed" : "task-status-discarded";
    node.querySelector(".task-title")?.insertAdjacentHTML(
      "afterend",
      `<span class="task-status-badge ${cls}">${badge}</span>`,
    );
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
    const parentNode = tree.querySelector<HTMLElement>(`[data-task-id="${parentId}"]`);
    if (parentNode) {
      // Insert right after the parent node
      parentNode.insertAdjacentHTML("afterend", html);
      return;
    }
  }
  tree.insertAdjacentHTML("beforeend", html);
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
      const parentNode = document.querySelector<HTMLElement>(`[data-task-id="${parentId}"]`);
      form.insertAdjacentHTML("beforebegin", json.html);
      form.remove();
      removeEmptyState();
    }
  });

  form.querySelector(".js-cancel-inline")?.addEventListener("click", () => form.remove());
  return form;
}

// ─── Event delegation for task tree ──────────────────────────────────────────

function initTaskTreeEvents(): void {
  const tree = document.getElementById("task-tree");
  if (!tree) return;

  tree.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;

    // Complete
    if (target.classList.contains("js-complete-btn")) {
      const url = target.getAttribute("data-complete-url");
      if (!url) return;
      target.disabled = true;
      const json = await postForm(url, new URLSearchParams());
      if (json.ok) {
        markNodes(json.affected_ids, "completed");
      } else {
        target.disabled = false;
      }
    }

    // Discard trigger → open modal
    else if (target.classList.contains("js-discard-trigger")) {
      const taskId = Number(target.getAttribute("data-task-id"));
      const taskTitle = target.getAttribute("data-task-title") ?? "";
      openDiscardModal(taskId, taskTitle);
    }

    // Add subtask
    else if (target.classList.contains("js-add-subtask")) {
      const parentId = Number(target.getAttribute("data-task-id"));
      const date = target.getAttribute("data-date") ?? "";
      const createUrl = (document.getElementById("task-quick-add") as HTMLFormElement | null)
        ?.dataset.createUrl ?? "";

      const parentNode = tree.querySelector<HTMLElement>(`[data-task-id="${parentId}"]`);
      if (!parentNode) return;

      // Toggle: if form already open for this parent, remove it
      const existing = parentNode.nextElementSibling;
      if (existing?.classList.contains("task-inline-add")) {
        existing.remove();
        return;
      }

      const form = createInlineForm(parentId, date, createUrl);
      parentNode.insertAdjacentElement("afterend", form);
      form.querySelector<HTMLInputElement>("input")?.focus();
    }
  });
}

// ─── Entry point ──────────────────────────────────────────────────────────────

export function initTasks(): void {
  initDiscardModal();
  initQuickAdd();
  initTaskTreeEvents();
}
