import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 768px)";

/**
 * Detects mobile / small viewports so the app can mount a lighter
 * atmosphere component tree entirely, instead of hiding the heavy one with
 * CSS (`dark:hidden`, `md:hidden`, etc).
 *
 * This matters because Framer Motion's `useScroll` / `useTransform`
 * subscriptions keep running on every scroll frame even for elements that
 * are `display: none`. A CSS-only split still pays the JS + style-recalc
 * cost on mobile; actually unmounting the desktop tree avoids that
 * completely, which is what makes the difference on lower-powered devices.
 */
export function useIsMobile() {
  // Start as `null` so we render nothing until we know the viewport —
  // this avoids a flash of the wrong (heavier) tree during hydration.
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
