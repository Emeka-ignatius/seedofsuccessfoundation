import type { CSSProperties } from "react";
import { ELEVATION_PARTS } from "./elevation-geometry";

/**
 * Line drawing of the hospital that draws itself on load (pure CSS, so it works without JavaScript).
 * Decorative: the headline already says what is being built. With `prefers-reduced-motion` it appears complete.
 * Animation rules live in holding.css (`.elev-line`).
 */
export function Elevation() {
  return (
    <div className="elevation-wrap" aria-hidden="true">
      <svg
        className="elevation"
        viewBox="0 0 1200 344"
        preserveAspectRatio="xMidYMax meet"
        focusable="false"
      >
        <defs>
          {/* The ground line fades out at both ends so it reads as horizon, not as a rule that starts mid-page. */}
          <linearGradient
            id="elev-ground-fade"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="1200"
            y2="0"
          >
            <stop offset="0" stopColor="#ecdcc0" stopOpacity="0" />
            <stop offset="0.18" stopColor="#ecdcc0" stopOpacity="1" />
            <stop offset="0.82" stopColor="#ecdcc0" stopOpacity="1" />
            <stop offset="1" stopColor="#ecdcc0" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ELEVATION_PARTS.map((part) => (
          <path
            key={part.id}
            d={part.d}
            pathLength={1}
            className={[
              "elev-line",
              part.tinted ? "elev-tinted" : "",
              part.id === "ground" ? "elev-ground" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ "--delay": `${part.delay}s`, "--dur": `${part.duration}s` } as CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}
