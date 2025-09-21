# Algolia Crawler Configuration Instructions for gauravkhurana.in

## Issue: Algolia Ignoring Redirects and Canonical Links

### Problem
Your crawler was indexing both redirect sources and final destinations, creating duplicate content and incorrect URLs in search results.

### Solution Applied

#### 1. **Canonical Link Handling**
```javascript
ignoreCanonicalTo: false  // Now respects canonical links
```

#### 2. **Redirect Following**
```javascript
followRedirects: true     // Follows redirects to final destination
```

#### 3. **URL Exclusion Patterns**
Added exclusion patterns to prevent indexing redirect URLs:
```javascript
exclusionPatterns: [
  'https://gauravkhurana.in/docs/intro',  // Specific redirect
  'https://gauravkhurana.in/docs/*/[^/]$', // URLs without trailing slash
]
```

#### 4. **Enhanced Record Extractor**
Added canonical URL checking in the record extractor:
```javascript
// Check for canonical URL and use it if different from current URL
const canonicalUrl = $('link[rel="canonical"]').attr('href');
if (canonicalUrl && canonicalUrl !== url) {
  // Skip indexing if this is not the canonical version
  return [];
}
```

### How to Apply These Changes

1. **Go to Algolia Dashboard**: https://www.algolia.com/apps/VKK8T551TZ/crawler
2. **Update your crawler configuration** with the content from `algolia-crawler-config.js`
3. **Replace `YOUR_ADMIN_API_KEY`** with your actual Admin API key
4. **Test the crawler** on a few URLs to ensure it's working correctly
5. **Run a full re-crawl** to clean up existing duplicate content

### Additional Recommendations

#### For Docusaurus Sites:
Add proper canonical URLs in your `docusaurus.config.ts`:
```typescript
// In your preset configuration
docs: {
  // ... other config
  editUrl: undefined, // Remove edit URLs if causing issues
},
```

#### Monitor Crawler Behavior:
- Check crawler logs for redirect handling
- Monitor index size reduction after re-crawl
- Verify search results show correct URLs

### Testing
After applying the configuration:
1. **Search for content** that previously had duplicates
2. **Check URLs** in search results are the canonical versions
3. **Monitor index size** - should decrease as duplicates are removed

### Expected Results
- ✅ No duplicate content in search results
- ✅ All URLs in search results are canonical versions
- ✅ Redirects properly followed to final destinations
- ✅ Cleaner, more accurate search index