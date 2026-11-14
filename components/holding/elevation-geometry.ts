// STAND-IN elevation of St Perpetua Hospital, drawn for the holding page.
// This is NOT the architect's drawing. It is a faithful-in-spirit outline (symmetrical, three-storey centre
// block with a pedimented portico beneath a cross, two-storey wings) to be replaced with a trace of the real
// elevation by Ifeanyi Achugasim when the client supplies it. Tracked in docs/IMPLEMENTATION_PLAN.md.
//
// Coordinate space: viewBox 0 0 1200 360, ground at y = 340, axis of symmetry at x = 600.

export interface ElevationPart {
  id: string;
  d: string;
  /** Seconds before this part starts drawing, and how long it takes. The whole drawing settles in ~2.7s. */
  delay: number;
  duration: number;
  /** The walls get a faint tint once drawn, so the outline "settles" into a solid. */
  tinted?: boolean;
}

const W = 26;
const H = 34;
const win = (centreX: number, top: number) => `M${centreX - W / 2} ${top}h${W}v${H}h${-W}z`;
const row = (centres: number[], top: number) => centres.map((c) => win(c, top)).join("");

const WING_CENTRES = [160, 220, 280, 340, 400, 800, 860, 920, 980, 1040];
const BLOCK_CENTRES = [480, 540, 600, 660, 720];
// The middle row skips the centre: the portico's pediment rises into that space.
const BLOCK_MIDDLE_CENTRES = [480, 540, 660, 720];
const GROUND_FLANKS = [466, 506, 694, 734];

export const ELEVATION_PARTS: readonly ElevationPart[] = [
  { id: "ground", d: "M0 340H1200", delay: 0, duration: 0.9 },
  {
    id: "walls",
    d: "M120 340V200H440V110H480L600 58L720 110H760V200H1080V340",
    delay: 0.25,
    duration: 1.5,
    tinted: true,
  },
  {
    id: "portico",
    d: "M548 340V256M652 340V256M536 256H664M542 256L600 226L658 256",
    delay: 1.1,
    duration: 0.8,
  },
  { id: "door", d: "M584 340V300a16 16 0 0 1 32 0V340", delay: 1.4, duration: 0.6 },
  {
    id: "windows-ground",
    d: row([...WING_CENTRES, ...GROUND_FLANKS], 286),
    delay: 1.0,
    duration: 0.9,
  },
  {
    id: "windows-middle",
    // Wings have two storeys (upper row at 222); the centre block has three (middle row at 205, top row below).
    d: row(WING_CENTRES, 222) + row(BLOCK_MIDDLE_CENTRES, 205),
    delay: 1.3,
    duration: 0.9,
  },
  {
    id: "windows-top",
    d: row(BLOCK_CENTRES, 128) + "M591 92a9 9 0 1 0 18 0a9 9 0 1 0 -18 0",
    delay: 1.6,
    duration: 0.9,
  },
  { id: "cross", d: "M600 58V26M587 40H613", delay: 2.0, duration: 0.7 },
];
