/**
 * Client module to add search landmark for accessibility (WCAG 2.4.1)
 * Wraps the Algolia search input in a search landmark role
 */

export function onRouteDidUpdate(): void {
  // Add search landmark to Algolia search container
  const addSearchLandmark = () => {
    const searchContainer = document.querySelector('.navbar__search');
    if (searchContainer && !searchContainer.hasAttribute('role')) {
      searchContainer.setAttribute('role', 'search');
      searchContainer.setAttribute('aria-label', 'Site search');
    }
  };

  // Run immediately and after a short delay (for dynamic content)
  addSearchLandmark();
  setTimeout(addSearchLandmark, 100);
}
