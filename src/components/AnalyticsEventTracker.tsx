import React, { useEffect } from 'react';
import { trackEvent } from '@site/src/utils/analytics';

export default function AnalyticsEventTracker(): null {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const target = event.target.closest<HTMLElement>('[data-analytics-event]');
      const eventName = target?.dataset.analyticsEvent;
      if (!target || !eventName) {
        return;
      }

      trackEvent(eventName, {
        event_label: target.dataset.analyticsLabel || 'unknown',
        cta_location: target.dataset.analyticsLocation || window.location.pathname,
        link_url: target instanceof HTMLAnchorElement ? target.href : '',
      });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}