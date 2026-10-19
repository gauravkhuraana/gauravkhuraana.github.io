import type {ReactNode} from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';

import YouTubeEmbed from '@site/src/components/YouTubeEmbed';
import {TOPMATE_PROFILE_URL} from '@site/src/data/links';
import {
  appearances,
  certifications,
  recognition,
  talks,
  wins,
  YOUTUBE_PLAYLIST_URL,
  type Talk,
  type Win,
} from '@site/src/data/achievements';

import styles from './about.module.css';

const TITLE = 'About Gaurav Khurana: talks, wins and recognition';
const DESCRIPTION =
  'Gaurav Khurana is a Senior Test Consultant at Microsoft with 15+ years in testing. See his conference talks, hackathon and contest wins, community recognition and certifications.';
const FEATURED_VIDEO = {
  id: 'suYhl_8N_8Y',
  title: 'Navigating the Future: Principles of Responsible AI (TestFlix 2024)',
};

const external = {target: '_blank', rel: 'noopener noreferrer'} as const;

const thumb = (videoId: string) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

function Img({src, alt, contain}: {src: string; alt: string; contain?: boolean}): ReactNode {
  return (
    <img
      src={useBaseUrl(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={contain ? styles.mediaContain : styles.media}
    />
  );
}

function TalkCard({talk}: {talk: Talk}): ReactNode {
  const image = talk.image ?? (talk.videoId ? thumb(talk.videoId) : undefined);
  const meta = [talk.date, talk.location].filter(Boolean).join(' · ');
  return (
    <a className={styles.card} href={talk.href} {...external}>
      {image ? (
        <div className={styles.mediaBox}>
          {talk.image ? (
            <Img src={talk.image} alt={`${talk.event}: ${talk.title}`} />
          ) : (
            <img src={image} alt={`${talk.event}: ${talk.title}`} loading="lazy" className={styles.media} />
          )}
        </div>
      ) : (
        <div className={styles.eventBanner}>
          <span>{talk.event}</span>
        </div>
      )}
      <div className={styles.cardBody}>
        <span className={styles.badge}>{talk.format}</span>
        <p className={styles.cardTitle}>{talk.title}</p>
        <p className={styles.cardMeta}>{talk.event}</p>
        {meta && <p className={styles.cardMeta}>{meta}</p>}
        <span className={styles.cardLink}>{talk.videoId ? 'Watch the talk' : 'View event'}</span>
      </div>
    </a>
  );
}

function WinCard({win}: {win: Win}): ReactNode {
  return (
    <div className={styles.card}>
      <div className={styles.mediaBox}>
        <Img src={win.image} alt={`${win.event}: ${win.placement}`} contain />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.badgeRow}>
          <span className={styles.badgeWin}>{win.placement}</span>
          {win.team && <span className={styles.badge}>Team win</span>}
        </div>
        <p className={styles.cardTitle}>{win.event}</p>
        <p className={styles.cardMeta}>{win.organiser}</p>
        {win.detail && <p className={styles.cardMeta}>{win.detail}</p>}
        {win.date && <p className={styles.cardMeta}>{win.date}</p>}
      </div>
    </div>
  );
}

export default function About(): ReactNode {
  const stats = [
    {value: '15+', label: 'years in testing'},
    {value: String(wins.length), label: 'hackathon and contest wins'},
    {value: String(talks.length), label: 'conference talks and tutorials'},
    {value: String(appearances.length), label: 'podcast and channel guest spots'},
  ];

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://gauravkhurana.com/about/" />
        <meta property="og:image" content="https://gauravkhurana.com/img/gauravkhurana.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="Gaurav Khurana, software testing speaker, test automation, hackathon winner, Tester of the Year, Microsoft test consultant, AI testing, Playwright"
        />
      </Head>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <img
              src={useBaseUrl('/img/gauravkhurana-optimized.webp')}
              alt="Gaurav Khurana"
              className={styles.avatar}
              width={160}
              height={160}
            />
            <div>
              <Heading as="h1" className={styles.heroTitle}>
                Gaurav Khurana
              </Heading>
              <p className={styles.heroRole}>Senior Test Consultant at Microsoft · Tester of the Year 2022</p>
              <p className={styles.heroBio}>
                15+ years in software testing and automation, from telecom billing to insurance to Azure data
                platforms. I share what I learn through talks, hackathons, videos and this site, because
                sharing is caring.
              </p>
              <div className={styles.heroCtas}>
                <Link className="button button--secondary" to="/connect/">
                  Invite me to speak
                </Link>
                <a className={`button button--outline ${styles.outlineLight}`} href={TOPMATE_PROFILE_URL} {...external}>
                  Book a 1:1 on Topmate
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.stats} aria-label="At a glance">
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </section>

        <nav className={styles.jump} aria-label="Sections">
          <a href="#speaking">Speaking</a>
          <a href="#wins">Wins</a>
          <a href="#recognition">Recognition</a>
          <a href="#videos">Videos</a>
          <a href="#certifications">Certifications</a>
        </nav>

        <section className={styles.section} id="speaking">
          <Heading as="h2">Speaking</Heading>
          <p className={styles.sectionSub}>Conference talks, tutorials and training sessions, newest first.</p>
          <div className={styles.featured}>
            <YouTubeEmbed videoId={FEATURED_VIDEO.id} title={FEATURED_VIDEO.title} />
            <a
              className="button button--primary"
              href={`https://www.youtube.com/watch?v=${FEATURED_VIDEO.id}`}
              {...external}
            >
              Watch on YouTube
            </a>
          </div>
          <div className={styles.grid}>
            {talks.filter((t) => t.videoId !== FEATURED_VIDEO.id).map((t) => (
              <TalkCard key={`${t.event}-${t.title}`} talk={t} />
            ))}
          </div>
        </section>

        <section className={styles.section} id="wins">
          <Heading as="h2">Hackathon and contest wins</Heading>
          <p className={styles.sectionSub}>
            Building and testing under a clock, solo and with teams. Each card shows the certificate or the
            organiser's announcement.
          </p>
          <div className={styles.grid}>
            {wins.map((w) => (
              <WinCard key={`${w.event}-${w.placement}`} win={w} />
            ))}
          </div>
        </section>

        <section className={styles.section} id="recognition">
          <Heading as="h2">Recognition</Heading>
          <p className={styles.sectionSub}>From the testing community and from work.</p>
          <div className={styles.grid}>
            {recognition.map((r) => (
              <div key={r.title} className={styles.card}>
                {r.image && (
                  <div className={styles.mediaBox}>
                    <Img src={r.image} alt={`${r.title}, ${r.from}`} contain />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <p className={styles.cardTitle}>{r.title}</p>
                  <p className={styles.cardMeta}>{r.from}</p>
                  <p className={styles.cardText}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} id="videos">
          <Heading as="h2">Podcasts and guest appearances</Heading>
          <p className={styles.sectionSub}>Conversations on other channels about testing careers, ethics and community.</p>
          <div className={styles.grid}>
            {appearances.map((a) => (
              <a key={a.videoId} className={styles.card} href={`https://www.youtube.com/watch?v=${a.videoId}`} {...external}>
                <div className={styles.mediaBox}>
                  <img src={thumb(a.videoId)} alt={a.title} loading="lazy" className={styles.media} />
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardTitle}>{a.title}</p>
                  <p className={styles.cardMeta}>{a.channel}</p>
                </div>
              </a>
            ))}
          </div>
          <p className={styles.more}>
            <a href={YOUTUBE_PLAYLIST_URL} {...external}>
              See the full playlist on YouTube
            </a>
          </p>
        </section>

        <section className={styles.section} id="certifications">
          <Heading as="h2">Certifications</Heading>
          <ul className={styles.certList}>
            {certifications.map((c) => (
              <li key={c.title}>
                <strong>{c.title}</strong>
                <span>{c.issuer}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.cta}>
          <Heading as="h2">Planning an event or a team session?</Heading>
          <p>
            I speak on AI in testing, test automation and testing careers, and I run hands-on workshops. Get in
            touch and tell me about your audience.
          </p>
          <Link className="button button--primary button--lg" to="/connect/">
            Get in touch
          </Link>
        </section>
      </main>
    </Layout>
  );
}
