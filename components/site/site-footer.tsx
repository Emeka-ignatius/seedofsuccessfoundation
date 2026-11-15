import Link from "next/link";
import { charity } from "@/lib/site/charity";
import { navigation } from "@/lib/site/content";

export function SiteFooter() {
  return (
    <footer className="sx-footer">
      <div className="sx-wrap sx-footer-grid">
        <div>
          <p className="sx-footer-name">{charity.name}</p>
          <p>
            {charity.registration}, no.{" "}
            <span className="sx-nowrap">{charity.registeredCharityNumber}</span>.
          </p>
          {charity.registeredAddress ? <p>{charity.registeredAddress}</p> : null}
        </div>

        <nav aria-label="Footer">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/donate">Donate</Link>
            </li>
          </ul>
        </nav>

        <div>
          {charity.contactEmail ? (
            <p>
              <a href={`mailto:${charity.contactEmail}`}>{charity.contactEmail}</a>
            </p>
          ) : null}
          {charity.phone ? <p>{charity.phone}</p> : null}
          <p className="sx-footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
