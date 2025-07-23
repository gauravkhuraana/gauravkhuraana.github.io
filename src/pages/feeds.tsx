import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Feeds(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const baseUrl = siteConfig.url + siteConfig.baseUrl;

  return (
    <Layout
      title="RSS & Atom Feeds"
      description="Subscribe to Gaurav Khurana's blog feeds for the latest insights on software testing, automation, DevOps, and AI tools">
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Blog Feeds</h1>
            <p>
              Stay updated with the latest content from Gaurav Khurana's blog on software testing, 
              test automation, DevOps, and AI tools. Choose your preferred feed format below:
            </p>

            <div className="row margin-vert--lg">
              <div className="col col--6">
                <div className="card">
                  <div className="card__header">
                    <h2>RSS Feed</h2>
                  </div>
                  <div className="card__body">
                    <p>
                      RSS (Really Simple Syndication) feed for blog updates. Compatible with most feed readers.
                    </p>
                    <p><strong>Feed URL:</strong></p>
                    <code>{baseUrl}blog/rss.xml</code>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--primary"
                      to="/blog/rss.xml"
                      target="_blank">
                      View RSS Feed
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col col--6">
                <div className="card">
                  <div className="card__header">
                    <h2>Atom Feed</h2>
                  </div>
                  <div className="card__body">
                    <p>
                      Atom feed format with enhanced metadata. Preferred by many modern feed readers.
                    </p>
                    <p><strong>Feed URL:</strong></p>
                    <code>{baseUrl}blog/atom.xml</code>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--primary"
                      to="/blog/atom.xml"
                      target="_blank">
                      View Atom Feed
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin-vert--lg">
              <h2>How to Use These Feeds</h2>
              <h3>For Personal Use</h3>
              <ul>
                <li>Copy the feed URL and add it to your favorite RSS/feed reader</li>
                <li>Popular feed readers: Feedly, Inoreader, NewsBlur, RSS Guard</li>
                <li>Most browsers also support RSS feeds natively</li>
              </ul>

              <h3>For Third-Party Sites</h3>
              <ul>
                <li>Use the feed URLs to automatically syndicate content</li>
                <li>Parse the XML to extract blog post data programmatically</li>
                <li>Both feeds include full content, metadata, and categories</li>
                <li>Feeds are updated automatically when new posts are published</li>
              </ul>

              <h3>Feed Features</h3>
              <ul>
                <li>📝 Full article content included</li>
                <li>🏷️ Categories and tags for each post</li>
                <li>📅 Publication dates and last update times</li>
                <li>👤 Author information</li>
                <li>🔗 Direct links to original posts</li>
                <li>📊 Limited to 10 most recent posts for performance</li>
              </ul>
            </div>

            <div className="margin-vert--lg">
              <h2>Need Help?</h2>
              <p>
                If you're having trouble with the feeds or need assistance integrating them into your site, 
                feel free to <Link to="/feedback">contact me</Link> or connect with me on{' '}
                <Link to="https://www.linkedin.com/in/gauravkhurana/" target="_blank">LinkedIn</Link>.
              </p>
            </div>

            <div className="margin-vert--lg">
              <h2>Other Ways to Stay Connected</h2>
              <div className="row">
                <div className="col col--3">
                  <Link 
                    to="https://newsletter.gauravkhurana.com/" 
                    className="button button--secondary button--block"
                    target="_blank">
                    Newsletter
                  </Link>
                </div>
                <div className="col col--3">
                  <Link 
                    to="https://www.youtube.com/@Udzial/playlists" 
                    className="button button--secondary button--block"
                    target="_blank">
                    YouTube
                  </Link>
                </div>
                <div className="col col--3">
                  <Link 
                    to="https://medium.com/@gauravkhuraana" 
                    className="button button--secondary button--block"
                    target="_blank">
                    Medium
                  </Link>
                </div>
                <div className="col col--3">
                  <Link 
                    to="https://www.linkedin.com/in/gauravkhurana/" 
                    className="button button--secondary button--block"
                    target="_blank">
                    LinkedIn
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
