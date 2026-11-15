import Link from "next/link";
import { charity } from "@/lib/site/charity";
import { navigation } from "@/lib/site/content";

/**
 * Sticky header: the wordmark, the pages, and Donate always within reach (PRD §5). No logo yet, so the name is set in
 * type; swap in the logo when the designer delivers it. Below 900px the pages fold into a <details> menu, which needs
 * no JavaScript and is keyboard- and screen-reader-operable by default.
 */
export function SiteHeader() {
  return (
    <header className="sx-header">
      <div className="sx-wrap sx-header-inner">
        <Link href="/" className="sx-wordmark">
          {charity.name}
        </Link>

        <nav aria-label="Main" className="sx-nav">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sx-header-actions">
          <Link href="/donate" className="sx-btn sx-btn-primary sx-btn-compact">
            Donate
          </Link>
          <details className="sx-menu">
            <summary>
              <span className="sx-sr">Menu</span>
              <span className="sx-menu-icon" aria-hidden="true" />
            </summary>
            <nav aria-label="Main (menu)" className="sx-menu-panel">
              <ul>
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
