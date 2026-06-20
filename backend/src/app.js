const express = require('express');
const cors = require('cors');
const atsRoutes = require('./routes/atsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/ats', atsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
