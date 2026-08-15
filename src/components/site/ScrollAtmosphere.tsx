import { useIsMobile } from "../ui/useIsMobile";
import { DesktopAtmosphere } from "../ui/DesktopAtmosphere";
import { MobileAtmosphere } from "../ui/MobileAtmosphere";

/**
 * Picks a desktop or mobile atmosphere implementation based on viewport.
 *
 * We fully unmount the unused tree rather than hiding it with CSS, so
 * mobile Safari never even creates the heavier blurred/animated layers
 * that were crashing iOS WebKit — a hidden `motion.div` still runs its
 * `useScroll` / `useTransform` subscriptions on every scroll frame, so
 * a CSS-only split wouldn't fully solve the crash.
 *
 * Drop-in replacement: same export name and same import path as the
 * original component, so nothing else in the app needs to change.
 */
export function ScrollAtmosphere() {
  const isMobile = useIsMobile();

  // Render nothing until we know the viewport, to avoid a flash of the
  // wrong (heavier) version on mobile during hydration.
  if (isMobile === null) return null;

  return isMobile ? <MobileAtmosphere /> : <DesktopAtmosphere />;
}
