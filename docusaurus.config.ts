import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'gauravkhurana.in',
  tagline: 'Sharing is Caring',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://gauravkhuraana.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  deploymentBranch: 'main',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gauravkhuraana', // Usually your GitHub org/user name.
  projectName: 'gauravkhuraana.github.io', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    // Brevo tracking scripts
    {
      tagName: 'script',
      attributes: {
        src: 'https://cdn.brevo.com/js/sdk-loader.js',
        async: 'true',
      },
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `
        // Version: 2.0
        window.Brevo = window.Brevo || [];
        window.Brevo.push([
          "init",
          {
            client_key: "ebbcniife4txugcohv48c8pb"
          }
        ]);
      `,
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'brevo-integration',
        content: 'tracking',
      },
    },
    // Enhanced SEO meta tags
    {
      tagName: 'meta',
      attributes: {
        name: 'author',
        content: 'Gaurav Khurana',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'index, follow',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:site_name',
        content: 'Gaurav Khurana - Testing & Automation Practitioner',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image:width',
        content: '1200',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image:height',
        content: '630',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:creator',
        content: '@gauravkhuraana',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:site',
        content: '@gauravkhuraana',
      },
    },
    // JSON-LD structured data for better SEO
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Gaurav Khurana',
        jobTitle: 'Microsoft Test Consultant & Automation Practitioner',
        description: 'Passionate about sharing 15+ years of experience in software testing, automation, DevOps, and AI with the testing community.',
        url: 'https://gauravkhuraana.github.io',
        image: 'https://gauravkhuraana.github.io/img/gauravkhurana.png',
        sameAs: [
          'https://www.linkedin.com/in/gauravkhurana/',
          'https://github.com/gauravkhuraana',
          'https://www.youtube.com/@Udzial',
          'https://medium.com/@gauravkhuraana',
          'https://x.com/gauravkhuraana'
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Microsoft'
        },
        knowsAbout: [
          'Software Testing',
          'Test Automation',
          'DevOps',
          'Quality Assurance',
          'AI Tools',
          'Selenium',
          'API Testing',
          'Performance Testing'
        ]
      }),
    },
    // RSS/Atom feed discovery for third-party sites
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Gaurav Khurana - Software Testing & Automation RSS Feed',
        href: '/blog/rss.xml',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'alternate',
        type: 'application/atom+xml',
        title: 'Gaurav Khurana - Software Testing & Automation Atom Feed',
        href: '/blog/atom.xml',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/gauravkhuraana/gauravkhuraana/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'Gaurav Khurana - Software Testing & Automation Insights',
            description: 'Expert insights on software testing, test automation, DevOps, and AI tools. Learn automation frameworks, testing strategies, and career guidance from a Microsoft Test Consultant.',
            copyright: `Copyright © ${new Date().getFullYear()} Gaurav Khurana. All rights reserved.`,
            language: 'en',
            xslt: true,
            createFeedItems: async (params) => {
              const {blogPosts, defaultCreateFeedItems, ...rest} = params;
              
              // Process blog posts to clean HTML content for better feed compatibility
              const processedPosts = blogPosts.map(post => ({
                ...post,
                content: post.content
                  // Remove SVG elements that cause validation issues
                  ?.replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '[Icon]')
                  // Clean up any other problematic HTML elements
                  ?.replace(/<path[^>]*>/gi, '')
                  ?.replace(/<\/path>/gi, '')
              }));

              return defaultCreateFeedItems({
                // keep only the 10 most recent blog posts in the feed
                blogPosts: processedPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/gauravkhuraana/gauravkhurana/edit/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Google Analytics or any other analytics plugin can be added here
    // '@docusaurus/plugin-google-analytics',
    // '@docusaurus/plugin-google-gtag',
    './plugins/feed-enhancer',
  ],

  scripts: [
    {
      src: '/js/auto-subscription.js',
      async: true,
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/gauravkhurana.png',
    metadata: [
      {name: 'description', content: 'Expert insights on software testing, test automation, DevOps, and AI tools. Learn automation frameworks, testing strategies, and career guidance from an experienced QA professional.'},
      {name: 'keywords', content: 'software testing, test automation, DevOps, QA, quality assurance, automation frameworks, testing tools, career guidance, AI tools, selenium, cypress, API testing, performance testing, Microsoft test consultant, Gaurav Khurana'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
      {name: 'theme-color', content: '#25c2a0'},
      {property: 'og:url', content: 'https://gauravkhuraana.github.io'},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'apple-mobile-web-app-status-bar-style', content: 'default'},
      {name: 'msapplication-TileColor', content: '#25c2a0'},
    ],
    navbar: {
      title: 'SharingIsCaring',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Start Here',
        },
        {to: '/blog', label: 'Blog', position: 'right'},
        {to: '/newsletter', label: 'Newsletter', position: 'left'},
        {to: '/feedback', label: 'Contact', position: 'right'},
        {
          to: 'docs/Topmate/testimonials',
          label: 'Need 1:1?',
          position: 'right',
        },
        {
          href: 'https://www.youtube.com/@Udzial/playlists',
          label: 'YouTube',
          position: 'right',
        },
        {
          to: '/memes',
          label: 'Memes',
          position: 'right',
        },

      ],
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Gaurav Khurana',
        src: 'img/gauravkhurana.png',
        width: 60,
        height: 60,
      },
      links: [
        {
          title: 'Learn & Grow',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Automation Guides',
              to: '/docs/Automation',
            },
            {
              label: 'AI Tools',
              to: '/docs/category/ai',
            },
          ],
        },
        {
          title: 'Connect With Me',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/gauravkhuraana/',
            },
            {
              label: 'YouTube (@Udzial)',
              href: 'https://www.youtube.com/@Udzial/playlists',
            },
            {
              label: 'Medium Blog',
              href: 'https://www.medium.com/@gauravkhuraana',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/gauravkhuraana',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'RSS Feeds',
              to: '/feeds',
            },
            {
              label: 'Newsletter',
              to: '/newsletter',
            },
            {
              label: 'Feedback',
              to: '/feedback',
            },
            {
              label: 'Career Guidance',
              href: 'https://www.topmate.io/gauravkhurana',
            },
          ],
        },
      ],
      copyright: `
        <div style="margin-bottom: 1rem; font-style: italic; color: #a0a4a8;">
          "Helping testers become better every day."
        </div>
        <div>Copyright © ${new Date().getFullYear()} Gaurav Khurana • Built with ❤️ and Docusaurus</div>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'C3WDSWBA63',

      // Public API key: it is safe to commit it
      apiKey: 'acd85c2c633320da11bebb8a84ec0120',

      indexName: 'gauravkhuraanaio',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: false,

      // Optional: whether the insights feature is enabled or not on Docsearch (false by default)
      insights: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
