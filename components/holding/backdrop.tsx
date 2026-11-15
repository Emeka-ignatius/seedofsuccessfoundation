import Image from "next/image";

/**
 * The slowly changing background of the holding page: the palm grove at the Abajah site, crossfading between five
 * views. Canopy only, no people (see `scripts/media/holding.mjs` for why and for how each crop is made).
 *
 * Pure CSS: one layer per photograph, each running the same keyframes offset by its position, so it works with
 * JavaScript off and adds nothing to hydrate. `prefers-reduced-motion` shows the first photograph and nothing else.
 * The timing in `holding.css` (`@keyframes backdrop-cycle`) is written for exactly five layers.
 */
const SLIDES = [
  "/media/grove-1.jpg",
  "/media/grove-2.jpg",
  "/media/grove-3.jpg",
  "/media/grove-4.jpg",
  "/media/grove-5.jpg",
] as const;

export function Backdrop() {
  return (
    <div className="holding-backdrop" aria-hidden="true">
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          // Only the first is needed to paint; the rest are not shown for another nine seconds.
          priority={i === 0}
          fetchPriority={i === 0 ? "high" : "low"}
          // A cover-fitted, dimmed texture: on a phone the visible slice is wider than the screen, so ask for
          // a little more than the viewport, not 250vw (which made every device download the 3840px version).
          sizes="(max-width: 640px) 150vw, 100vw"
          className={i === 0 ? "holding-photo holding-photo-first" : "holding-photo"}
          style={{ "--slide": i } as React.CSSProperties}
        />
      ))}
      <div className="holding-scrim" />
    </div>
  );
}
