// Sends a GA4 event. No-ops when GA isn't loaded (no measurement ID, ad blockers, SSR).
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
