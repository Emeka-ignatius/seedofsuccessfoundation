/**
 * A visible marker for content the charity has not yet supplied (PRD §16). It exists so a reviewer can see where a
 * real quotation, statistic or photograph belongs, and so nothing is invented to fill the space. The matching launch
 * checks in tests/launch/ fail until the content exists and the marker is no longer rendered.
 */
export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <p className="sx-pending" role="note">
      <strong>Awaiting from the charity:</strong> {children}
    </p>
  );
}
