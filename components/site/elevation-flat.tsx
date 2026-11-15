import { ELEVATION_PARTS } from "@/components/holding/elevation-geometry";

/**
 * The hospital's line drawing (the holding page's stand-in elevation), complete and still, in the current text
 * colour. The one recurring illustration of the brand: it closes the home page and the About page the way it opens
 * the holding page. Decorative: the wrapper that places it carries aria-hidden.
 */
export function ElevationFlat() {
  return (
    <svg className="sx-elev" viewBox="0 0 1200 360" aria-hidden="true" focusable="false">
      {ELEVATION_PARTS.map((p) => (
        <path
          key={p.id}
          d={p.d}
          fill={p.tinted ? "currentColor" : "none"}
          fillOpacity={p.tinted ? 0.05 : undefined}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
