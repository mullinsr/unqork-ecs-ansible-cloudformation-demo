'use strict';

const express = require('express');
const app = express();

app.get('/qork', (req, res) => {
  res.status(200);
  res.sendFile('qork.jpg', { root: __dirname });
});

app.get('/health', (req, res) => {
  res.status(200);
  res.send('OK');
});

app.listen(3000);