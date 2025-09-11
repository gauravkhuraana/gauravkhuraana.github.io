// Test script to check Algolia configuration
const https = require('https');

const algoliaConfig = {
  appId: 'C3WDSWBA63',
  apiKey: '21d494c97a0ebf8a1d4f6057aa4b16da',
  indexName: 'gauravkhuraanaio'
};

const testQuery = {
  query: 'testing',
  hitsPerPage: 5
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

console.log('Testing Algolia configuration...');
console.log('App ID:', algoliaConfig.appId);
console.log('Index Name:', algoliaConfig.indexName);
console.log('Testing query:', testQuery.query);

const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Response Headers:', res.headers);

  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('\n--- Algolia Response ---');
      console.log('Total Hits:', response.nbHits || 0);
      console.log('Processing Time (ms):', response.processingTimeMS || 'N/A');
      
      if (response.hits && response.hits.length > 0) {
        console.log('\n--- Sample Results ---');
        response.hits.slice(0, 3).forEach((hit, index) => {
          console.log(`${index + 1}. ${hit.hierarchy?.lvl1 || hit.title || 'No title'}`);
          console.log(`   URL: ${hit.url || 'No URL'}`);
        });
        console.log('\n✅ Algolia search is working properly!');
      } else {
        console.log('\n⚠️ No search results found. This could mean:');
        console.log('   1. The index is empty');
        console.log('   2. The search term doesn\'t match any content');
        console.log('   3. The index needs to be crawled/updated');
      }

      if (response.message) {
        console.log('\nError message:', response.message);
      }
    } catch (error) {
      console.error('Failed to parse response:', error.message);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  console.log('\nPossible issues:');
  console.log('   1. Network connectivity');
  console.log('   2. Incorrect API credentials');
  console.log('   3. Invalid index name');
});

req.write(JSON.stringify(testQuery));
req.end();
