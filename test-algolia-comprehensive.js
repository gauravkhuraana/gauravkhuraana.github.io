// Comprehensive Algolia test script - 10 searches for validation
const https = require('https');

const algoliaConfig = {
  appId: 'VKK8T551TZ',
  apiKey: '982441dae312c70847d2ddfe639dcac9',
  indexName: 'gauravkhurana_in_vkk8t551tz_pages'
};

const searchQueries = [
  'testing',
  'automation',
  'AI',
  'DevOps',
  'GitHub',
  'Selenium',
  'API',
  'Copilot',
  'QA',
  'framework'
];

async function performSearch(query, searchNumber) {
  return new Promise((resolve, reject) => {
    const testQuery = {
      query: query,
      hitsPerPage: 3,
      attributesToRetrieve: ['title', 'description', 'keywords', 'image'],
      attributesToHighlight: ['title', 'description'],
      attributesToSnippet: ['description:20']
    };

    const options = {
      hostname: `${algoliaConfig.appId}-dsn.algolia.net`,
      port: 443,
      path: `/1/indexes/${algoliaConfig.indexName}/query`,
      method: 'POST',
      headers: {
        'X-Algolia-Application-Id': algoliaConfig.appId,
        'X-Algolia-API-Key': algoliaConfig.apiKey,
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(testQuery).length
      }
    };

    console.log(`\n🔍 Search ${searchNumber}/10: "${query}"`);
    console.log('⏱️  Sending request...');

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log(`✅ Status: ${res.statusCode}`);
          console.log(`📊 Results: ${response.nbHits || 0} hits`);
          console.log(`⚡ Time: ${response.processingTimeMS || 'N/A'}ms`);
          
          if (response.hits && response.hits.length > 0) {
            console.log(`📝 Top result: ${response.hits[0].title || response.hits[0]._highlightResult?.title?.value || 'No title'}`);
          }
          
          resolve({
            query,
            success: true,
            hits: response.nbHits || 0,
            processingTime: response.processingTimeMS || 0
          });
        } catch (error) {
          console.log(`❌ Error parsing response for "${query}":`, error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Request error for "${query}":`, error.message);
      reject(error);
    });

    req.write(JSON.stringify(testQuery));
    req.end();
  });
}

async function runComprehensiveTest() {
  console.log('🚀 Starting Comprehensive Algolia Search Test');
  console.log('📋 Configuration:');
  console.log(`   App ID: ${algoliaConfig.appId}`);
  console.log(`   Index: ${algoliaConfig.indexName}`);
  console.log(`   Total Searches: ${searchQueries.length}`);
  console.log('=' * 50);

  const results = [];
  let totalProcessingTime = 0;
  let totalHits = 0;

  for (let i = 0; i < searchQueries.length; i++) {
    try {
      const result = await performSearch(searchQueries[i], i + 1);
      results.push(result);
      totalProcessingTime += result.processingTime;
      totalHits += result.hits;
      
      // Small delay between requests to be respectful
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      results.push({
        query: searchQueries[i],
        success: false,
        error: error.message
      });
    }
  }

  console.log('\n' + '=' * 60);
  console.log('📈 COMPREHENSIVE TEST SUMMARY');
  console.log('=' * 60);
  console.log(`✅ Successful searches: ${results.filter(r => r.success).length}/${searchQueries.length}`);
  console.log(`📊 Total hits across all searches: ${totalHits}`);
  console.log(`⚡ Average processing time: ${(totalProcessingTime / results.filter(r => r.success).length).toFixed(2)}ms`);
  
  console.log('\n📋 Detailed Results:');
  results.forEach((result, index) => {
    if (result.success) {
      console.log(`${index + 1}. "${result.query}" → ${result.hits} hits (${result.processingTime}ms)`);
    } else {
      console.log(`${index + 1}. "${result.query}" → ❌ FAILED: ${result.error}`);
    }
  });

  if (results.filter(r => r.success).length === searchQueries.length) {
    console.log('\n🎉 ALL TESTS PASSED! Algolia integration is working perfectly!');
  } else {
    console.log('\n⚠️  Some tests failed. Check the configuration and network connectivity.');
  }
}

runComprehensiveTest().catch(console.error);