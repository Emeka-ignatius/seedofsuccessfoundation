import { BuildProgress } from "./build-progress";
import { Hero } from "./hero";
import { FinalCta, GetInvolved, Need, Newsletter, OurWork, TrustRow, Voices } from "./sections";
import { SiteShell } from "./shell";
import { TwoCommunities } from "./two-communities";

/** The full home page, in the order of PRD §4.1. Shown when SITE_MODE=live; the holding page otherwise. */
export function Home() {
  return (
    <SiteShell>
      <Hero />
      <Need />
      <TwoCommunities />
      <BuildProgress />
      <OurWork />
      <Voices />
      <GetInvolved />
      <TrustRow />
      <Newsletter />
      <FinalCta />
    </SiteShell>
  );
}
