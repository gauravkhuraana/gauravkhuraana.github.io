import React from 'react';
import Link from '@docusaurus/Link';
import LegalPage, { type LegalSection } from '@site/src/components/LegalPage';

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of these terms',
    content: (
      <p>
        By accessing gauravkhurana.com, you agree to these terms. If you do not agree, do not use
        the site. These terms apply to public articles, documentation, downloads, links, and other
        resources made available through the site.
      </p>
    ),
  },
  {
    id: 'personal-site',
    title: 'Personal site and educational content',
    content: (
      <>
        <p>
          This is the personal website of Gaurav Khurana. Opinions are personal and do not
          represent Microsoft or any other employer, client, or organization unless explicitly
          stated.
        </p>
        <p>
          Content is provided for general educational and informational purposes. It is not legal,
          financial, employment, certification, or other professional advice. Verify technical
          steps in a safe environment before using them in production.
        </p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    content: (
      <>
        <p>You may use the site only for lawful purposes. You must not:</p>
        <ul>
          <li>Attempt to disrupt, damage, bypass, or gain unauthorized access to the site.</li>
          <li>Use automated requests in a way that degrades service or ignores stated controls.</li>
          <li>Upload or transmit malware, unlawful material, or content that violates another person's rights.</li>
          <li>Misrepresent site content, authorship, endorsements, or affiliations.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property and sharing',
    content: (
      <>
        <p>
          Unless otherwise stated, original site text, branding, graphics, downloads, and course
          materials are owned by Gaurav Khurana or used with permission. Third-party names, code,
          media, and trademarks remain the property of their owners.
        </p>
        <p>
          You may link to public pages and quote short excerpts with clear attribution and a link
          to the source. Republishing substantial content, selling copies, or removing attribution
          requires prior written permission.
        </p>
      </>
    ),
  },
  {
    id: 'courses-and-services',
    title: 'Courses, mentoring, and purchases',
    content: (
      <>
        <p>
          Courses, consultations, donations, and other paid offerings may be delivered or processed
          by third-party platforms such as Topmate, Udemy, or Ko-fi. Their checkout terms, refund
          rules, availability, taxes, and account requirements apply to transactions on those
          platforms.
        </p>
        <p>
          Prices, coupons, schedules, and course contents may change. Review the destination page
          before making a purchase or booking.
        </p>
      </>
    ),
  },
  {
    id: 'external-links',
    title: 'External links and affiliate relationships',
    content: (
      <>
        <p>
          External links are provided for convenience and do not make this site responsible for
          another service's content, security, availability, or data practices.
        </p>
        <p>
          Some links may be promotional or affiliate links. Review the{' '}
          <Link to="/affiliate-disclosure/">Affiliate Disclosure</Link> for details.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    content: (
      <>
        <p>
          The site and its content are provided “as is” and “as available.” No guarantee is made
          that content is complete, current, error-free, continuously available, or suitable for a
          particular purpose.
        </p>
        <p>
          Technology changes quickly. Commands, interfaces, prices, policies, and external links
          may become outdated even when reasonable efforts are made to maintain content.
        </p>
      </>
    ),
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of liability',
    content: (
      <p>
        To the maximum extent permitted by applicable law, Gaurav Khurana is not liable for
        indirect, incidental, special, consequential, or lost-profit damages arising from use of
        the site, reliance on its content, or interaction with external services. Nothing in these
        terms excludes liability that cannot legally be excluded.
      </p>
    ),
  },
  {
    id: 'changes-and-contact',
    title: 'Changes and contact',
    content: (
      <>
        <p>
          These terms may be updated as the site and its offerings change. Continued use after an
          update means the revised terms apply from the date shown above.
        </p>
        <p>
          Questions about these terms can be submitted through the{' '}
          <Link to="/feedback/">feedback page</Link>.
        </p>
      </>
    ),
  },
];

export default function TermsOfUse(): React.JSX.Element {
  return (
    <LegalPage
      title="Terms of Use"
      description="The terms for using gauravkhurana.com, its educational content, external links, courses, and services."
      lastUpdated="31 July 2026"
      sections={sections}
    />
  );
}