'use strict';

const express = require('express');
const app = express();

app.get('/unqork', (req, res) => {
  res.status(200);
  res.sendFile('unqork.jpg', { root: __dirname });
});

app.get('/health', (req, res) => {
  res.status(200);
  res.send('OK');
});

app.listen(3000);