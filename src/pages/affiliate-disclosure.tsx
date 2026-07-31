import React from 'react';
import Link from '@docusaurus/Link';
import LegalPage, { type LegalSection } from '@site/src/components/LegalPage';

const sections: LegalSection[] = [
  {
    id: 'clear-disclosure',
    title: 'Clear disclosure',
    content: (
      <p>
        Some links on gauravkhurana.com may be affiliate or promotional links. If you use an
        eligible affiliate link and complete a purchase, Gaurav Khurana may receive a commission at
        no additional cost to you. Not every external or product link is an affiliate link.
      </p>
    ),
  },
  {
    id: 'direct-offerings',
    title: 'Direct courses and services',
    content: (
      <p>
        The site also links to courses, consultations, and other offerings created or delivered by
        Gaurav Khurana through platforms such as Topmate or Udemy. Revenue from those direct
        offerings is not an affiliate commission, but it is a financial relationship and is
        disclosed here for clarity.
      </p>
    ),
  },
  {
    id: 'recommendations',
    title: 'Recommendations and editorial independence',
    content: (
      <>
        <p>
          Recommendations are selected for relevance to software testing, automation, DevOps, AI,
          learning, or professional development. A potential commission does not change the price
          you pay and does not guarantee a positive recommendation.
        </p>
        <p>
          Readers should evaluate whether a product, course, book, or service fits their own needs,
          budget, location, and technical environment before purchasing.
        </p>
      </>
    ),
  },
  {
    id: 'sponsored-content',
    title: 'Sponsored content and samples',
    content: (
      <p>
        Paid sponsorships, complimentary access, review copies, or other material relationships
        will be disclosed near the relevant content when they apply. Acceptance of access or a
        sample does not guarantee coverage or a favorable opinion.
      </p>
    ),
  },
  {
    id: 'pricing-and-third-parties',
    title: 'Pricing and third-party responsibility',
    content: (
      <p>
        Prices, discounts, coupon codes, availability, and terms are controlled by the destination
        platform and may change without notice. The third party is responsible for checkout,
        fulfillment, refunds, and account support under its own policies.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Questions about a link',
    content: (
      <p>
        If you are unsure whether a link represents an affiliate, promotional, or direct financial
        relationship, ask through the <Link to="/feedback/">feedback page</Link> before purchasing.
      </p>
    ),
  },
];

export default function AffiliateDisclosure(): React.JSX.Element {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      description="How affiliate links, direct course sales, sponsorships, and recommendations are disclosed on gauravkhurana.com."
      lastUpdated="31 July 2026"
      sections={sections}
    />
  );
}