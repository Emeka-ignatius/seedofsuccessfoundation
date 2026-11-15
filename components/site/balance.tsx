/**
 * The see-saw: the client's own image for the relationship ("like a see-saw balancing Orlu and Plymouth", PRD §1).
 * A level beam on a fulcrum, each end carrying what that community gives the other: a cross for the priests Orlu has
 * sent to England since 2006, and the hospital that England is helping to build in Orlu.
 *
 * Decorative (aria-hidden): the meaning is carried by the text beside it. Pure CSS motion, written in site.css: as the
 * section scrolls into view the beam rocks and settles level, and each pan stays hanging level while its end moves.
 * Browsers without scroll-driven animation, and visitors who prefer reduced motion, simply see it level.
 *
 * Geometry (viewBox 1200 x 250): pivot (600, 100); beam ends (300, 100) and (900, 100), which sit over the centres
 * of the two columns below, so each pan is directly above its own community's text.
 */
export function Balance() {
  return (
    <svg className="sx-balance" viewBox="0 0 1200 250" aria-hidden="true" focusable="false">
      <path className="sx-b-line" d="M40 236H1160" />
      <path className="sx-b-line" d="M600 100L640 236H560Z" />

      <g className="sx-beam">
        <path className="sx-b-line sx-b-beam" d="M300 100H900" />

        {/* Left end: Orlu gives England. A cross: the priests who have served English parishes since 2006. */}
        <g transform="translate(300 100)">
          <g className="sx-pan">
            <path className="sx-b-line" d="M0 0L-72 62M0 0L72 62" />
            <path className="sx-b-line" d="M-86 62H86Q62 94 0 94Q-62 94 -86 62Z" />
            <path className="sx-b-line" d="M0 22V60M-13 35H13" />
          </g>
        </g>

        {/* Right end: England gives Orlu. The hospital, as the building is drawn on the holding page. */}
        <g transform="translate(900 100)">
          <g className="sx-pan">
            <path className="sx-b-line" d="M0 0L-72 62M0 0L72 62" />
            <path className="sx-b-line" d="M-86 62H86Q62 94 0 94Q-62 94 -86 62Z" />
            <path
              className="sx-b-line"
              d="M-30 60V38H30V60M-12 38L0 27L12 38M0 27V15M-5 20H5M-5 60V50H5V60"
            />
          </g>
        </g>
      </g>

      <circle className="sx-b-pivot" cx="600" cy="100" r="7" />
    </svg>
  );
}
