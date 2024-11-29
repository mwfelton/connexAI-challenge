const express = require('express');
const cors = require('cors');
const prometheus = require('express-prometheus-middleware');

const app = express();
const port = 3001;

app.use(cors());

app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader !== 'mysecrettoken') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
});

app.use(prometheus({
  metricPath: '/metrics',
  collectDefaultMetrics: true,
}));

app.get('/time', (req, res) => {
  const serverTime = {
    epoch: Math.floor(Date.now() / 1000),
  };
  res.json(serverTime);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
