import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Mermaid from '@docusaurus/theme-mermaid';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'gauravkhurana.com',
  tagline: 'Sharing is Caring',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://gauravkhurana.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  deploymentBranch: 'main',
  trailingSlash: true, // Ensure consistent URLs with trailing slashes

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gauravkhuraana', // Usually your GitHub org/user name.
  projectName: 'gauravkhuraana.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Markdown configuration (v4 compatible)
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
    mermaid: true,
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    // Content Security Policy meta tag for XSS protection
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'Content-Security-Policy',
        content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.brevo.com https://2daf0ef4.sibforms.com https://ko-fi.com https://storage.ko-fi.com https://www.instagram.com https://platform.twitter.com; style-src 'self' 'unsafe-inline' https://cdn.brevo.com https://2daf0ef4.sibforms.com; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' https://cdn.brevo.com https://2daf0ef4.sibforms.com https://*.algolia.net https://*.algolianet.com; frame-src https://2daf0ef4.sibforms.com https://ko-fi.com https://www.youtube.com https://www.instagram.com https://platform.twitter.com; frame-ancestors 'self';",
      },
    },
    // X-Frame-Options equivalent via meta (clickjacking protection)
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'X-Content-Type-Options',
        content: 'nosniff',
      },
    },
    // Algolia site verification
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: 'C52224D57515729B',
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
        url: 'https://gauravkhurana.com',
        image: 'https://gauravkhurana.com/img/gauravkhurana.png',
        sameAs: [
          'https://www.linkedin.com/in/gauravkhuraana/',
          'https://github.com/gauravkhuraana',
          'https://www.youtube.com/@Udzial',
          'https://medium.com/@gauravkhuraana',
          'https://www.topmate.io/gauravkhurana',
          'https://ko-fi.com/gauravkhurana',
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
          editUrl: 'https://github.com/gauravkhuraana/gauravkhuraana.github.io/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'Gaurav Khurana - Software Testing & Automation Insights',
            description: 'Expert insights on software testing, test automation, DevOps, and AI tools. Learn automation frameworks, testing strategies, and career guidance from a Microsoft Test Consultant.',
            copyright: `Copyright © ${new Date().getFullYear()} Gaurav Khurana. All rights reserved.`,
            language: 'en',
            xslt: false, // Disable XSLT styling for plain XML output (better for third-party feed readers)
            limit: 10, // Limit to 10 most recent posts
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
          editUrl: 'https://github.com/gauravkhuraana/gauravkhuraana.github.io/edit/main/',
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

  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-XXXXXXXXXX',
        anonymizeIP: true,
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
    './plugins/feed-enhancer',
    './plugins/auto-webp',
    './plugins/webpack-warning-filter',
    'docusaurus-lunr-search',
  ],

  clientModules: [
    require.resolve('./src/client/kofiAutoInjection.js'),
  ],

  themeConfig: {
    announcementBar: {
      id: 'subscribe_youtube',
      content: 'Get quick tips and fresh updates! <a target="_blank" rel="noopener noreferrer" href="https://whatsapp.com/channel/0029Vb6pKpPElagzl4OTqG2s">Join the WhatsApp Channel</a>',
      backgroundColor: '#25c2a0',
      textColor: '#fff',
      isCloseable: true,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    // Replace with your project's social card
    image: 'img/gauravkhurana.png',
    metadata: [
      {name: 'description', content: 'Expert insights on software testing, test automation, DevOps, and AI tools. Learn automation frameworks, testing strategies, and career guidance from an experienced QA professional.'},
      {name: 'keywords', content: 'software testing, test automation, DevOps, QA, quality assurance, automation frameworks, testing tools, career guidance, AI tools, selenium, cypress, API testing, performance testing, Microsoft test consultant, Gaurav Khurana'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
      {name: 'theme-color', content: '#25c2a0'},
      {property: 'og:url', content: 'https://gauravkhurana.com'},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'apple-mobile-web-app-status-bar-style', content: 'default'},
      {name: 'msapplication-TileColor', content: '#25c2a0'},
    ],
    navbar: {
      title: 'gauravkhurana.com',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Start Here',
        },
        {
          type: 'dropdown',
          label: 'Testing',
          position: 'left',
          items: [
            {
              type: 'doc',
              docId: 'Testing/testing-principles',
              label: 'Testing Principles',
            },
            {
              type: 'doc',
              docId: 'Testing/advanced-testing-tips',
              label: 'Advanced Testing Tips',
            },
            {
              type: 'doc',
              docId: 'Testing/testing-tips-collection',
              label: 'Testing Tips Collection',
            },
            {
              type: 'doc',
              docId: 'Testing/testing-communities',
              label: 'Testing Communities',
            },
            {
              type: 'html',
              value: '<hr style="margin: 0.5rem 0;">',
            },
            {
              to: '/docs/category/testing',
              label: 'View All Testing Content',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Automation',
          position: 'left',
          items: [
            {
              type: 'doc',
              docId: 'Automation/automation-basics-series',
              label: 'Automation Basics Series',
            },
            {
              type: 'doc',
              docId: 'Automation/automation-fundamentals',
              label: 'Automation Fundamentals',
            },
            {
              type: 'doc',
              docId: 'Automation/playwright',
              label: 'Playwright',
            },
            {
              type: 'doc',
              docId: 'Automation/selenium',
              label: 'Selenium',
            },
            {
              type: 'html',
              value: '<hr style="margin: 0.5rem 0;">',
            },
            {
              to: '/docs/category/automation',
              label: 'View All Automation Content',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'AI',
          position: 'left',
          items: [
            {
              type: 'doc',
              docId: 'AI/github-copilot',
              label: 'GitHub Copilot',
            },
            {
              type: 'doc',
              docId: 'AI/prompt-library',
              label: 'Prompt Library',
            },
            {
              type: 'doc',
              docId: 'AI/qa-sessions',
              label: 'AI Q&A Sessions',
            },
            {
              type: 'doc',
              docId: 'AI/agentic-ai',
              label: 'Agentic AI',
            },
            {
              type: 'doc',
              docId: 'AI/ai-coding-failures',
              label: 'AI Coding Failures',
            },
            {
              type: 'html',
              value: '<hr style="margin: 0.5rem 0;">',
            },
            {
              to: '/docs/category/ai',
              label: 'View All AI Content',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Practice',
          position: 'left',
          items: [
            {
              to: '/practice',
              label: 'All Practice Sites',
            },
            {
              type: 'html',
              value: '<hr style="margin: 0.5rem 0;">',
            },
            {
              label: 'UI Automation Practice Site',
              href: 'https://gauravkhurana.com/test-automation-play',
            },
            {
              label: 'Bug Hunt Challenge',
              href: 'https://gauravkhurana.com/bug-hunt-challenge/',
            },
            {
              label: 'API Testing/Automation',
              href: 'https://gauravkhurana.com/practise-api',
            },
            {
              label: 'Migrate Laptop',
              href: 'https://github.com/gauravkhuraana/new-laptop-setup',
            },
          ],
        },
        {
          to: 'docs/Topmate/testimonials',
          label: 'Need 1:1?',
          position: 'right',
        },
        {
          href: 'https://www.youtube.com/@Udzial?sub_confirmation=1',
          label: 'YouTube',
          position: 'right',
        },
        {to: '/feedback', label: 'Contact', position: 'right'},
        {
          href: 'https://ko-fi.com/gauravkhurana',
          label: '☕ Buy Me a Coffee',
          position: 'right',
          className: 'navbar-kofi-link',
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
        src: 'img/gauravkhurana-footer.webp',
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
              href: 'https://www.youtube.com/@Udzial?sub_confirmation=1',
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
              label: 'Support My Work',
              to: '/support',
            },
            {
              label: 'Career Guidance',
              href: 'https://www.topmate.io/gauravkhurana',
            },
          ],
        },
        {
          title: 'Support',
          items: [
            {
              label: '☕ Buy Me a Coffee',
              href: 'https://ko-fi.com/gauravkhurana',
            },
            {
              label: '▶️ Subscribe on YouTube',
              href: 'https://www.youtube.com/@Udzial?sub_confirmation=1',
            },
            {
              label: '📝 Follow on Medium',
              href: 'https://www.medium.com/@gauravkhuraana',
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
  } satisfies Preset.ThemeConfig & Mermaid.ThemeConfig,
};

export default config;
