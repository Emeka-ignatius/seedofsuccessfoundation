/** The opening of an inner page: a large serif title, and the lead paragraph. */
export function PageHead({
  title,
  lead,
  children,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="sx-section sx-page-head" aria-labelledby="page-title">
      <div className="sx-wrap">
        <h1 id="page-title" className="sx-h1">
          {title}
        </h1>
        {lead ? <p className="sx-lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
