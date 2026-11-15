/** The opening of an inner page: dateline-style eyebrow, a large serif title, and the lead paragraph. */
export function PageHead({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="sx-section sx-page-head" aria-labelledby="page-title">
      <div className="sx-wrap">
        <p className="sx-eyebrow">
          <span>{eyebrow}</span>
        </p>
        <h1 id="page-title" className="sx-h1">
          {title}
        </h1>
        {lead ? <p className="sx-lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
