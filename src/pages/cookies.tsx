import React from 'react';
import Link from '@docusaurus/Link';
import LegalPage, { type LegalSection } from '@site/src/components/LegalPage';

const sections: LegalSection[] = [
  {
    id: 'what-cookies-are',
    title: 'What cookies and local storage are',
    content: (
      <>
        <p>
          Cookies are small text files stored by a browser. Local storage is a similar browser
          feature that lets a site remember a setting without sending it with every web request.
        </p>
        <p>
          This site does not set tracking cookies and does not run advertising or cross-site
          profiling. Because of that, there is no consent banner to accept or dismiss.
        </p>
      </>
    ),
  },
  {
    id: 'necessary-storage',
    title: 'Necessary preference storage',
    content: (
      <>
        <p>
          The site stores your light or dark theme choice in local storage so pages render the way
          you left them. This preference stays in your browser and does not identify you across
          other websites.
        </p>
        <p>
          Your browser keeps this preference until you clear site data or change the selection.
        </p>
      </>
    ),
  },
  {
    id: 'analytics',
    title: 'Cookieless analytics',
    content: (
      <>
        <p>
          Site statistics are collected with Umami, a privacy-focused analytics service. Umami does
          not set cookies, does not store an identifier in your browser, and does not follow you to
          other websites.
        </p>
        <p>
          What is recorded stays aggregated and non-identifying: the page visited, the referring
          site, and general device and country information. If you would still rather not be
          counted, a content blocker or privacy extension will stop the script from loading.
        </p>
      </>
    ),
  },
  {
    id: 'embedded-services',
    title: 'Embedded and external services',
    content: (
      <>
        <p>
          Newsletter forms, videos, search, support, course, and consultation services may be
          provided by third parties such as Brevo, YouTube, Algolia, Ko-fi, Topmate, and Udemy.
          These services may use their own cookies or storage when their content loads or when you
          interact with them.
        </p>
        <p>
          External services control their own cookies. Review their notices and browser controls
          before submitting information or completing a transaction.
        </p>
      </>
    ),
  },
  {
    id: 'browser-controls',
    title: 'Browser controls',
    content: (
      <>
        <p>
          Most browsers let you inspect, block, or delete cookies and local storage. Blocking all
          storage may cause preferences or third-party forms to stop working as expected.
        </p>
        <p>
          Clearing this site's data removes the saved theme preference, so the site returns to its
          default appearance on your next visit.
        </p>
      </>
    ),
  },
  {
    id: 'changes-and-contact',
    title: 'Changes and contact',
    content: (
      <>
        <p>
          This policy may change when services or cookie behavior change. The updated date at the
          top identifies the latest version.
        </p>
        <p>
          For questions about cookies or analytics choices, use the{' '}
          <Link to="/feedback/">feedback page</Link>.
        </p>
      </>
    ),
  },
];

export default function CookiePolicy(): React.JSX.Element {
  return (
    <LegalPage
      title="Cookie Policy"
      description="How gauravkhurana.com handles cookies, local storage, cookieless analytics, and third-party services."
      lastUpdated="31 July 2026"
      sections={sections}
    />
  );
}