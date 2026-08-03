#!/usr/bin/env node

/**
 * Feed Validation Script
 * Tests RSS and Atom feeds for proper structure and accessibility
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const REMOTE_FEEDS = {
  rss: 'https://gauravkhurana.com/blog/rss.xml',
  atom: 'https://gauravkhurana.com/blog/atom.xml'
};

const LOCAL_FEEDS = {
  rss: path.join(__dirname, '..', 'build', 'blog', 'rss.xml'),
  atom: path.join(__dirname, '..', 'build', 'blog', 'atom.xml')
};

function hasValidStructure(name, data) {
  const rootElement = name === 'rss' ? '<rss' : '<feed';
  return data.includes('<?xml') && data.includes(rootElement);
}

async function testFeed(name, url) {
  return new Promise((resolve) => {
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
          
          if (hasValidStructure(name, data)) {
            console.log(`   Structure: Valid XML`);
          } else {
            console.log(`   ❌ Structure: Invalid XML`);
            console.log('');
            resolve({ name, url, status: 'error', error: 'Invalid XML structure' });
            return;
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

async function testLocalFeed(name, filePath) {
  console.log(`Testing ${name.toUpperCase()} feed: ${filePath}`);

  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    if (!hasValidStructure(name, data)) {
      console.log('   ❌ Structure: Invalid XML\n');
      return { name, filePath, status: 'error', error: 'Invalid XML structure' };
    }

    console.log(`   Content-Length: ${data.length} bytes`);
    console.log('   Structure: Valid XML\n');
    return { name, filePath, status: 'success', size: data.length };
  } catch (error) {
    console.log(`   ❌ Feed error: ${error.message}\n`);
    return { name, filePath, status: 'error', error: error.message };
  }
}

async function validateFeeds({ local = false } = {}) {
  console.log(`🔍 Validating ${local ? 'local build' : 'production'} blog feeds\n`);
  
  const results = [];
  const feeds = local ? LOCAL_FEEDS : REMOTE_FEEDS;
  
  for (const [name, location] of Object.entries(feeds)) {
    const result = local
      ? await testLocalFeed(name, location)
      : await testFeed(name, location);
    results.push(result);
  }
  
  console.log('📊 Summary:');
  results.forEach(result => {
    const status = result.status === 'success' ? '✅' : '❌';
    console.log(`   ${status} ${result.name.toUpperCase()}: ${result.status}`);
  });

  if (results.some((result) => result.status === 'error')) {
    throw new Error('One or more feed validations failed.');
  }
  
  if (!local) {
    console.log('\n📝 Integration URLs:');
    console.log('   RSS:  https://gauravkhurana.com/blog/rss.xml');
    console.log('   Atom: https://gauravkhurana.com/blog/atom.xml');
    console.log('   Info: https://gauravkhurana.com/feeds');
  }
}

// Run if called directly
if (require.main === module) {
  validateFeeds({ local: process.argv.includes('--local') }).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { validateFeeds, testFeed, testLocalFeed };
