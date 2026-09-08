import type {ReactNode} from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './courses.module.css';
import {
  UDEMY_API_TESTING_URL,
  UDEMY_PYTHON_AI_URL,
  UDEMY_PERSONAL_WEBSITE_URL,
  TOPMATE_API_TESTING_URL,
  TOPMATE_PYTHON_AI_URL,
  TOPMATE_PERSONAL_WEBSITE_URL,
  TOPMATE_PROFILE_URL,
} from '@site/src/data/links';
import {
  TOPMATE_BOOKINGS,
  TOPMATE_RATING,
  TOPMATE_TESTIMONIALS,
  topmateStats,
} from '@site/src/data/socialProof';

type Course = {
  icon: string;
  title: string;
  desc: string;
  link: string;
  external?: boolean;
  gradient: string;
  badge: 'FREE' | 'BESTSELLER' | 'TOPMATE' | 'UDEMY';
  tags: string[];
  cta: string;
  /* Same course on the other platform — learners pick where they prefer to buy. */
  altLink?: string;
  altCta?: string;
  priceLabel: string;
  audience: string;
  format: string;
  support: string;
  outcome: string;
};

const freeCourses: Course[] = [
  {
    icon: '🤖',
    title: 'Automation Basics Series',
    desc: 'Automation testing fundamentals from scratch — ideal for beginners.',
    link: '/docs/Automation/automation-basics-series',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    badge: 'FREE',
    tags: ['Automation', 'Beginner'],
    cta: 'Start Learning →',
    priceLabel: 'Free',
    audience: 'New automation testers',
    format: 'Video series and guides',
    support: 'Self-paced resources',
    outcome: 'Build strong automation foundations',
  },
  {
    icon: '🛠️',
    title: 'GitHub Copilot / GH-300',
    desc: 'Master GitHub Copilot from basics to advanced — plus GH-300 certification prep.',
    link: '/docs/AI/github-copilot',
    gradient: 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
    badge: 'FREE',
    tags: ['AI', 'Certification'],
    cta: 'Start Learning →',
    priceLabel: 'Free',
    audience: 'Developers and testers using AI',
    format: 'Guides and certification prep',
    support: 'Self-paced resources',
    outcome: 'Use GitHub Copilot effectively',
  },
  {
    icon: '☁️',
    title: 'Azure AI-900 Fundamentals',
    desc: 'Azure AI Fundamentals prep — machine learning, computer vision, NLP, and generative AI.',
    link: '/docs/AI/azure-ai-900',
    gradient: 'linear-gradient(135deg, #0078d4 0%, #00bcf2 100%)',
    badge: 'FREE',
    tags: ['Azure', 'AI', 'Certification'],
    cta: 'Start Learning →',
    priceLabel: 'Free',
    audience: 'AI beginners and certification candidates',
    format: 'Certification guide and videos',
    support: 'Self-paced resources',
    outcome: 'Prepare for the AI-900 exam',
  },
  {
    icon: '⚙️',
    title: 'Azure DevOps Complete Series',
    desc: 'Complete Azure DevOps guide — CI/CD pipelines, work items, and best practices.',
    link: '/docs/AzureDevOps/azure-devops-complete-series',
    gradient: 'linear-gradient(135deg, #0078d4 0%, #5c2d91 100%)',
    badge: 'FREE',
    tags: ['DevOps', 'CI/CD'],
    cta: 'Start Learning →',
    priceLabel: 'Free',
    audience: 'Testers learning CI/CD',
    format: 'Video series and practical guides',
    support: 'Self-paced resources',
    outcome: 'Build Azure DevOps foundations',
  },
];

const premiumCourses: Course[] = [
  {
    icon: '🐍🤖',
    title: 'Python + AI for Beginners — Build your own Local AI',
    desc: 'Build a real AI assistant on your laptop with LM Studio — no paid APIs, no GPU required.',
    link: TOPMATE_PYTHON_AI_URL,
    external: true,
    gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    badge: 'BESTSELLER',
    tags: ['11 Videos', '~4–6 hrs', '3 Assignments + Capstone'],
    cta: 'Enroll on Topmate →',
    altLink: UDEMY_PYTHON_AI_URL,
    altCta: 'Also on Udemy',
    priceLabel: 'See current price',
    audience: 'Beginners building with local AI',
    format: '11 videos, assignments, and capstone',
    support: 'Platform course access',
    outcome: 'Build a local AI assistant',
  },
  {
    icon: '🌐',
    title: 'Build Your Personal Website (yourname.com)',
    desc: 'Launch your portfolio at yourname.com — free hosting and your own custom domain.',
    link: TOPMATE_PERSONAL_WEBSITE_URL,
    external: true,
    gradient: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
    badge: 'TOPMATE',
    tags: ['Portfolio', 'Custom Domain', 'Beginner'],
    cta: 'Get it on Topmate →',
    altLink: UDEMY_PERSONAL_WEBSITE_URL,
    altCta: 'Also on Udemy',
    priceLabel: 'See current price',
    audience: 'Beginners and job seekers',
    format: 'Step-by-step project course',
    support: 'Platform course access',
    outcome: 'Launch a personal portfolio site',
  },
  {
    icon: '🔌',
    title: 'API Testing Concepts with Interview Q&A',
    desc: 'API testing concepts with interview questions & answers — lifetime access on Udemy.',
    link: UDEMY_API_TESTING_URL,
    external: true,
    gradient: 'linear-gradient(135deg, #a435f0 0%, #6d28d9 100%)',
    badge: 'UDEMY',
    tags: ['API', 'Interview Prep', 'Lifetime Access'],
    cta: 'View on Udemy →',
    altLink: TOPMATE_API_TESTING_URL,
    altCta: 'Also on Topmate',
    priceLabel: 'See current price',
    audience: 'API testers and interview candidates',
    format: 'Structured on-demand course',
    support: 'Lifetime course access',
    outcome: 'Strengthen API and interview skills',
  },
];

const allCourses = [...freeCourses, ...premiumCourses];

const badgeClass: Record<Course['badge'], string> = {
  FREE: styles.badgeFree,
  BESTSELLER: styles.badgeBest,
  TOPMATE: styles.badgeTopmate,
  UDEMY: styles.badgeUdemy,
};

function CourseTitleLink({course}: {course: Course}): ReactNode {
  const analytics = {
    'data-analytics-event': 'course_cta_click',
    'data-analytics-label': course.title,
    'data-analytics-location': 'courses_comparison_table',
  };

  return course.external ? (
    <a
      className={styles.tableLink}
      href={course.link}
      target="_blank"
      rel="noopener noreferrer"
      {...analytics}
    >
      {course.title}
    </a>
  ) : (
    <Link className={styles.tableLink} to={course.link} {...analytics}>
      {course.title}
    </Link>
  );
}

function CourseCard({course}: {course: Course}): ReactNode {
  const banner = (
    <div className={styles.courseBanner} style={{background: course.gradient}}>
      <span aria-hidden="true">{course.icon}</span>
      <span className={`${styles.badge} ${badgeClass[course.badge]}`}>{course.badge}</span>
    </div>
  );

  const details = (
    <>
      <h3>{course.title}</h3>
      <p>{course.desc}</p>
      <div className={styles.tags}>
        {course.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <span className={styles.price}>{course.priceLabel}</span>
    </>
  );

  // Available on two platforms: the card can't be one big link, so it holds a
  // primary and a secondary CTA instead.
  if (course.altLink && course.altCta) {
    return (
      <div className={styles.courseCard}>
        {banner}
        <div className={styles.courseBody}>
          {details}
          <div className={styles.courseActions}>
            <a
              className={styles.cta}
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${course.title} — ${course.cta.replace(' →', '')}`}
              data-analytics-event="course_cta_click"
              data-analytics-label={`${course.title} (${course.cta.replace(' →', '')})`}
              data-analytics-location="courses_page"
            >
              {course.cta}
            </a>
            <a
              className={styles.ctaAlt}
              href={course.altLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${course.title} — ${course.altCta}`}
              data-analytics-event="course_cta_click"
              data-analytics-label={`${course.title} (${course.altCta})`}
              data-analytics-location="courses_page"
            >
              {course.altCta}
            </a>
          </div>
        </div>
      </div>
    );
  }

  const body = (
    <>
      {banner}
      <div className={styles.courseBody}>
        {details}
        <span className={styles.cta}>{course.cta}</span>
      </div>
    </>
  );

  return course.external ? (
    <a
      className={styles.courseCard}
      href={course.link}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-event="course_cta_click"
      data-analytics-label={course.title}
      data-analytics-location="courses_page"
    >
      {body}
    </a>
  ) : (
    <Link
      className={styles.courseCard}
      to={course.link}
      data-analytics-event="course_cta_click"
      data-analytics-label={course.title}
      data-analytics-location="courses_page"
    >
      {body}
    </Link>
  );
}

export default function Courses(): ReactNode {
  return (
    <Layout
      title="Courses"
      description="Free and premium video courses on automation testing, AI, Azure DevOps, API testing and more — start free, go deeper when you're ready.">
      <header className={styles.hero}>
        <Heading as="h1">Courses</Heading>
        <p>
          Hands-on video courses to level up your testing, automation & AI skills. Start with the
          free ones — go premium when you want structured projects and outcomes.
        </p>
      </header>

      <main>
        <section className={styles.section}>
          <Heading as="h2">Free Courses</Heading>
          <p className={styles.sectionSub}>Completely free. No signup. Just open and start learning.</p>
          <div className={styles.courseGrid}>
            {freeCourses.map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <Heading as="h2">Premium Courses</Heading>
          <p className={styles.sectionSub}>
            Structured lessons, assignments, and real outcomes — on Topmate or Udemy, your pick.
          </p>
          <div className={styles.courseGrid}>
            {premiumCourses.map((course) => (
              <CourseCard key={course.title} course={course} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <Heading as="h2">Compare Course Options</Heading>
          <p id="course-comparison-description" className={styles.sectionSub}>
            Choose by experience level, learning format, and the outcome you want to achieve.
            External platforms show their latest price before checkout.
          </p>
          <div
            className={styles.comparisonTableWrapper}
            role="region"
            aria-label="Course comparison"
            tabIndex={0}
          >
            <table className={styles.comparisonTable} aria-describedby="course-comparison-description">
              <thead>
                <tr>
                  <th scope="col">Course</th>
                  <th scope="col">Price</th>
                  <th scope="col">Best for</th>
                  <th scope="col">Format</th>
                  <th scope="col">Support</th>
                  <th scope="col">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {allCourses.map((course) => (
                  <tr key={course.title}>
                    <th scope="row">
                      <CourseTitleLink course={course} />
                      {course.altLink && course.altCta && (
                        <a
                          className={styles.tableAltLink}
                          href={course.altLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${course.title} — ${course.altCta}`}
                          data-analytics-event="course_cta_click"
                          data-analytics-label={`${course.title} (${course.altCta})`}
                          data-analytics-location="courses_comparison_table"
                        >
                          {course.altCta}
                        </a>
                      )}
                    </th>
                    <td>{course.priceLabel}</td>
                    <td>{course.audience}</td>
                    <td>{course.format}</td>
                    <td>{course.support}</td>
                    <td>{course.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.proofBand}>
            <Heading as="h2">
              {TOPMATE_BOOKINGS}+ bookings, rated {TOPMATE_RATING} on Topmate
            </Heading>
            <p>
              Testers and SDETs keep coming back — {TOPMATE_TESTIMONIALS} of them wrote about it.
              Real success stories from professionals who transformed their careers through these
              courses and 1:1 mentorship.
            </p>
            <dl className={styles.proofStats}>
              {topmateStats.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.proofButtons}>
              <Link className={styles.proofButton} to="/docs/Mentorship/testimonials/">
                Read the Testimonials
              </Link>
              <a
                className={`${styles.proofButton} ${styles.proofButtonSecondary}`}
                href={TOPMATE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-event="topmate_profile_click"
                data-analytics-location="courses_page"
              >
                See Reviews on Topmate →
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
