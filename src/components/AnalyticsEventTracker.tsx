import React, { useEffect } from 'react';
import { trackEvent } from '@site/src/utils/analytics';

type TrackedLink = {
  eventName: string;
  label: string;
};

function inferTrackedLink(anchor: HTMLAnchorElement): TrackedLink | null {
  const url = new URL(anchor.href);
  const hostname = url.hostname.replace(/^www\./, '');

  if (hostname === 'topmate.io') {
    return { eventName: 'topmate_cta_click', label: 'Topmate' };
  }

  if (hostname === 'udemy.com') {
    return { eventName: 'course_cta_click', label: 'Udemy' };
  }

  if (hostname === 'ko-fi.com') {
    return { eventName: 'support_cta_click', label: 'Ko-fi' };
  }

  if (hostname === 'youtube.com' || hostname === 'youtu.be') {
    return { eventName: 'youtube_cta_click', label: 'YouTube' };
  }

  if (url.origin === window.location.origin && url.pathname.startsWith('/docs/Mentorship/')) {
    return { eventName: 'mentorship_cta_click', label: 'Mentorship' };
  }

  if (url.origin === window.location.origin && url.pathname.startsWith('/newsletter')) {
    return { eventName: 'newsletter_cta_click', label: 'Newsletter' };
  }

  return null;
}

export default function AnalyticsEventTracker(): null {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const explicitTarget = event.target.closest<HTMLElement>('[data-analytics-event]');
      const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
      const inferredLink = !explicitTarget && anchor ? inferTrackedLink(anchor) : null;
      const eventName = explicitTarget?.dataset.analyticsEvent || inferredLink?.eventName;
      if (!eventName) {
        return;
      }

      const label = explicitTarget?.dataset.analyticsLabel ||
        anchor?.getAttribute('aria-label') ||
        anchor?.textContent?.replace(/\s+/g, ' ').trim() ||
        inferredLink?.label ||
        'unknown';

      trackEvent(eventName, {
        event_label: label.slice(0, 100),
        cta_location: explicitTarget?.dataset.analyticsLocation || window.location.pathname,
        link_url: anchor?.href || '',
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}