/**
 * Lightweight Google Tag Manager (dataLayer) event helpers.
 */
window.dataLayer = window.dataLayer || [];

export function pushEvent(eventName, params = {}) {
  window.dataLayer.push({ event: eventName, ...params });
}

export function trackOutboundLinks() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="http"]');
    if (!link || link.hostname === window.location.hostname) return;

    pushEvent('outbound_click', {
      link_url: link.href,
      link_text: link.textContent.trim().slice(0, 80)
    });
  });
}

export function trackScrollMilestones(thresholds = [25, 50, 75, 90]) {
  const fired = new Set();

  const onScroll = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((window.scrollY / docHeight) * 100);

    thresholds.forEach((mark) => {
      if (pct >= mark && !fired.has(mark)) {
        fired.add(mark);
        pushEvent('scroll_milestone', { percent_scrolled: mark });
      }
    });

    if (fired.size === thresholds.length) {
      window.removeEventListener('scroll', onScroll);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
