import { useCallback, useEffect, useState } from 'react';
import type { TraitId } from '../types';

/** Tabs of the signed-in app area. */
export type NavTab = 'home' | 'traits' | 'analytics' | 'profile';

/**
 * Something a visitor asked to do. Used both to run the action and, when the
 * visitor is signed out, to remember it across the sign-in screen so they are
 * returned to exactly what they picked.
 */
export type Intent =
  | { kind: 'tab'; tab: NavTab }
  | { kind: 'quiz'; traitId: TraitId }
  | { kind: 'mbti' }
  | { kind: 'mood' };

export type OverlayIntent = Exclude<Intent, { kind: 'tab' }>;

/** Hash routes: `#/` is the public homepage, the rest are listed here. */
export type Route = 'landing' | 'login' | 'signup' | 'dashboard' | 'traits' | 'analytics' | 'profile';

const ROUTES: Route[] = ['login', 'signup', 'dashboard', 'traits', 'analytics', 'profile'];

const TAB_TO_ROUTE: Record<NavTab, Route> = {
  home: 'dashboard',
  traits: 'traits',
  analytics: 'analytics',
  profile: 'profile',
};

export const tabToRoute = (tab: NavTab): Route => TAB_TO_ROUTE[tab];

export const routeToTab = (route: Route): NavTab | null => {
  const entry = (Object.entries(TAB_TO_ROUTE) as [NavTab, Route][]).find(([, r]) => r === route);
  return entry ? entry[0] : null;
};

export const isAuthRoute = (route: Route) => route === 'login' || route === 'signup';

function parseRoute(hash: string): Route {
  const name = hash.replace(/^#\/?/, '').split(/[/?]/)[0];
  return (ROUTES as string[]).includes(name) ? (name as Route) : 'landing';
}

const toHash = (route: Route) => (route === 'landing' ? '#/' : `#/${route}`);

/**
 * Minimal hash router. `navigate(route, true)` replaces the current history
 * entry (used for redirects, so Back never lands on a stale sign-in page).
 */
export function useHashRoute(): [Route, (route: Route, replace?: boolean) => void] {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((next: Route, replace = false) => {
    const target = toHash(next);
    if (replace) {
      window.history.replaceState(null, '', target);
      setRoute(next);
      window.scrollTo(0, 0);
    } else if (parseRoute(window.location.hash) !== next) {
      window.location.hash = target;
    }
  }, []);

  return [route, navigate];
}
