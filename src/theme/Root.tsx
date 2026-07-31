import React, { type ReactNode } from 'react';
import AnalyticsEventTracker from '@site/src/components/AnalyticsEventTracker';
import FloatingActions from '@site/src/components/FloatingActions';

export default function Root({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      {children}
      <AnalyticsEventTracker />
      <FloatingActions />
    </>
  );
}