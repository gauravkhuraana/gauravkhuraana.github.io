#!/usr/bin/env node

/**
 * Feed Validation Script
 * Tests RSS and Atom feeds for proper structure and accessibility
 */

const https = require('https');
const fs = require('fs');

const FEEDS = {
  rss: 'https://gauravkhurana.com/blog/rss.xml',
  atom: 'https://gauravkhurana.com/blog/atom.xml'
};

async function testFeed(name, url) {
  return new Promise((resolve, reject) => {
    console.log(`Testing ${name.toUpperCase()} feed: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ ${name} feed is accessible`);
          console.log(`   Status: ${res.statusCode}`);
          console.log(`   Content-Type: ${res.headers['content-type']}`);
          console.log(`   Content-Length: ${data.length} bytes`);
          
          // Basic XML validation
          if (data.includes('<?xml') && (data.includes('<rss') || data.includes('<feed'))) {
            console.log(`   Structure: Valid XML`);
          } else {
            console.log(`   ⚠️  Structure: Invalid XML`);
          }
          
          console.log('');
          resolve({ name, url, status: 'success', size: data.length });
        } else {
          console.log(`❌ ${name} feed failed: ${res.statusCode}`);
          resolve({ name, url, status: 'error', code: res.statusCode });
        }
      });
    }).on('error', (err) => {
      console.log(`❌ ${name} feed error: ${err.message}`);
      resolve({ name, url, status: 'error', error: err.message });
    });
  });
}

async function validateFeeds() {
  console.log('🔍 Validating Blog Feeds for gauravkhurana.com\n');
  
  const results = [];
  
  for (const [name, url] of Object.entries(FEEDS)) {
    const result = await testFeed(name, url);
    results.push(result);
  }
  
  console.log('📊 Summary:');
  results.forEach(result => {
    const status = result.status === 'success' ? '✅' : '❌';
    console.log(`   ${status} ${result.name.toUpperCase()}: ${result.status}`);
  });
  
  console.log('\n📝 Integration URLs:');
  console.log('   RSS:  https://gauravkhurana.com/blog/rss.xml');
  console.log('   Atom: https://gauravkhurana.com/blog/atom.xml');
  console.log('   Info: https://gauravkhurana.com/feeds');
  
  console.log('\n🔗 Quick Test Commands:');
  console.log('   curl -I https://gauravkhurana.com/blog/rss.xml');
  console.log('   curl -I https://gauravkhurana.com/blog/atom.xml');
}

// Run if called directly
if (require.main === module) {
  validateFeeds().catch(console.error);
}

module.exports = { validateFeeds, testFeed };
