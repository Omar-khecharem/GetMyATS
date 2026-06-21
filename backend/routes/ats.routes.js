const { Router } = require('express');
const upload = require('../middleware/upload');
const { analyze, analyzeWithAI, uploadCV, matchWithJob, enhanceBullet, generateInterviewQuestions, interviewChat, validatePromo } = require('../controllers/ats.controller');

const router = Router();

const validateAnalyze = (req, res, next) => {
  const { cvText } = req.body;

  if (!cvText || typeof cvText !== 'string' || !cvText.trim()) {
    return res.status(400).json({ success: false, error: 'cvText is required and must be a non-empty string' });
  }

  req.body.cvText = cvText.trim();
  next();
};

router.post('/analyze', validateAnalyze, analyze);
router.post('/analyze-ai', validateAnalyze, analyzeWithAI);
router.post('/upload-cv', upload.single('cv'), uploadCV);
router.post('/match-job', matchWithJob);
router.post('/enhance-bullet', enhanceBullet);
router.post('/interview-questions', generateInterviewQuestions);
router.post('/interview-chat', interviewChat);
router.post('/validate-promo', validatePromo);

module.exports = router;
