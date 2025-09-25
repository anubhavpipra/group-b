const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const ssm = new AWS.SSM();
const port = process.env.PORT || 3000;

let dbConfigured = '',
  environment = '',
  name = '';

// Load parameters from Parameter Store
ssm.getParameters({
  Names: ['/group-b/environment', '/group-b/name', '/group-b/dbConfigured'],
  WithDecryption: true
}).promise().then(data => {
  environment = data.Parameters[0].Value;
  name = data.Parameters[1].Value;
  dbConfigured = data.Parameters[2].Value;
  console.log('Parameters loaded from Parameter Store');
}).catch(err => {
  console.error('Error loading parameter:', err);
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello, ${name}!</h1>
    <p>Environment: ${environment}</p>
    <p>DB Configured: ${dbConfigured}</p>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    dbConfigured: dbConfigured,
    timestamp: new Date()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});