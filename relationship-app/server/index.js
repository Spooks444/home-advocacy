const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const auth = require('./middleware/auth');
const privacy = require('./middleware/privacy');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*', methods: ['GET', 'POST', 'OPTIONS'] }));
app.use(express.json({ limit: '1mb' }));

app.use(privacy);
app.use('/api/relationship', auth, routes);

app.use((req, res) => res.status(404).json({ error: 'NOT_FOUND' }));
app.use((err, req, res, next) => {
  if (!err.status) err.status = 500;
  res.status(err.status).json({ error: 'SERVER_ERROR', message: err.message || 'Unexpected server error' });
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`relationship-app server listening on :${port}`));

module.exports = { app, server };
