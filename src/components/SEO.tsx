import React from 'react';
import {Helmet} from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title = 'Gaurav Khurana - Testing & Automation Practitioner',
  description = 'Get battle-tested tips from 15+ years in automation, directly from a Microsoft Test Consultant. Learn testing fundamentals, automation mastery, and AI tools.',
  keywords = 'software testing, test automation, DevOps, QA, quality assurance, automation frameworks, testing tools, career guidance, AI tools, selenium, cypress, API testing, performance testing, Microsoft test consultant, Gaurav Khurana',
  image = 'https://gauravkhurana.in/img/gauravkhurana.png',
  url = 'https://gauravkhurana.in',
  type = 'website',
  author = 'Gaurav Khurana',
  publishedTime,
  modifiedTime,
  section,
  tags,
}) => {
  const siteTitle = 'gauravkhurana.in';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  
  // Safely handle all values to avoid Symbol conversion issues
  const safeTitle = String(fullTitle);
  const safeDescription = String(description);
  const safeKeywords = String(keywords);
  const safeAuthor = String(author);
  const safeUrl = String(url);
  const safeImage = String(image);
  const safeSection = section ? String(section) : '';
  const safeTags = Array.isArray(tags) ? tags.map(tag => String(tag)) : [];
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{safeTitle}</title>
      <meta name="title" content={safeTitle} />
      <meta name="description" content={safeDescription} />
      <meta name="keywords" content={safeKeywords} />
      <meta name="author" content={safeAuthor} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={safeUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={safeUrl} />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image" content={safeImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {safeAuthor && <meta property="article:author" content={safeAuthor} />}
          {safeSection && <meta property="article:section" content={safeSection} />}
          {safeTags.map((tag, index) => (
            <meta key={`tag-${index}`} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={safeUrl} />
      <meta property="twitter:title" content={safeTitle} />
      <meta property="twitter:description" content={safeDescription} />
      <meta property="twitter:image" content={safeImage} />
      <meta property="twitter:creator" content="@gauravkhuraana" />
      <meta property="twitter:site" content="@gauravkhuraana" />

      {/* Additional SEO tags */}
      <meta name="theme-color" content="#25c2a0" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="msapplication-TileColor" content="#25c2a0" />
    </Helmet>
  );
};

export default SEO;
