import { postForm } from "./utils";

// ─── Generic confirm modal with reason textarea ───────────────────────────────

let discardModal: HTMLElement | null = null;
let discardTaskId: number | null = null;
let discardUrl: string = "";
let onDiscardSuccess: ((affectedIds: number[]) => void) | null = null;

export function initDiscardModal(onSuccess: (affectedIds: number[]) => void): void {
  onDiscardSuccess = onSuccess;
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
    discardUrl = "";
    if (reasonEl) reasonEl.value = "";
    if (errorEl) errorEl.setAttribute("hidden", "");
  };

  cancelBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && discardModal && !discardModal.hasAttribute("hidden")) close();
  });

  confirmBtn?.addEventListener("click", async () => {
    if (!discardTaskId || !discardUrl) return;
    const reason = reasonEl?.value.trim() ?? "";
    if (!reason) {
      if (errorEl) { errorEl.textContent = "Cal un motiu."; errorEl.removeAttribute("hidden"); }
      reasonEl?.focus();
      return;
    }

    confirmBtn.disabled = true;
    const json = await postForm(discardUrl, new URLSearchParams({ reason }));
    confirmBtn.disabled = false;

    if (json.ok) {
      onDiscardSuccess?.(json.affected_ids);
      close();
    } else {
      if (errorEl) { errorEl.textContent = json.error ?? "Error."; errorEl.removeAttribute("hidden"); }
    }
  });
}

export function openDiscardModal(taskId: number, taskTitle: string, url: string): void {
  if (!discardModal) return;
  discardTaskId = taskId;
  discardUrl = url;
  const titleEl = discardModal.querySelector<HTMLElement>("#modal-task-title");
  if (titleEl) titleEl.textContent = taskTitle;
  const reasonEl = discardModal.querySelector<HTMLTextAreaElement>("#modal-reason");
  if (reasonEl) reasonEl.value = "";
  const errorEl = discardModal.querySelector<HTMLElement>("#modal-error");
  if (errorEl) errorEl.setAttribute("hidden", "");
  discardModal.removeAttribute("hidden");
  reasonEl?.focus();
}
