import type { AnnouncementBarProps } from "./announcement-bar.types";

export function AnnouncementBar({ message }: AnnouncementBarProps) {
  return (
    <aside
      aria-label="Announcement"
      className="rounded-md bg-brand-black px-4 py-[11px] text-center text-[11px] leading-[14px] tracking-[0.02em] text-brand-white uppercase"
    >
      <p>{message}</p>
    </aside>
  );
}
