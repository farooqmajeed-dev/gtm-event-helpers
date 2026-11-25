# gtm-event-helpers

Small, dependency-free `dataLayer` helper functions for Google Tag Manager and GA4 tracking. Built to standardize outbound-link and scroll-milestone events across client sites.

## Included helpers

- `trackOutboundLinks()` — Automatically logs clicks on external `https://` links.
- `trackScrollMilestones([25, 50, 75, 90])` — Fires once per scroll depth threshold without spamming `dataLayer`.
