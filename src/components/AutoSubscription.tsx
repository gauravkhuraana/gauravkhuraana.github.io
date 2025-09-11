import React from 'react';
import { useLocation } from '@docusaurus/router';
import SimpleSubscriptionBox from '@site/src/components/SimpleSubscriptionBox';
import '@site/src/css/custom.css';

const AutoSubscription = () => {
  const location = useLocation();
  
  // Define pages where we want to show subscription forms
  const shouldShowSubscription = 
    location.pathname.startsWith('/docs/') || 
    location.pathname.startsWith('/blog/') ||
    location.pathname === '/';
  
  // Skip certain pages (use Set for faster lookup)
  const skipPages = new Set([
    '/docs/intro',
    '/feedback',
    '/docs/category/',
  ]);
  const shouldSkip = Array.from(skipPages).some(skipPath => location.pathname.startsWith(skipPath));
  
  if (!shouldShowSubscription || shouldSkip) {
    return null;
  }
  
  // Different titles based on section (no emojis, actionable, globally relevant)
  let title = "Get Weekly Updates";
  let description = "Join thousands of professionals for actionable testing and automation insights.";

  if (location.pathname.includes('/docs/AI/')) {
    title = "Master AI Testing";
    description = "Receive weekly AI testing strategies and practical guidance.";
  } else if (location.pathname.includes('/docs/Automation/')) {
    title = "Master Automation";
    description = "Get hands-on automation tips and framework-agnostic guides every week.";
  } else if (location.pathname.includes('/docs/API/')) {
    title = "Master API Testing";
    description = "Learn API testing strategies and HTTP best practices delivered weekly.";
  } else if (location.pathname.includes('/blog/')) {
    title = "Stay Updated";
    description = "Never miss new insights on testing, automation, and DevOps.";
  }
  
  return (
    <div className="auto-subscription-box">
      <SimpleSubscriptionBox 
        title={title}
        description={description}
      />
    </div>
  );
};

export default AutoSubscription;
