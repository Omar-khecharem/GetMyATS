const atsService = require('../services/atsService');

const analyze = (req, res) => {
  const { cvText, jobDescription } = req.body;

  if (!cvText || !jobDescription) {
    return res.status(400).json({ error: 'cvText and jobDescription are required' });
  }

  const result = atsService.analyze(cvText, jobDescription);

  res.json(result);
};

module.exports = { analyze };
