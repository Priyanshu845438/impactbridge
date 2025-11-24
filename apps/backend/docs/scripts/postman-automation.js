// Postman Automation Script
// Usage: npm install -g newman && newman run docs/postman/impactbridge.postman_collection.json --folder "Automation Flow" --env-var base_url=http://localhost:3000 --reporters cli

const newman = require('newman');

newman.run(
  {
    collection: require('../postman/impactbridge.postman_collection.json'),
    environment: {
      values: [
        { key: 'base_url', value: 'http://localhost:3000', enabled: true },
        { key: 'token', value: '', enabled: true },
        { key: 'campaignId', value: '', enabled: true },
        { key: 'milestoneId', value: '', enabled: true },
      ],
    },
    folder: 'Automation Flow',
    reporters: 'cli',
    insecure: true,
  },
  (err) => {
    if (err) {
      throw err;
    }
    console.log('Automation Flow completed successfully.');
  },
);
