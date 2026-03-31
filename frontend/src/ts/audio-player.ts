import { Howl } from "howler";

let activePlayer: AudioPlayer | null = null;

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

class AudioPlayer {
  private el: HTMLElement;
  private howl: Howl | null = null;
  private rafId: number | null = null;
  private isDragging = false;
  private dragPct = 0;
  private pendingSeekTarget: number | null = null;

  private btn: HTMLButtonElement;
  private fill: HTMLElement;
  private track: HTMLElement;
  private currentEl: HTMLElement;
  private durationEl: HTMLElement;

  constructor(el: HTMLElement) {
    this.el = el;
    this.btn = el.querySelector<HTMLButtonElement>(".ap-btn")!;
    this.fill = el.querySelector<HTMLElement>(".ap-bar-fill")!;
    this.track = el.querySelector<HTMLElement>(".ap-bar")!;
    this.currentEl = el.querySelector<HTMLElement>(".ap-current")!;
    this.durationEl = el.querySelector<HTMLElement>(".ap-duration")!;

    this.btn.addEventListener("click", () => this.toggle());
    this.track.addEventListener("mousedown", (e) => this.onDragStart(e));
    this.track.addEventListener("touchstart", (e) => this.onDragStart(e), { passive: true });
  }

  private ensureHowl(): Howl {
    if (!this.howl) {
      this.howl = new Howl({
        src: [this.el.dataset.src!],
        html5: true,
        onload: () => {
          this.durationEl.textContent = formatTime(this.howl!.duration());
        },
        onend: () => this.reset(),
        onloaderror: () => {
          this.el.classList.remove("is-playing", "is-loading");
          this.el.classList.add("has-error");
        },
      });
    }
    return this.howl;
  }

  private toggle() {
    this.howl?.playing() ? this.pause() : this.play();
  }

  private play() {
    if (activePlayer && activePlayer !== this) activePlayer.pause();
    activePlayer = this;

    const h = this.ensureHowl();
    this.el.classList.add("is-playing", "is-loading");
    h.once("play", () => this.el.classList.remove("is-loading"));
    h.play();
    this.scheduleTick();
  }

  private pause() {
    this.howl?.pause();
    this.el.classList.remove("is-playing");
    this.cancelTick();
  }

  private onDragStart(e: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.applyDragVisuals(this.clientXFromEvent(e));

    const onMove = (e: MouseEvent | TouchEvent) => {
      this.applyDragVisuals(this.clientXFromEvent(e));
    };

    const onEnd = () => {
      this.isDragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchend", onEnd);

      const h = this.howl;
      if (h?.duration()) {
        const target = this.dragPct * h.duration();
        this.pendingSeekTarget = target;
        h.seek(target);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchend", onEnd);
  }

  private clientXFromEvent(e: MouseEvent | TouchEvent): number {
    return e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  }

  private applyDragVisuals(clientX: number) {
    const rect = this.track.getBoundingClientRect();
    this.dragPct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const dur = this.howl?.duration() || Number(this.el.dataset.duration) || 0;
    this.fill.style.width = `${this.dragPct * 100}%`;
    this.currentEl.textContent = formatTime(this.dragPct * dur);
  }

  private scheduleTick() {
    this.rafId = requestAnimationFrame(() => this.tick());
  }

  private cancelTick() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick() {
    const h = this.howl;
    if (!h) return;
    if (!this.isDragging) {
      const actual = h.seek() as number;
      const dur = h.duration() || 1;

      if (this.pendingSeekTarget !== null) {
        if (Math.abs(actual - this.pendingSeekTarget) < 1) {
          this.pendingSeekTarget = null;
        } else {
          // Audio hasn't reached the target yet — hold visuals at target
          this.fill.style.width = `${(this.pendingSeekTarget / dur) * 100}%`;
          this.currentEl.textContent = formatTime(this.pendingSeekTarget);
          this.scheduleTick();
          return;
        }
      }

      this.fill.style.width = `${(actual / dur) * 100}%`;
      this.currentEl.textContent = formatTime(actual);
    }
    this.scheduleTick();
  }

  private reset() {
    this.el.classList.remove("is-playing");
    this.cancelTick();
    this.fill.style.width = "0%";
    this.currentEl.textContent = "0:00";
    this.pendingSeekTarget = null;
    activePlayer = null;
  }
}

export function initAudioPlayers(): void {
  document.querySelectorAll<HTMLElement>(".audio-player[data-src]").forEach(
    (el) => new AudioPlayer(el)
  );
}
