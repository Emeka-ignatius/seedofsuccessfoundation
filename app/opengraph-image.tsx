import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ELEVATION_PARTS } from "@/components/holding/elevation-geometry";
import { charity } from "@/lib/site/charity";

export const alt = `${charity.hospitalName} is rising in Orlu. ${charity.name}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Shared when someone posts the link in a parish newsletter or WhatsApp group, so it has to look deliberate.
// Rendered once at build time. Satori ships only a sans-serif; swap in Newsreader when the brand type is final.
async function photoDataUri(): Promise<string> {
  "use cache"; // a plain string, so it can be cached; this keeps the whole image static (built once, not per crawler)
  const photo = await readFile(join(process.cwd(), "public", "media", "holding-bg.jpg"));
  return `data:image/jpeg;base64,${photo.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const photoSrc = await photoDataUri();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#17100c",
        color: "#f6ecda",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoSrc}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          inset: 0,
          width: 1200,
          height: 630,
          objectFit: "cover",
          opacity: 0.45,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(23,16,12,0.45), rgba(23,16,12,0.92))",
        }}
      />

      <svg
        width={1200}
        height={360}
        viewBox="0 0 1200 360"
        style={{ position: "absolute", left: 0, bottom: 0 }}
      >
        {ELEVATION_PARTS.map((p) => (
          <path
            key={p.id}
            d={p.d}
            fill={p.tinted ? "rgba(236,220,192,0.07)" : "none"}
            stroke="#ecdcc0"
            strokeWidth={2.4}
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
