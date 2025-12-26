import React from 'react';

/**
 * Root component wrapper for accessibility enhancements
 * Adds skip-to-main-content link for keyboard navigation (WCAG 2.4.1)
 */
export default function Root({children}: {children: React.ReactNode}): JSX.Element {
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
