import React, { useEffect } from 'react';

/**
 * Root component wrapper for accessibility enhancements
 * - Adds skip-to-main-content link for keyboard navigation (WCAG 2.4.1)
 * - Fixes Algolia search input aria-label mismatch (WCAG 2.5.3)
 */
export default function Root({children}: {children: React.ReactNode}): JSX.Element {
  // Fix Algolia search input aria-label to match visible placeholder exactly (WCAG 2.5.3)
  useEffect(() => {
    const fixSearchAccessibility = () => {
      const searchInput = document.querySelector('.navbar__search-input, .search-bar, #search_input_react') as HTMLInputElement;
      if (searchInput) {
        // aria-label MUST match the visible placeholder text exactly
        const placeholder = searchInput.getAttribute('placeholder') || 'Search';
        searchInput.setAttribute('aria-label', placeholder);
      }
    };

    // Run immediately and also observe for dynamic changes
    fixSearchAccessibility();
    
    // Use MutationObserver to catch dynamically loaded search
    const observer = new MutationObserver(() => {
      fixSearchAccessibility();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a 
        href="#__docusaurus_skipToContent__" 
        className="skip-to-main-content"
      >
        Skip to main content
      </a>
      {children}
    </>
  );
}
