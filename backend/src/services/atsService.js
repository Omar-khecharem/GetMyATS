const { extractKeywords } = require('../utils/keywordExtractor');

const normalize = (text) => text.toLowerCase().trim();

const analyze = (cvText, jobDescription) => {
  const cv = normalize(cvText);
  const keywords = extractKeywords(jobDescription);

  const foundKeywords = keywords.filter((kw) => cv.includes(kw));
  const missingKeywords = keywords.filter((kw) => !cv.includes(kw));

  const score = keywords.length
    ? Math.round((foundKeywords.length / keywords.length) * 100)
    : 0;

  return {
    score,
    foundKeywords,
    missingKeywords,
    totalKeywords: keywords.length,
    strengths: foundKeywords,
    weaknesses: missingKeywords,
  };
};

module.exports = { analyze };
