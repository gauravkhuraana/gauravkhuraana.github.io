import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import styles from './LegalPage.module.css';

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalPageProps {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const legalLinks = [
  { label: 'Privacy', to: '/privacy/' },
  { label: 'Cookies', to: '/cookies/' },
  { label: 'Terms', to: '/terms/' },
  { label: 'Affiliate Disclosure', to: '/affiliate-disclosure/' },
];

export default function LegalPage({
  title,
  description,
  lastUpdated,
  sections,
}: LegalPageProps): React.JSX.Element {
  return (
    <Layout title={title} description={description}>
      <main>
        <header className={styles.header}>
          <div className="container">
            <Heading as="h1" className={styles.title}>{title}</Heading>
            <p className={styles.description}>{description}</p>
            <p className={styles.updated}>Last updated: {lastUpdated}</p>
            <nav className={styles.policyNav} aria-label="Legal policies">
              {legalLinks.map((link) => (
                <Link key={link.to} to={link.to}>{link.label}</Link>
              ))}
            </nav>
          </div>
        </header>

        <div className={`container ${styles.layout}`}>
          <nav className={styles.contents} aria-label={`${title} table of contents`}>
            <strong>On this page</strong>
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <Link to={`#${section.id}`}>{section.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <article className={styles.article}>
            {sections.map((section) => (
              <section key={section.id} className={styles.section}>
                <Heading as="h2" id={section.id}>{section.title}</Heading>
                {section.content}
              </section>
            ))}
          </article>
        </div>
      </main>
    </Layout>
  );
}