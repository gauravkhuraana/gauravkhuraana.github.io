const fs = require('fs');
const path = require('path');

module.exports = function feedEnhancerPlugin(context, options) {
  const siteUrl = (context && context.siteConfig && context.siteConfig.url) || 'https://gauravkhurana.in';
  return {
    name: 'feed-enhancer-plugin',
    async postBuild({siteDir, routesPaths, outDir}) {
      console.log('🔧 Running feed enhancer plugin...');
      
      const blogBase = new URL('/blog', siteUrl).toString().replace(/\/$/, '');

      const sanitize = (xml) => {
        return xml
          // Remove inline SVGs that cause validation issues
          .replace(/<svg[\s\S]*?<\/svg>/gi, '')
          .replace(/<path[^>]*\/>/gi, '')
          .replace(/<path[^>]*><\/path>/gi, '')
          // Remove duplicated IDs or problematic attributes if any
          .replace(/ id="[^"]+"/g, '');
      };

      // Enhance Atom feed with self-referencing link
      const atomFeedPath = path.join(outDir, 'blog', 'atom.xml');
      
      if (fs.existsSync(atomFeedPath)) {
        let atomContent = fs.readFileSync(atomFeedPath, 'utf8');
        console.log('📄 Found Atom feed at:', atomFeedPath);
        
        const selfLink = `    <link rel="self" href="${blogBase}/atom.xml"/>`;
        
        const alternateRegex = new RegExp(`<link rel="alternate" href="${blogBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\/>`, 'i');
        atomContent = atomContent.replace(
          alternateRegex,
          match => `${match}\n${selfLink}`
        );

        atomContent = sanitize(atomContent);
        
        fs.writeFileSync(atomFeedPath, atomContent);
        console.log('✅ Enhanced Atom feed with self-referencing link and sanitized content');
      } else {
        console.log('❌ Atom feed not found at:', atomFeedPath);
      }
      
      // Enhance RSS feed with self-referencing link
      const rssFeedPath = path.join(outDir, 'blog', 'rss.xml');
      
      if (fs.existsSync(rssFeedPath)) {
        let rssContent = fs.readFileSync(rssFeedPath, 'utf8');
        console.log('📄 Found RSS feed at:', rssFeedPath);
        
        const selfLink = `        <atom:link href="${blogBase}/rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom"/>`;
        
        rssContent = rssContent.replace(
          /<copyright>.*?<\/copyright>/s,
          match => `${match}\n${selfLink}`
        );

        rssContent = sanitize(rssContent);
        
        fs.writeFileSync(rssFeedPath, rssContent);
        console.log('✅ Enhanced RSS feed with self-referencing link and sanitized content');
      } else {
        console.log('❌ RSS feed not found at:', rssFeedPath);
      }
    },
  };
};
