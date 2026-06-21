const fs = require('fs');
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

    const filePath = req.file.path;
    const extractedText = await parserService.parsePDF(filePath);

    if (!extractedText || !extractedText.trim()) {
      return res.status(400).json({ success: false, error: 'Could not extract text from PDF. The file may be scanned or image-based.' });
    }

    res.status(200).json({ success: true, data: { extractedText: extractedText.trim() } });
  } catch (err) {
    next(err);
  } finally {
    if (req.file?.path) {
      fs.unlink(req.file.path, () => {});
    }
  }
};

const matchWithJob = async (req, res, next) => {
  try {
    const { cvText, jobDescription } = req.body;
    if (!cvText || !cvText.trim()) {
      return res.status(400).json({ success: false, error: 'cvText is required' });
    }
    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ success: false, error: 'jobDescription is required' });
    }
    const data = await atsService.matchWithJob(cvText.trim(), jobDescription.trim());
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const enhanceBullet = async (req, res, next) => {
  try {
    const { bulletText, context } = req.body;
    if (!bulletText || !bulletText.trim()) {
      return res.status(400).json({ success: false, error: 'bulletText is required' });
    }
    const data = await atsService.enhanceBullet(bulletText.trim(), context?.trim() || '');
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const generateInterviewQuestions = async (req, res, next) => {
  try {
    const { cvText, jobDescription } = req.body;
    if (!cvText || !cvText.trim() || !jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ success: false, error: 'cvText and jobDescription are required' });
    }
    const data = await atsService.generateInterviewQuestions(cvText.trim(), jobDescription.trim());
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const interviewChat = async (req, res, next) => {
  try {
    const { cvText, jobDescription, history, latestAnswer } = req.body;
    if (!cvText || !cvText.trim() || !jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ success: false, error: 'cvText and jobDescription are required' });
    }
    const data = await atsService.interviewChat(
      cvText.trim(),
      jobDescription.trim(),
      Array.isArray(history) ? history : [],
      latestAnswer || ''
    );
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const validatePromo = (req, res) => {
  const { code } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ success: false, error: 'code is required' });
  }

  const validCode = process.env.PROMO_CODE || 'isimgien';
  const bonus = parseInt(process.env.PROMO_BONUS, 10) || 10;

  if (code.trim().toLowerCase() === validCode.toLowerCase()) {
    return res.json({ success: true, bonus });
  }

  res.status(400).json({ success: false, error: 'Invalid promo code' });
};

module.exports = { analyze, analyzeWithAI, uploadCV, matchWithJob, enhanceBullet, generateInterviewQuestions, interviewChat, validatePromo };
