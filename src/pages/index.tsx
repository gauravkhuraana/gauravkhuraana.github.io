import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import React, {lazy, Suspense} from 'react';
const SubscriptionForm = lazy(() => import('@site/src/components/SubscriptionForm'));

import styles from './index.module.css';

const categories = [
  { icon: '🧪', title: 'Testing', desc: 'Strategies, best practices & methodologies', link: '/docs/category/testing/' },
  { icon: '🤖', title: 'Automation', desc: 'Frameworks, tools & real-world implementation', link: '/docs/category/automation/' },
  { icon: '🧠', title: 'AI', desc: 'AI-powered testing tools & techniques', link: '/docs/category/ai/' },
  { icon: '🔗', title: 'API Testing', desc: 'REST, Postman assertions & HTTP codes', link: '/docs/category/api-testing/' },
  { icon: '☁️', title: 'Azure DevOps', desc: 'CI/CD pipelines & cloud DevOps', link: '/docs/category/azure-devops/' },
  { icon: '🛠️', title: 'Tools', desc: 'Tool guides, comparisons & recommendations', link: '/docs/category/tools/' },
  { icon: '🎯', title: 'Self Mastery', desc: 'Career growth & professional development', link: '/docs/category/self-mastery/' },
  { icon: '📰', title: 'Industry Insights', desc: 'Trends, news & expert analysis', link: '/docs/category/industry-insights/' },
  { icon: '🎓', title: 'Free Courses', desc: 'Curated free learning resources', link: '/docs/category/free-courses/' },
  { icon: '📞', title: 'Need 1:1 Guidance?', desc: 'Book a personalized session', link: '/docs/category/need-11-guidance/' },
  { icon: '🐙', title: 'Git', desc: 'Version control tips & workflows', link: '/docs/Git/git-commands/' },
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

function CategoryGrid() {
  return (
    <section className={styles.categorySection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Explore Topics
        </Heading>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
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
