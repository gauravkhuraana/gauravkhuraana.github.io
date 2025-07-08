import React from 'react';
import { useLocation } from '@docusaurus/router';
import SimpleSubscriptionBox from '@site/src/components/SimpleSubscriptionBox';

const AutoSubscription = () => {
  const location = useLocation();
  
  // Define pages where we want to show subscription forms
  const shouldShowSubscription = 
    location.pathname.startsWith('/docs/') || 
    location.pathname.startsWith('/blog/') ||
    location.pathname === '/';
  
  // Skip certain pages
  const skipPages = [
    '/docs/intro',
    '/feedback',
    '/docs/category/',
  ];
  
  const shouldSkip = skipPages.some(skipPath => location.pathname.startsWith(skipPath));
  
  if (!shouldShowSubscription || shouldSkip) {
    return null;
  }
  
  // Different titles based on section
  let title = "📧 Get Weekly Updates";
  let description = "Join thousands of professionals getting practical testing and automation insights.";
  
  if (location.pathname.includes('/docs/AI/')) {
    title = "🤖 Master AI Testing";
    description = "Get weekly AI testing insights and cutting-edge strategies.";
  } else if (location.pathname.includes('/docs/Automation/')) {
    title = "🚀 Master Automation";
    description = "Get practical automation tips and framework guides weekly.";
  } else if (location.pathname.includes('/docs/API/')) {
    title = "🔗 Master API Testing";
    description = "Get API testing strategies and HTTP guides delivered weekly.";
  } else if (location.pathname.includes('/blog/')) {
    title = "📬 Stay Updated";
    description = "Never miss new testing insights and automation tips.";
  }
  
  return (
    <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
      <SimpleSubscriptionBox 
        title={title}
        description={description}
      />
    </div>
  );
};

export default AutoSubscription;
