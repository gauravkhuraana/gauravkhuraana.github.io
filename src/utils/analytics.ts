export type AnalyticsParameters = Record<string, string | number | boolean>;

type UmamiTracker = {
  track: (eventName: string, eventData?: AnalyticsParameters) => void;
};

declare global {
  interface Window {
    umami?: UmamiTracker;
  }
}

// Umami rejects event names longer than 50 characters.
const maxEventNameLength = 50;

export function trackEvent(
  eventName: string,
  parameters: AnalyticsParameters = {},
): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.umami?.track(eventName.slice(0, maxEventNameLength), parameters);
}