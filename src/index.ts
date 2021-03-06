import express from 'express';
require('dotenv').config();

const PORT = process.env.API_PORT || 3000;
const app = express();

app.get('/', (_, res) => res.send('<h1>Hi there</h1>'));

app.listen(PORT, () => {
  console.log(`API listening @ ${PORT}`);
});
