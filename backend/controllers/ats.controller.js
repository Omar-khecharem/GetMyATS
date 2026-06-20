const atsService = require('../services/ats.service');
const parserService = require('../services/parser.service');

const analyze = (req, res, next) => {
  try {
    const { cvText } = req.body;
    const data = atsService.analyze(cvText);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const analyzeWithAI = async (req, res, next) => {
  try {
    const { cvText } = req.body;
    const data = await atsService.analyzeWithAI(cvText);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const uploadCV = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No PDF file provided' });
    }

    const extractedText = await parserService.parsePDF(req.file.path);

    if (!extractedText || !extractedText.trim()) {
      return res.status(400).json({ success: false, error: 'Could not extract text from PDF. The file may be scanned or image-based.' });
    }

    res.status(200).json({ success: true, data: { extractedText: extractedText.trim() } });
  } catch (err) {
    next(err);
  }
};

module.exports = { analyze, analyzeWithAI, uploadCV };
