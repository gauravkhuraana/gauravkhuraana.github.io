import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import SubscriptionForm from '@site/src/components/SubscriptionForm';
import NewsletterSubscription from '@site/src/components/NewsletterSubscription';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className={styles.heroTagline}>
          Automation, Testing & AI – From an Engineer Who Cares
        </p>
        <p className={styles.heroIntro}>
          Built by Gaurav – Microsoft Test Consultant 
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            🚀 Start Learning Now →
          </Link>
        </div>
      </div>
    </header>
  );
}

function USPSection() {
  return (
    <section className={styles.uspSection}>
      <div className="container">
        <div className={styles.uspContent}>
            <Heading as="h2" className={styles.uspTitle}>
             Everything Here Helps You to be Better.
            </Heading>
          <p className={styles.uspText}>
           Get simple, proven techniques that work in the real world.
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturedContent() {
  return (
    <section className={styles.featuredSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          What You'll Learn Here
        </Heading>
        <div className="row">
          <div className="col col--4">
            <div className={styles.featuredCard}>
              <div className={styles.cardIcon}>🧪</div>
              <h3>Testing Fundamentals</h3>
              <p>Master the core concepts every tester needs to know, from test design to execution strategies.</p>
              <Link to="/docs/category/-testing" className={styles.cardLink}>
                Explore Testing Guides →
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.featuredCard}>
              <div className={styles.cardIcon}>🤖</div>
              <h3>Automation Mastery</h3>
              <p>Learn automation frameworks, best practices, and real-world implementation strategies.</p>
              <Link to="/docs/Automation" className={styles.cardLink}>
                Start Automating →
              </Link>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.featuredCard}>
              <div className={styles.cardIcon}>🚀</div>
              <h3>AI & Modern Tools</h3>
              <p>Stay ahead with AI-powered testing tools and cutting-edge DevOps practices.</p>
              <Link to="/docs/category/-ai" className={styles.cardLink}>
                Discover AI Tools →
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.popularResources}>
          <Heading as="h3" className={styles.resourcesTitle}>
            Popular Resources & Cheat Sheets
          </Heading>
          <div className="row">
            <div className="col col--6">
              <div className={styles.resourceCard}>
                <h4>🛠️ Essential Tools Guide</h4>
                <p>Complete list of testing and automation tools with practical recommendations.</p>
                <Link to="/docs/category/%EF%B8%8F-tools" className={styles.resourceLink}>
                  View Tools →
                </Link>
              </div>
            </div>
            <div className="col col--6">
              <div className={styles.resourceCard}>
                <h4>📝 HTTP Status Codes Cheat Sheet</h4>
                <p>Quick reference for API testing with real-world examples and usage scenarios.</p>
                <Link to="/docs/API/HTTP-Status-Codes" className={styles.resourceLink}>
                  Get Cheat Sheet →
                </Link>
              </div>
            </div>
          </div>
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
      <HomepageHeader />
      <main>
        <USPSection />
        <HomepageFeatures />
        <FeaturedContent />
        <div className="container">
          <SubscriptionForm />
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link 
              to="/newsletter" 
              className="button button--primary button--lg"
            >
              🗞️ Visit Complete Newsletter Page
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
