import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import React, {lazy, Suspense} from 'react';
const SubscriptionForm = lazy(() => import('@site/src/components/SubscriptionForm'));

import styles from './index.module.css';
import {UDEMY_API_TESTING_URL, TOPMATE_PYTHON_AI_URL, TOPMATE_PERSONAL_WEBSITE_URL} from '@site/src/data/links';

const sections = [
  {
    heading: 'Testing & Automation',
    items: [
      { icon: '🧪', title: 'Testing', desc: 'Strategies, best practices & methodologies', link: '/docs/category/testing/' },
      { icon: '🤖', title: 'Automation', desc: 'Frameworks, tools & real-world implementation', link: '/docs/category/automation/' },
      { icon: '📞', title: 'Need 1:1 Guidance?', desc: 'Book a personalized session', link: '/docs/Mentorship/testimonials/' },
    ],
  },
  {
    heading: 'AI & Emerging Tech',
    items: [
      { icon: '☁️', title: 'Azure AI-900', desc: 'AI Fundamentals certification prep', link: '/docs/AI/azure-ai-900/' },
      { icon: '📋', title: 'Prompt Library', desc: 'AI prompts for testing & automation', link: '/docs/AI/prompt-library/' },
      { icon: '🌐', title: 'AI Browser Automation', desc: 'Automate browsers with AI tools', link: '/docs/AI/ai-browser-automation/' },
      { icon: '🛠️', title: 'GitHub Copilot Series', desc: 'AI-powered coding assistant tutorials', link: '/docs/AI/github-copilot/' },
      { icon: '🤝', title: 'Agentic AI', desc: 'Autonomous AI agents for testing', link: '/docs/AI/agentic-ai/' },
    ],
  },
  {
    heading: 'Grow & Explore',
    items: [
      { icon: '☁️', title: 'Azure DevOps', desc: 'CI/CD pipelines & cloud DevOps', link: '/docs/AzureDevOps/azure-devops-complete-series/' },
      { icon: '🛠️', title: 'Tools', desc: 'Tool guides, comparisons & recommendations', link: '/docs/category/tools/' },
      { icon: '🎯', title: 'Self Mastery', desc: 'Career growth & professional development', link: '/docs/category/self-mastery/' },
      { icon: '📰', title: 'Industry Insights', desc: 'Trends, news & expert analysis', link: '/docs/category/industry-insights/' },
      { icon: '🎓', title: 'Free Courses', desc: 'Free video courses + premium picks on Python+AI, automation & more', link: '/docs/FreeCourses/' },
      { icon: '⭐', title: 'Recommendations', desc: 'Personally tested products & books', link: '/docs/Recommendations/' },
    ],
  },
];

function CompactHero() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroRow}>
          <picture>
            <source srcSet="/img/gauravkhurana-optimized.webp" type="image/webp" />
            <img
              src="/img/gauravkhurana-optimized.jpg"
              alt="Gaurav Khurana"
              className={styles.heroPhoto}
              width={80}
              height={80}
              loading="eager"
            />
          </picture>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              Sharing is Caring
            </Heading>
            <p className={styles.heroTagline}>
              Testing, Automation & AI — by a Microsoft Consultant
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

const highlights = [
  {
    icon: '🐍',
    title: 'Python + AI for Beginners',
    desc: 'Build your own Local AI assistant with LM Studio — 11 hands-on videos, 3 assignments + capstone. No prior coding or paid APIs required.',
    link: TOPMATE_PYTHON_AI_URL,
    cta: 'Enroll on Topmate',
    accent: 'green',
    external: true,
    analyticsEvent: 'course_cta_click',
  },
  {
    icon: '🌐',
    title: 'Build Your Personal Website',
    desc: 'Launch your own yourname.com site step-by-step — free hosting, custom domain, and a portfolio you can show recruiters.',
    link: TOPMATE_PERSONAL_WEBSITE_URL,
    cta: 'Get the Course',
    accent: 'green',
    external: true,
    analyticsEvent: 'course_cta_click',
  },
  {
    icon: '🎓',
    title: 'Free Courses',
    desc: 'Free video courses on Automation, Azure DevOps, GitHub Copilot & more — plus a few hand-picked premium picks.',
    link: '/docs/FreeCourses/',
    cta: 'Browse Courses',
    accent: 'blue',
    analyticsEvent: 'course_cta_click',
  },
  {
    icon: '📞',
    title: 'Need 1:1 Guidance?',
    desc: 'Book a personalized mentoring session — career advice, resume review, or technical deep-dives.',
    link: '/docs/Mentorship/testimonials/',
    cta: 'Book a Session',
    accent: 'purple',
    analyticsEvent: 'mentorship_cta_click',
  },
  {
    icon: '🚀',
    title: 'API Testing Course',
    desc: 'Learn API testing concepts with interview Q&A — structured Udemy course with lifetime access.',
    link: UDEMY_API_TESTING_URL,
    cta: 'View on Udemy',
    accent: 'purple',
    external: true,
    analyticsEvent: 'course_cta_click',
  },
];

function Highlights() {
  return (
    <section className={styles.highlightsSection}>
      <div className="container">
        <div className={styles.highlightsGrid}>
          {highlights.map((item) => {
            const inner = (
              <>
                <span className={styles.highlightIcon}>{item.icon}</span>
                <strong className={styles.highlightTitle}>{item.title}</strong>
                <p className={styles.highlightDesc}>{item.desc}</p>
                <span className={clsx(styles.highlightCta, styles[`cta_${item.accent}`])}>
                  {item.cta} →
                </span>
              </>
            );
            return item.external ? (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(styles.highlightCard, styles[`border_${item.accent}`])}
                data-analytics-event={item.analyticsEvent}
                data-analytics-label={item.title}
                data-analytics-location="homepage_highlights"
              >
                {inner}
              </a>
            ) : (
              <Link
                key={item.title}
                to={item.link}
                className={clsx(styles.highlightCard, styles[`border_${item.accent}`])}
                data-analytics-event={item.analyticsEvent}
                data-analytics-label={item.title}
                data-analytics-location="homepage_highlights"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section className={styles.categorySection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Explore Topics
        </Heading>
        {sections.map((section) => (
          <div key={section.heading} className={styles.categoryGroup}>
            <h3 className={styles.groupHeading}>{section.heading}</h3>
            <div className={styles.categoryGrid}>
              {section.items.map((cat) => (
                <Link key={cat.title} to={cat.link} className={styles.categoryCard}>
                  <span className={styles.categoryIcon}>{cat.icon}</span>
                  <div>
                    <strong className={styles.categoryTitle}>{cat.title}</strong>
                    <p className={styles.categoryDesc}>{cat.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinksSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Popular Resources
        </Heading>
        <div className={styles.quickLinksRow}>
          <Link to="/docs/API/HTTP-Status-Codes/" className={styles.quickLink}>
            📝 HTTP Status Codes Cheat Sheet
          </Link>
          <Link to="/blog/" className={styles.quickLink}>
            📰 Latest Blog Posts
          </Link>
          <a href="https://www.youtube.com/@Udzial?sub_confirmation=1" className={styles.quickLink} target="_blank" rel="noopener noreferrer">
            🎥 YouTube Channel
          </a>
          <Link to="/docs/Automation/automation-basics-series/" className={styles.quickLink}>
            🚀 Automation Basics Series
          </Link>
          <a href={UDEMY_API_TESTING_URL} className={styles.quickLink} target="_blank" rel="noopener noreferrer">
            🎓 API Testing Course (Udemy)
          </a>
          <a href={TOPMATE_PYTHON_AI_URL} className={styles.quickLink} target="_blank" rel="noopener noreferrer">
            🐍 Python + AI for Beginners (Local AI)
          </a>
          <a href={TOPMATE_PERSONAL_WEBSITE_URL} className={styles.quickLink} target="_blank" rel="noopener noreferrer">
            🌐 Build Your Personal Website (yourname.com)
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Testing & Automation Practitioner - Gaurav Khurana"
      description="Get battle-tested tips from 15+ years in automation, directly from a Microsoft Test Consultant. Learn testing fundamentals, automation mastery, and AI tools that actually work in enterprise environments.">
      <CompactHero />
      <main>
        <Highlights />
        <CategoryGrid />
        <QuickLinks />
        <div className="container" style={{ maxWidth: 700, paddingBottom: '2rem' }}>
          <Suspense fallback={<div style={{textAlign:'center',padding:'2rem'}}>Loading...</div>}>
            <SubscriptionForm />
          </Suspense>
        </div>
      </main>
    </Layout>
  );
}
