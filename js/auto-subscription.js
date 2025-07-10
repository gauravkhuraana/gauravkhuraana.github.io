// Auto-inject subscription forms
(function() {
  'use strict';
  
  // Wait for DOM to be ready with multiple checks
  function waitForDOM(callback) {
    if (document.readyState === 'complete') {
      setTimeout(callback, 100); // Small delay to ensure content is rendered
    } else if (document.readyState === 'interactive') {
      setTimeout(() => waitForDOM(callback), 200);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(callback, 100);
      });
    }
  }
  
  waitForDOM(initAutoSubscription);
    function initAutoSubscription() {
    // Skip if we're not on a docs or blog page
    const currentPath = window.location.pathname;
    console.log('Auto-subscription: Checking path:', currentPath);
    
    const shouldAddSubscription = 
      currentPath.startsWith('/docs/') || 
      currentPath.startsWith('/blog/');

    // Skip certain pages
    const skipPages = [
      '/docs/intro',
      '/feedback',
      '/docs/category/',
    ];

    const shouldSkip = skipPages.some(skipPath => currentPath.startsWith(skipPath));

    if (!shouldAddSubscription || shouldSkip) {
      console.log('Auto-subscription: Skipping injection for this page');
      return;
    }

    // Check if subscription already exists
    if (document.querySelector('.auto-subscription-injected')) {
      console.log('Auto-subscription: Form already exists on this page');
      return;
    }
      // Find the main content area with multiple fallback options
    const contentSelectors = [
      'main .container .col article',
      'main .container article', 
      'main .container .col',
      'main .container',
      'main article',
      'main .markdown',
      'main',
      '[role="main"]',
      '.main-wrapper'
    ];
    
    let mainContent = null;
    for (const selector of contentSelectors) {
      mainContent = document.querySelector(selector);
      if (mainContent) break;
    }

    if (!mainContent) {
      console.log('Auto-subscription: No suitable content container found');
      return;
    }
    
    // Create subscription component
    const subscriptionHTML = createSubscriptionHTML(currentPath);
    
    // Find insertion point (before "Connect With Me" or "Additional Resources" sections)
    const connectHeading = Array.from(mainContent.querySelectorAll('h2, h3')).find(h => 
      h.textContent.includes('Connect With Me') || 
      h.textContent.includes('Additional Resources') ||
      h.textContent.includes('Connect') ||
      h.textContent.includes('Resources')
    );
      const subscriptionDiv = document.createElement('div');
    subscriptionDiv.className = 'auto-subscription-injected';
    subscriptionDiv.innerHTML = subscriptionHTML;

    if (connectHeading) {
      console.log('Auto-subscription: Injecting before connect heading');
      connectHeading.parentNode.insertBefore(subscriptionDiv, connectHeading);
    } else {
      console.log('Auto-subscription: Injecting at end of content');
      // Add at the end of the main content
      mainContent.appendChild(subscriptionDiv);
    }
    
    console.log('Auto-subscription: Form successfully injected!');
  }
  
  function createSubscriptionHTML(currentPath) {
    let title = "📧 Get Weekly Updates";
    let description = "Join thousands of professionals getting practical testing and automation insights.";
    
    if (currentPath.includes('/docs/AI/')) {
      title = "🤖 Master AI Testing";
      description = "Get weekly AI testing insights and cutting-edge strategies.";
    } else if (currentPath.includes('/docs/Automation/')) {
      title = "🚀 Master Automation";
      description = "Get practical automation tips and framework guides weekly.";
    } else if (currentPath.includes('/docs/API/')) {
      title = "🔗 Master API Testing";
      description = "Get API testing strategies and HTTP guides delivered weekly.";
    } else if (currentPath.includes('/blog/')) {
      title = "📬 Stay Updated";
      description = "Never miss new testing insights and automation tips.";
    }
    
    return `
      <div style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 8px;
        padding: 1.5rem;
        margin: 2rem 0;
        text-align: center;
        color: white;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      ">
        <h4 style="
          margin-bottom: 0.5rem; 
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
        ">${title}</h4>
        
        <p style="
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
        ">${description}</p>
        
        <iframe 
          width="100%" 
          height="320" 
          src="https://2daf0ef4.sibforms.com/serve/MUIFAPwOqMKfs4g6YMNkM4TROCaQJWPpM3m_meM7DPzmPrwffSbjh5hUP2k1H3bPQKZUtYUzKx--yH7KqZ0hWcAdo1XwL-4FSlQqUfynSE2MU46VaQnqnJEbDARiZ3H0YF1ssZl8maKfXymbVWkHAdzLtJzfM-ioJ1HHTe82sQwuRHRu-dwV9MFxUJ893S4yemAnN1PtOzWtpuAl" 
          frameborder="0" 
          scrolling="no" 
          allowfullscreen 
          style="
            border: none;
            border-radius: 6px;
            background-color: rgba(255, 255, 255, 0.1);
            min-height: 320px;
            max-height: 320px;
            overflow: hidden;
            display: block;
          "
          title="Subscribe to Updates"
        ></iframe>
      </div>
    `;
  }
  
  // Re-run on route changes (for SPA navigation) with improved detection
  let lastUrl = location.href;
  let timeoutId = null;
  
  function handleRouteChange() {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      
      // Clear previous timeout
      if (timeoutId) clearTimeout(timeoutId);
      
      // Wait for content to load, then try injection
      timeoutId = setTimeout(() => {
        initAutoSubscription();
      }, 800); // Longer delay for SPA navigation
    }
  }
  
  // Multiple ways to detect route changes
  new MutationObserver(handleRouteChange).observe(document, { 
    subtree: true, 
    childList: true 
  });
  
  // Also listen to popstate for back/forward navigation
  window.addEventListener('popstate', handleRouteChange);
  
  // And periodically check for URL changes (fallback)
  setInterval(handleRouteChange, 2000);
  
})();
