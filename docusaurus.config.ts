import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Gaurav Khurana',
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

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/gauravkhuraana/gauravkhuraana/edit/main/',


        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/gauravkhuraana/gauravkhurana/edit/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/gauravkhurana.png',
    metadata: [
      {name: 'description', content: 'Expert insights on software testing, test automation, DevOps, and AI tools. Learn automation frameworks, testing strategies, and career guidance from an experienced QA professional.'},
      {name: 'keywords', content: 'software testing, test automation, DevOps, QA, quality assurance, automation frameworks, testing tools, career guidance, AI tools'},
      {property: 'og:description', content: 'Expert insights on software testing, test automation, DevOps, and AI tools. Learn automation frameworks, testing strategies, and career guidance from an experienced QA professional.'},
      {property: 'twitter:description', content: 'Expert insights on software testing, test automation, DevOps, and AI tools. Learn automation frameworks, testing strategies, and career guidance from an experienced QA professional.'},
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
          label: 'Tutorial',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://www.topmate.io/gauravkhurana',
          label: 'Need Guidance?',
          position: 'right',
        },
        {
          href: 'https://www.youtube.com/@Udzial/playlists',
          label: 'My YouTube Playlists',
          position: 'right',
        },
                {
          href: 'https://www.medium.com/@gauravkhuraana',
          label: 'Medium',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Start Here',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/gauravkhuraana',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Gaurav Khurana. Built with Docusaurus.`,
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
