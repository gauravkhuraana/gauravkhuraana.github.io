# Blog Feeds Integration Guide

## Available Feeds

This blog provides both RSS and Atom feeds for content syndication and third-party integration.

### RSS Feed
- **URL**: `https://gauravkhuraana.github.io/blog/rss.xml`
- **Format**: RSS 2.0
- **Content**: Full articles with metadata
- **Update Frequency**: Automatic on new post publication

### Atom Feed
- **URL**: `https://gauravkhuraana.github.io/blog/atom.xml`
- **Format**: Atom 1.0
- **Content**: Full articles with enhanced metadata
- **Update Frequency**: Automatic on new post publication

## Feed Structure

Both feeds include:
- Article title and full content
- Publication date and last update
- Author information
- Categories and tags
- Direct links to original posts
- SEO-optimized descriptions

## Integration Examples

### JavaScript/Node.js
```javascript
const fetch = require('node-fetch');
const xml2js = require('xml2js');

async function fetchBlogPosts() {
  const response = await fetch('https://gauravkhuraana.github.io/blog/rss.xml');
  const xmlText = await response.text();
  
  xml2js.parseString(xmlText, (err, result) => {
    const posts = result.rss.channel[0].item;
    posts.forEach(post => {
      console.log({
        title: post.title[0],
        link: post.link[0],
        pubDate: post.pubDate[0],
        description: post.description[0]
      });
    });
  });
}
```

### Python
```python
import feedparser

def fetch_blog_posts():
    feed = feedparser.parse('https://gauravkhuraana.github.io/blog/rss.xml')
    
    for entry in feed.entries:
        print({
            'title': entry.title,
            'link': entry.link,
            'published': entry.published,
            'summary': entry.summary
        })
```

### PHP
```php
<?php
$rss = simplexml_load_file('https://gauravkhuraana.github.io/blog/rss.xml');

foreach ($rss->channel->item as $item) {
    echo "Title: " . $item->title . "\n";
    echo "Link: " . $item->link . "\n";
    echo "Date: " . $item->pubDate . "\n";
    echo "---\n";
}
?>
```

## Feed Validation

Both feeds are validated against:
- RSS 2.0 specification
- Atom 1.0 specification
- W3C Feed Validation Service

## Content Guidelines

Blog content focuses on:
- Software testing methodologies
- Test automation frameworks and tools
- DevOps practices and tools
- AI tools for testing and development
- Career guidance for QA professionals
- Industry best practices and insights

## Terms of Use

- Feeds are provided for legitimate content syndication
- Attribution to original source is required
- Commercial use permitted with proper attribution
- Do not republish full content without permission

## Support

For integration support or questions:
- Email: Contact via [website feedback form](https://gauravkhuraana.github.io/feedback)
- LinkedIn: [Connect with Gaurav Khurana](https://www.linkedin.com/in/gauravkhurana/)
- Professional consultation: [Book via Topmate](https://topmate.io/gauravkhurana)

## Technical Details

- **Feed Generator**: Docusaurus + @docusaurus/plugin-content-blog
- **Update Schedule**: Real-time on content publication
- **Item Limit**: 10 most recent posts
- **Character Encoding**: UTF-8
- **HTTP Caching**: Enabled
- **HTTPS**: Required

---

*Last updated: July 2025*
