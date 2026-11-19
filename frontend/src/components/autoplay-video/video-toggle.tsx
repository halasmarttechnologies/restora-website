import type { VideoToggleProps } from "./autoplay-video.types";

/** Small round play / pause button laid over a video. */
export function VideoToggle({ playing, onToggle, className = "" }: VideoToggleProps) {
  return (
    <button
      type="button"
      aria-label={playing ? "Pause video" : "Play video"}
      onClick={onToggle}
      className={`grid size-9 cursor-pointer place-items-center rounded-full bg-brand-black/45 text-brand-white backdrop-blur-sm transition-colors hover:bg-brand-black/70 ${className}`}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5 fill-current">
        {playing ? (
          <path d="M4 2.5h2.5v11H4zM9.5 2.5H12v11H9.5z" />
        ) : (
          <path d="M4.5 2.5v11l9-5.5z" />
        )}
      </svg>
    </button>
  );
}
