import type {ReactNode} from 'react';
import {useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './links.module.css';
import {linkGroups, totalLinkCount, type SiteLink} from '@site/src/data/siteLinks';

const PAGE_DESCRIPTION =
  `Every page on gauravkhurana.com in one place — ${totalLinkCount}+ links covering AI, ` +
  'test automation, software testing, API testing, tools, career guidance, free courses, ' +
  'practice sites and social profiles.';

// desc and tags are never rendered — they exist purely so the filter can match on more
// than the visible title (searching "playwright" finds AI Browser Automation, etc.).
function matches(link: SiteLink, query: string): boolean {
  const haystack = `${link.title} ${link.desc} ${(link.tags ?? []).join(' ')}`.toLowerCase();
  return haystack.includes(query);
}

function LinkRow({link, groupId}: {link: SiteLink; groupId: string}): ReactNode {
  const label = (
    <>
      {link.title}
      {link.external && (
        <span className={styles.externalMark} aria-hidden="true">
          ↗
        </span>
      )}
    </>
  );

  const analytics = {
    'data-analytics-event': 'links_page_click',
    'data-analytics-label': link.title,
    'data-analytics-location': groupId,
  };

  return (
    <li className={styles.item}>
      {link.external ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
          aria-label={`${link.title} (opens in a new tab)`}
          {...analytics}>
          {label}
        </a>
      ) : (
        <Link to={link.href} className={styles.cardLink} {...analytics}>
          {label}
        </Link>
      )}
    </li>
  );
}

export default function Links(): ReactNode {
  const [query, setQuery] = useState('');
  const normalised = query.trim().toLowerCase();
  const isFiltering = normalised.length > 0;

  const visibleGroups = useMemo(() => {
    if (!isFiltering) {
      return linkGroups;
    }
    return linkGroups
      .map((group) => ({...group, links: group.links.filter((l) => matches(l, normalised))}))
      .filter((group) => group.links.length > 0);
  }, [isFiltering, normalised]);

  const visibleCount = visibleGroups.reduce((sum, g) => sum + g.links.length, 0);

  // Marks the page up as an index so search engines read it as a link collection
  // rather than an article.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Links — Gaurav Khurana',
    description: PAGE_DESCRIPTION,
    url: 'https://gauravkhurana.com/links/',
    hasPart: linkGroups.map((group) => ({
      '@type': 'ItemList',
      name: group.title,
      itemListElement: group.links.map((link, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: link.title,
        url: link.href.startsWith('http')
          ? link.href
          : `https://gauravkhurana.com${link.href}`,
      })),
    })),
  };

  return (
    <Layout title="All Links" description={PAGE_DESCRIPTION}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <header className={styles.hero}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            🔗 All Links
          </Heading>
          <p className={styles.heroTagline}>
            The complete index of this site — {totalLinkCount} links across AI, automation,
            testing, tools, courses and everything else. Start typing to find something.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.filterWrap}>
            <label className={styles.filterLabel} htmlFor="links-filter">
              Filter links
            </label>
            <div className={styles.filterRow}>
              <input
                id="links-filter"
                type="search"
                className={styles.filterInput}
                placeholder="Search for playwright, resume, prompts, API…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
              {isFiltering && (
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={() => setQuery('')}
                  aria-label="Clear filter">
                  ×
                </button>
              )}
            </div>
            <p className={styles.resultCount} role="status" aria-live="polite">
              {isFiltering
                ? visibleCount === 0
                  ? `No links match “${query.trim()}”`
                  : `${visibleCount} of ${totalLinkCount} links`
                : `${totalLinkCount} links in ${linkGroups.length} sections`}
            </p>
          </div>

          {!isFiltering && (
            <nav className={styles.jumpBar} aria-label="Jump to section">
              {linkGroups.map((group) => (
                <a key={group.id} href={`#${group.id}`} className={styles.jumpPill}>
                  {group.icon} {group.title}
                </a>
              ))}
            </nav>
          )}

          {visibleCount === 0 && (
            <p className={styles.emptyState}>
              Nothing here matches that. Try a broader word — or{' '}
              <Link to="/connect/">tell me what you were looking for</Link> and I will add it.
            </p>
          )}

          <div className={styles.columns}>
            {visibleGroups.map((group) => (
              <section key={group.id} id={group.id} className={styles.group}>
                <Heading as="h2" className={styles.groupTitle}>
                  <span className={styles.groupIcon} aria-hidden="true">
                    {group.icon}
                  </span>
                  {group.title}
                  <span className={styles.groupCount}>{group.links.length}</span>
                </Heading>
                <ul className={styles.list}>
                  {group.links.map((link) => (
                    <LinkRow key={`${group.id}-${link.href}`} link={link} groupId={group.id} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
