import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import React, {lazy, Suspense} from 'react';
const SubscriptionForm = lazy(() => import('@site/src/components/SubscriptionForm'));

import styles from './index.module.css';

const sections = [
  {
    heading: 'Testing & Automation',
    items: [
      { icon: '🧪', title: 'Testing', desc: 'Strategies, best practices & methodologies', link: '/docs/category/testing/' },
      { icon: '🤖', title: 'Automation', desc: 'Frameworks, tools & real-world implementation', link: '/docs/category/automation/' },
      { icon: '📞', title: 'Need 1:1 Guidance?', desc: 'Book a personalized session', link: '/docs/category/need-11-guidance/' },
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
      { icon: '🎓', title: 'Free Courses', desc: 'Curated free learning resources', link: '/docs/FreeCourses/' },
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
    icon: '🎓',
    title: 'Free Courses',
    desc: 'Video courses on Automation, Azure DevOps, GitHub Copilot & more — completely free.',
    link: '/docs/FreeCourses/',
    cta: 'Start Learning',
    accent: 'green',
  },
  {
    icon: '📞',
    title: 'Need 1:1 Guidance?',
    desc: 'Book a personalized mentoring session — career advice, resume review, or technical deep-dives.',
    link: '/docs/Topmate/testimonials/',
    cta: 'Book a Session',
    accent: 'blue',
  },
  {
    icon: '🚀',
    title: 'API Testing Course',
    desc: 'Learn API testing concepts with interview Q&A — structured Udemy course with lifetime access.',
    link: 'https://www.udemy.com/course/learn-api-testing-concepts-with-interview-question-answers/?couponCode=6B648114581356DBE639',
    cta: 'View on Udemy',
    accent: 'purple',
    external: true,
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
              >
                {inner}
              </a>
            ) : (
              <Link
                key={item.title}
                to={item.link}
                className={clsx(styles.highlightCard, styles[`border_${item.accent}`])}
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
          <a href="https://whatsapp.com/channel/0029Vb6pKpPElagzl4OTqG2s" className={styles.quickLink} target="_blank" rel="noopener noreferrer">
            💬 WhatsApp Channel
          </a>
          <Link to="/docs/Automation/automation-basics-series/" className={styles.quickLink}>
            🚀 Automation Basics Series
          </Link>
          <a href="https://www.udemy.com/course/learn-api-testing-concepts-with-interview-question-answers/?couponCode=6B648114581356DBE639" className={styles.quickLink} target="_blank" rel="noopener noreferrer">
            🎓 API Testing Course (Udemy)
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
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
