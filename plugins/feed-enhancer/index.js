const fs = require('fs');
const path = require('path');

module.exports = function feedEnhancerPlugin(context, options) {
  return {
    name: 'feed-enhancer-plugin',
    async postBuild({siteDir, routesPaths, outDir}) {
      console.log('🔧 Running feed enhancer plugin...');
      
      // Enhance Atom feed with self-referencing link
      const atomFeedPath = path.join(outDir, 'blog', 'atom.xml');
      
      if (fs.existsSync(atomFeedPath)) {
        let atomContent = fs.readFileSync(atomFeedPath, 'utf8');
        console.log('📄 Found Atom feed at:', atomFeedPath);
        
        // Add atom:link with rel="self" after the alternate link
        const selfLink = `    <link rel="self" href="https://gauravkhuraana.github.io/blog/atom.xml"/>`;
        
        atomContent = atomContent.replace(
          /<link rel="alternate" href="https:\/\/gauravkhuraana\.github\.io\/blog"\/>/,
          match => `${match}\n${selfLink}`
        );
        
        fs.writeFileSync(atomFeedPath, atomContent);
        console.log('✅ Enhanced Atom feed with self-referencing link');
      } else {
        console.log('❌ Atom feed not found at:', atomFeedPath);
      }
      
      // Enhance RSS feed with self-referencing link
      const rssFeedPath = path.join(outDir, 'blog', 'rss.xml');
      
      if (fs.existsSync(rssFeedPath)) {
        let rssContent = fs.readFileSync(rssFeedPath, 'utf8');
        console.log('📄 Found RSS feed at:', rssFeedPath);
        
        // Add atom:link for RSS feed self-reference
        const selfLink = `        <atom:link href="https://gauravkhuraana.github.io/blog/rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom"/>`;
        
        rssContent = rssContent.replace(
          /<copyright>.*?<\/copyright>/,
          match => `${match}\n${selfLink}`
        );
        
        fs.writeFileSync(rssFeedPath, rssContent);
        console.log('✅ Enhanced RSS feed with self-referencing link');
      } else {
        console.log('❌ RSS feed not found at:', rssFeedPath);
      }
    },
  };
};
