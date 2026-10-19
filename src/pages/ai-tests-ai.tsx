import type {ReactNode} from 'react';
import React from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './ai-tests-ai.module.css';

/*
 * Unlisted setup page for the AutomationSTAR 2026 tutorial.
 * Keep it unlinked from the rest of the site. The robots noindex tag below also keeps it
 * out of sitemap.xml. Do not wrap content in <article> with a `markdown` class, or lunr
 * search will index it.
 */

const PAGE_TITLE = 'Get ready · Poison Kills Poison: AI Tests AI';
const PAGE_DESCRIPTION =
  "Setup for Gaurav Khurana's hands-on AutomationSTAR 2026 tutorial: 20-30 minutes, any evening in the week before.";

const REPO_URL = 'https://github.com/gauravkhuraana/shopkart-ai-tutorial-v2';
const PRE_CONFERENCE_URL = `${REPO_URL}/blob/main/PRE_CONFERENCE.md`;
const TROUBLESHOOTING_URL = `${REPO_URL}/blob/main/TROUBLESHOOTING.md`;
const LINKEDIN_URL = 'https://www.linkedin.com/in/gauravkhuraana/';

function ExternalLink({href, children}: {href: string; children: ReactNode}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

type ExploreCard = {
  title: string;
  desc: string;
  href: string;
  external?: boolean;
};

const exploreCards: ExploreCard[] = [
  {
    title: 'YouTube · Udzial',
    desc: 'Videos on testing, automation and AI',
    href: 'https://www.youtube.com/@Udzial?sub_confirmation=1',
    external: true,
  },
  {
    title: 'AI roadmap for testers',
    desc: 'A step-by-step path from tester to AI-ready SDET',
    href: '/docs/AI/sdet-ai-roadmap/',
  },
  {
    title: 'Agentic AI',
    desc: 'What agents are and how to test them',
    href: '/docs/AI/agentic-ai/',
  },
  {
    title: 'Prompt library',
    desc: 'Prompts you can use in your testing work',
    href: '/docs/AI/prompt-library/',
  },
  {
    title: 'Free courses',
    desc: 'Self-paced courses on testing and automation',
    href: '/courses/',
  },
  {
    title: 'Practice sites',
    desc: 'Practise UI, API and security testing',
    href: '/practice/',
  },
  {
    title: 'Newsletter',
    desc: 'New posts and videos in your inbox',
    href: '/newsletter/',
  },
];

function ExploreCardItem({title, desc, href, external}: ExploreCard) {
  const content = (
    <>
      <span className={styles.linkCardTitle}>{title}</span>
      <span className={styles.linkCardDesc}>{desc}</span>
    </>
  );
  return external ? (
    <a className={styles.linkCard} href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link className={styles.linkCard} to={href}>
      {content}
    </Link>
  );
}

export default function AiTestsAi(): ReactNode {
  return (
    <Layout description={PAGE_DESCRIPTION}>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
      </Head>

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>AutomationSTAR 2026 · Tutorial C · Antwerp · 4 November, 09:00 CET</p>
          <Heading as="h1">Poison Kills Poison: AI Tests AI</Heading>
          <p className={styles.heroSub}>Get ready before the tutorial</p>
          <p className={styles.heroText}>
            20 to 30 minutes, any evening in the week before. Most of it is waiting for a download.
            Do it once at home, and on the day you only need your laptop.
          </p>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <Heading as="h2">What we'll do together</Heading>
          <p>
            In 3 hours you will <strong>build</strong> an AI chatbot and an AI agent for a fictional
            online shop, then <strong>test</strong> them, using AI as the tester. Everything is
            hands-on, so a ready laptop means more time building and less time installing.
          </p>
        </section>

        <section className={styles.section}>
          <Heading as="h2">Pick one path</Heading>
          <div className={styles.pathGrid}>
            <div className={clsx(styles.pathCard, styles.pathCardRecommended)}>
              <p className={styles.pathLabel}>Card A</p>
              <p className={styles.pathTitle}>
                On your laptop<span className={styles.badge}>Recommended</span>
              </p>
              <ul>
                <li>
                  Python <strong>3.12</strong>, VS Code, a free Groq key
                </li>
                <li>About 20 to 30 minutes</li>
                <li>
                  Best if it is your own laptop, or your work laptop lets you install programs
                </li>
              </ul>
            </div>
            <div className={styles.pathCard}>
              <p className={styles.pathLabel}>Card B</p>
              <p className={styles.pathTitle}>In your browser (GitHub Codespaces)</p>
              <ul>
                <li>Nothing to install: VS Code opens in your browser and sets itself up</li>
                <li>About 10 minutes, and it saves you most of the setup</li>
                <li>Needs a free GitHub account (signed in) and a free Groq key</li>
                <li>The answer if your work laptop blocks installs, or Path A gives you trouble</li>
              </ul>
            </div>
          </div>
          <p className={styles.note}>Not sure? Start with A. You can switch to B any time.</p>
          <div className={styles.buttonRow}>
            <a
              className="button button--primary button--lg"
              href={PRE_CONFERENCE_URL}
              target="_blank"
              rel="noopener noreferrer">
              Full step-by-step guide with every command →
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.cta}>
            <Heading as="h2">All OK? Let me know</Heading>
            <p>
              Take a screenshot of your setup check and send it to me as a LinkedIn message. It
              tells me you're ready, and if something looks off, I can help you before the day.
            </p>
            <div className={styles.buttonRow}>
              <a
                className="button button--primary button--lg"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer">
                Send it on LinkedIn →
              </a>
            </div>
            <p>
              Stuck on a step? Message me on LinkedIn the same way. The check prints a number for
              every problem; look it up in the{' '}
              <ExternalLink href={TROUBLESHOOTING_URL}>troubleshooting guide</ExternalLink> first.
              Nobody gets left behind.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <Heading as="h2">Your week</Heading>
          <ul className={styles.checklist}>
            <li>Any evening this week: Path A or B until every line says OK</li>
            <li>3 days before: run the check again (it confirms your Groq key still works)</li>
            <li>
              The day before: run the check once more, and charge your laptop and pack the charger
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <Heading as="h2">While you wait: explore more</Heading>
          <p className={styles.intro}>
            While the downloads run, please explore. Want a head start, or something to explore after the tutorial? Everything here is free.
          </p>
          <div className={styles.cardGrid}>
            {exploreCards.map((card) => (
              <ExploreCardItem key={card.title} {...card} />
            ))}
          </div>
        </section>

        <p className={styles.closing}>See you in Antwerp. #SharingIsCaring</p>
      </main>
    </Layout>
  );
}
