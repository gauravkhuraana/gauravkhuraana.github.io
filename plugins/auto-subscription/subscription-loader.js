const { getOptions } = require('loader-utils');

module.exports = function(source) {
  const options = getOptions(this) || {};
  
  // Skip if subscription already exists
  if (source.includes('SubscriptionForm') || source.includes('SimpleSubscriptionBox')) {
    return source;
  }
  
  // Don't add to certain pages
  if (source.includes('sidebar_position: 1') || 
      source.includes('title: Welcome to Sharing is Caring') ||
      source.includes('title: Share Your Feedback')) {
    return source;
  }
  
  // Add import at the top after existing imports
  let modifiedSource = source;
  
  // Check if it's a docs page or blog post
  const isDocsPage = this.resourcePath.includes('/docs/') && !this.resourcePath.includes('intro.mdx');
  const isBlogPost = this.resourcePath.includes('/blog/');
  
  if (isDocsPage || isBlogPost) {
    // Add import if not already present
    if (!modifiedSource.includes('import SubscriptionForm') && !modifiedSource.includes('import SimpleSubscriptionBox')) {
      const importLine = '\nimport SimpleSubscriptionBox from \'@site/src/components/SimpleSubscriptionBox\';\n';
      
      // Find the end of frontmatter and imports
      const frontmatterEnd = modifiedSource.indexOf('---', modifiedSource.indexOf('---') + 3) + 3;
      let insertPoint = frontmatterEnd;
      
      // Look for existing imports
      const importRegex = /^import .+$/gm;
      let lastImportMatch;
      let match;
      while ((match = importRegex.exec(modifiedSource)) !== null) {
        if (match.index > frontmatterEnd) {
          lastImportMatch = match;
        }
      }
      
      if (lastImportMatch) {
        insertPoint = lastImportMatch.index + lastImportMatch[0].length;
      }
      
      modifiedSource = modifiedSource.slice(0, insertPoint) + importLine + modifiedSource.slice(insertPoint);
    }
    
    // Add subscription component near the end
    const subscriptionComponent = `\n\n<SimpleSubscriptionBox 
  title="📧 Get Weekly Updates" 
  description="Join thousands of professionals getting practical testing and automation insights." 
/>\n`;
    
    // Find a good insertion point (before last heading or at the end)
    const connectSectionIndex = modifiedSource.lastIndexOf('## Connect');
    const additionalResourcesIndex = modifiedSource.lastIndexOf('## Additional Resources');
    const lastHeadingIndex = Math.max(connectSectionIndex, additionalResourcesIndex);
    
    if (lastHeadingIndex > -1) {
      modifiedSource = modifiedSource.slice(0, lastHeadingIndex) + subscriptionComponent + '\n' + modifiedSource.slice(lastHeadingIndex);
    } else {
      // Just add at the end
      modifiedSource += subscriptionComponent;
    }
  }
  
  return modifiedSource;
};
