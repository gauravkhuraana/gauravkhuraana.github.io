import React from 'react';
import Link from '@docusaurus/Link';
import LegalPage, { type LegalSection } from '@site/src/components/LegalPage';

const sections: LegalSection[] = [
  {
    id: 'scope',
    title: 'Scope and operator',
    content: (
      <>
        <p>
          This policy explains how gauravkhurana.com collects, uses, and protects information.
          The personal site is operated by Gaurav Khurana and is not a Microsoft website.
        </p>
        <p>
          This policy covers the website, newsletter forms, feedback channels, and interactions
          with links or embedded services on the site.
        </p>
      </>
    ),
  },
  {
    id: 'information-collected',
    title: 'Information collected',
    content: (
      <>
        <p>Information may be collected in the following ways:</p>
        <ul>
          <li>Information you submit, such as your email address through a newsletter form.</li>
          <li>Messages and details you choose to provide through feedback or contact channels.</li>
          <li>Aggregated usage data, such as pages viewed, device type, and referral source.</li>
          <li>Technical logs processed by hosting and security providers, such as IP address, browser type, and request time.</li>
        </ul>
        <p>The site does not sell personal information.</p>
      </>
    ),
  },
  {
    id: 'use-of-information',
    title: 'How information is used',
    content: (
      <ul>
        <li>Deliver newsletters or resources you request.</li>
        <li>Respond to questions, feedback, and support requests.</li>
        <li>Understand which content is useful and improve the website.</li>
        <li>Protect the site, prevent abuse, and diagnose technical problems.</li>
        <li>Meet legal obligations and enforce applicable terms.</li>
      </ul>
    ),
  },
  {
    id: 'analytics',
    title: 'Analytics',
    content: (
      <>
        <p>
          Site statistics are collected with Umami, a privacy-focused analytics service. It does
          not set cookies, does not store an identifier in your browser, and does not build a
          profile of you across other websites, so no consent banner is needed. See the{' '}
          <Link to="/cookies/">cookie policy</Link> for details.
        </p>
        <p>
          The data is used in aggregate to understand site traffic and content performance. If you
          prefer not to be counted, a content blocker or privacy extension will stop the script
          from loading.
        </p>
      </>
    ),
  },
  {
    id: 'newsletter-and-forms',
    title: 'Newsletter and forms',
    content: (
      <>
        <p>
          Newsletter subscriptions are processed by Brevo. Brevo receives the details you submit
          and processes them to deliver requested emails. Each marketing email should include an
          unsubscribe option.
        </p>
        <p>
          Do not submit sensitive personal information through newsletter, feedback, or public
          contact forms.
        </p>
      </>
    ),
  },
  {
    id: 'service-providers',
    title: 'Service providers and external links',
    content: (
      <>
        <p>
          The site may rely on hosting, analytics, email, search, video, payment, course, and
          consultation providers. These providers process information under their own terms and
          privacy policies. Examples include Umami, Brevo, YouTube, Ko-fi, Topmate, Udemy, and
          Algolia-powered services.
        </p>
        <p>
          When you follow an external link, the destination service controls its own data
          practices. Review that service's privacy notice before providing personal information.
        </p>
      </>
    ),
  },
  {
    id: 'retention-and-security',
    title: 'Retention and security',
    content: (
      <>
        <p>
          Information is kept only as long as reasonably needed for the purpose it was collected,
          legal obligations, dispute resolution, or security. Newsletter records may remain until
          you unsubscribe or request deletion, subject to suppression records needed to honor your
          choice.
        </p>
        <p>
          Reasonable technical and organizational safeguards are used, but no internet service can
          guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    id: 'rights-and-choices',
    title: 'Your rights and choices',
    content: (
      <>
        <p>
          Depending on where you live, you may have rights to access, correct, delete, restrict, or
          export personal information, object to certain processing, or withdraw consent.
        </p>
        <p>
          You can unsubscribe through an email footer or submit a privacy request through the{' '}
          <Link to="/feedback/">feedback page</Link>. Identity verification may be required before
          completing a request.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children’s privacy',
    content: (
      <p>
        The site is intended for a general professional audience and is not directed to children
        under 13. If you believe a child has submitted personal information, use the feedback page
        to request its removal.
      </p>
    ),
  },
  {
    id: 'changes-and-contact',
    title: 'Changes and contact',
    content: (
      <>
        <p>
          This policy may be updated as the site or applicable requirements change. Material
          updates will be reflected by the date at the top of this page.
        </p>
        <p>
          For privacy questions or requests, contact Gaurav Khurana through the{' '}
          <Link to="/feedback/">feedback page</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicy(): React.JSX.Element {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How gauravkhurana.com handles personal information, analytics choices, newsletter data, and privacy requests."
      lastUpdated="31 July 2026"
      sections={sections}
    />
  );
}