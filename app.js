const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const name = process.env.NAME || 'Jyothi';
  const environment = process.env.NODE_ENV || 'development';
  
  res.send(`
    <h1>Hello, ${name}!</h1>
    <p>Environment: ${environment}</p>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});