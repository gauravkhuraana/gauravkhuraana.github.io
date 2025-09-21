// Algolia Crawler Configuration for gauravkhurana.in
// This should be configured in your Algolia Dashboard, NOT in your Docusaurus config
// URL: https://www.algolia.com/apps/VKK8T551TZ/crawler

new Crawler({
  appId: 'VKK8T551TZ',
  apiKey: 'YOUR_ADMIN_API_KEY', // This should be your Admin API Key, not the public search key
  rateLimit: 8,
  maxDepth: 10,
  startUrls: ['https://gauravkhurana.in/'],
  sitemaps: ['https://gauravkhurana.in/sitemap.xml'],
  ignoreCanonicalTo: true, // IMPORTANT: Let Algolia handle canonical URLs automatically
  ignoreQueryParams: ['utm_source', 'utm_medium', 'utm_campaign', 'fbclid'], // Ignore tracking params
  discoveryPatterns: ['https://gauravkhurana.in/**'],
  exclusionPatterns: [
    // Exclude admin/internal pages
    'https://gauravkhurana.in/admin/**',
    'https://gauravkhurana.in/.well-known/**',
    // Exclude feed files and search page
    'https://gauravkhurana.in/**/rss.xml',
    'https://gauravkhurana.in/**/atom.xml',
    'https://gauravkhurana.in/search',
  ],
  actions: [
    {
      indexName: 'gauravkhurana_in_vkk8t551tz_pages',
      pathsToMatch: ['https://gauravkhurana.in/**'],
      recordExtractor: ({ $, helpers, url }) => {
        // Skip if this is a redirect page (no main content)
        if ($('article').length === 0 && $('.main-wrapper').length === 0 && $('main').length === 0) {
          return [];
        }

        // Priority order: deepest active sub list header -> navbar active item -> 'Documentation'
        const lvl0 =
          $(
            '.menu__link.menu__link--sublist.menu__link--active, .navbar__item.navbar__link--active'
          )
            .last()
            .text() || 'Documentation';

        return helpers.docsearch({
          recordProps: {
            lvl0: {
              selectors: '',
              defaultValue: lvl0,
            },
            lvl1: ['header h1', 'article h1', '.hero__title'],
            lvl2: 'article h2',
            lvl3: 'article h3',
            lvl4: 'article h4',
            lvl5: 'article h5, article td:first-child',
            lvl6: 'article h6',
            content: 'article p, article li, article td:last-child, .hero__subtitle',
          },
          indexHeadings: true,
          aggregateContent: true,
          recordVersion: 'v3',
        });
      },
    },
  ],
  initialIndexSettings: {
    gauravkhurana_in_vkk8t551tz_pages: {
      attributesForFaceting: [
        'type',
        'lang',
        'language',
        'version',
        'docusaurus_tag',
      ],
      attributesToRetrieve: [
        'hierarchy',
        'content',
        'anchor',
        'url',
        'url_without_anchor',
        'type',
      ],
      attributesToHighlight: ['hierarchy', 'content'],
      attributesToSnippet: ['content:10'],
      camelCaseAttributes: ['hierarchy', 'content'],
      searchableAttributes: [
        'unordered(hierarchy.lvl0)',
        'unordered(hierarchy.lvl1)',
        'unordered(hierarchy.lvl2)',
        'unordered(hierarchy.lvl3)',
        'unordered(hierarchy.lvl4)',
        'unordered(hierarchy.lvl5)',
        'unordered(hierarchy.lvl6)',
        'content',
      ],
      distinct: true,
      attributeForDistinct: 'url',
      customRanking: [
        'desc(weight.pageRank)',
        'desc(weight.level)',
        'asc(weight.position)',
      ],
      ranking: [
        'words',
        'filters',
        'typo',
        'attribute',
        'proximity',
        'exact',
        'custom',
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: '</span>',
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: 'allOptional',
      separatorsToIndex: '_',
    },
  },
});