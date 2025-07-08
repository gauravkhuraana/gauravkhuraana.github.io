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
  title = 'Gaurav Khurana - Testing & Automation Expert',
  description = 'Get battle-tested tips from 15+ years in automation, directly from a Microsoft Test Consultant. Learn testing fundamentals, automation mastery, and AI tools.',
  keywords = 'software testing, test automation, DevOps, QA, quality assurance, automation frameworks, testing tools, career guidance, AI tools, selenium, cypress, API testing, performance testing, Microsoft test consultant, Gaurav Khurana',
  image = 'https://gauravkhuraana.github.io/img/gauravkhurana.png',
  url = 'https://gauravkhuraana.github.io',
  type = 'website',
  author = 'Gaurav Khurana',
  publishedTime,
  modifiedTime,
  section,
  tags,
}) => {
  const siteTitle = 'gauravkhurana.in';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@gauravkhuraana" />
      <meta property="twitter:site" content="@gauravkhuraana" />

      {/* Additional SEO tags */}
      <meta name="theme-color" content="#25c2a0" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="msapplication-TileColor" content="#25c2a0" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'BlogPosting' : 'WebPage',
          headline: fullTitle,
          description: description,
          image: image,
          url: url,
          author: {
            '@type': 'Person',
            name: author,
            url: 'https://gauravkhuraana.github.io',
            sameAs: [
              'https://www.linkedin.com/in/gauravkhurana/',
              'https://github.com/gauravkhuraana',
              'https://www.youtube.com/@Udzial',
              'https://medium.com/@gauravkhuraana',
              'https://x.com/gauravkhuraana'
            ]
          },
          publisher: {
            '@type': 'Person',
            name: 'Gaurav Khurana',
            logo: {
              '@type': 'ImageObject',
              url: 'https://gauravkhuraana.github.io/img/gauravkhurana.png'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url
          },
          ...(publishedTime && { datePublished: publishedTime }),
          ...(modifiedTime && { dateModified: modifiedTime }),
          ...(tags && { keywords: tags.join(', ') })
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
