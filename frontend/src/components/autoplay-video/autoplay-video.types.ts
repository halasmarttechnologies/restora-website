export interface AutoplayVideoProps {
  readonly src: string;
  /** Image shown before playback. Without one, the video's first frame is shown instead. */
  readonly posterSrc?: string | undefined;
  /** Describes the video for screen readers. Leave out for purely decorative video. */
  readonly label?: string;
  /**
   * Above the fold (e.g. the hero): start downloading and playing immediately. Otherwise the
   * video loads lazily and plays only once it scrolls into view.
   */
  readonly eager?: boolean;
  /** Size and position of the <video> (e.g. `absolute inset-0 size-full object-cover`). */
  readonly className?: string;
  /** Position of the play / pause button (e.g. `absolute right-3 bottom-3`). */
  readonly controlClassName?: string;
}

export interface VideoToggleProps {
  readonly playing: boolean;
  readonly onToggle: () => void;
  readonly className?: string;
}
