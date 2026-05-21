import { initDiscardModal } from "../modal";
import { initPopover } from "./popover";
import { initQuickAdd } from "./forms";
import { initTaskTreeEvents } from "./events";
import { initDragAndDrop } from "./drag-drop";
import { markNodes } from "./dom";
import { initNotes } from "./notes";

// ─── Entry point ──────────────────────────────────────────────────────────────

export function initTasks(): void {
  initDiscardModal((ids) => markNodes(ids, "discarded"));
  initPopover();
  initQuickAdd();
  initTaskTreeEvents();
  initDragAndDrop();
  initNotes();
}
