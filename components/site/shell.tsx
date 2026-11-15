import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import "./site.css";

/** The frame every public page shares: skip link, sticky header, footer. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="sx">
      <a href="#main" className="sx-skip">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
