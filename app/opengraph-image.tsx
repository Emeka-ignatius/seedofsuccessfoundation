import { ImageResponse } from "next/og";
import { ELEVATION_PARTS } from "@/components/holding/elevation-geometry";
import { charity } from "@/lib/site/charity";

export const alt = `${charity.hospitalName} is rising in Orlu. ${charity.name}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shared when someone posts the link in a parish newsletter or WhatsApp group, so it has to look deliberate.
// Rendered once at build time. Satori ships only a sans-serif; swap in Newsreader when the brand type is final.
//
// No photograph on purpose: the card is a PNG, and a photo made it 1.7 MB, which WhatsApp (and some other apps)
// will not preview. Flat colour and line work keep it to tens of kilobytes. Keep it under about 300 KB.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        color: "#f6ecda",
        background:
          "radial-gradient(90% 120% at 85% 110%, rgba(224,123,76,0.22), rgba(23,16,12,0) 60%), #17100c",
      }}
    >
      {/* The building sits in the bottom-right corner at 45% scale, below and clear of the text block. */}
      <svg
        width={540}
        height={162}
        viewBox="0 0 1200 360"
        style={{ position: "absolute", right: 24, bottom: 0 }}
      >
        {ELEVATION_PARTS.map((p) => (
          <path
            key={p.id}
            d={p.d}
            fill={p.tinted ? "rgba(236,220,192,0.07)" : "none"}
            stroke="#ecdcc0"
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>

      <div
        style={{ display: "flex", flexDirection: "column", padding: "64px 72px", width: "100%" }}
      >
        <div style={{ fontSize: 26, letterSpacing: 1, color: "#d3c4aa" }}>{charity.name}</div>
        <div
          style={{
            marginTop: 28,
            fontSize: 92,
            lineHeight: 1.02,
            fontWeight: 700,
            letterSpacing: -2,
            maxWidth: 860,
          }}
        >
          {`${charity.hospitalName} is rising in Orlu.`}
        </div>
        <div style={{ marginTop: 26, fontSize: 30, color: "#d3c4aa", maxWidth: 760 }}>
          {charity.need}
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 22, color: "#d3c4aa" }}>
          {`${charity.registration}, no. ${charity.registeredCharityNumber}`}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
