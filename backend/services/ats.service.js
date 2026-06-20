const cloudflare = require('../config/cloudflare');
const { buildPrompt } = require('../utils/prompts/ats.prompt');

const MODEL = '@cf/meta/llama-3-8b-instruct';

const COMMON_KEYWORDS = [
  'leadership', 'management', 'project', 'team', 'communication',
  'problem', 'solving', 'analytical', 'strategy', 'planning',
  'budget', 'revenue', 'sales', 'marketing', 'customer',
  'software', 'development', 'agile', 'scrum', 'python',
  'javascript', 'react', 'node', 'sql', 'database',
  'cloud', 'aws', 'azure', 'docker', 'kubernetes',
  'api', 'rest', 'graphql', 'testing', 'deployment',
  'data', 'analysis', 'machine', 'learning', 'ai',
  'excel', 'powerpoint', 'presentation', 'negotiation', 'research',
  'design', 'ux', 'ui', 'product', 'operations',
  'finance', 'accounting', 'compliance', 'risk', 'audit',
  'human', 'resources', 'recruiting', 'training', 'mentoring',
];

const STOP_WORDS = new Set([
  'the', 'and', 'is', 'a', 'an', 'in', 'to', 'of', 'for', 'on', 'with',
  'at', 'by', 'as', 'or', 'it', 'its', 'be', 'are', 'was', 'were',
  'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
  'would', 'could', 'should', 'may', 'might', 'shall', 'can', 'not',
  'no', 'nor', 'but', 'if', 'so', 'up', 'out', 'about', 'into',
  'over', 'after', 'before', 'between', 'under', 'this', 'that',
  'these', 'those', 'from', 'than', 'then', 'also', 'very', 'just',
  'each', 'any', 'all', 'both', 'more', 'some', 'such', 'only',
  'own', 'same', 'too', 'other', 'here', 'there', 'when', 'where',
  'why', 'how', 'which', 'who', 'whom', 'what', 'we', 'you', 'he',
  'she', 'they', 'me', 'him', 'her', 'them', 'our', 'your', 'his',
  'my', 'need', 'needs', 'must', 'like', 'new', 'every', 'their',
]);

const generateImprovementTips = (missingKeywords) => {
  if (missingKeywords.length === 0) return ['Your CV covers all common ATS keywords.'];
  return missingKeywords.map((kw) => `Consider adding "${kw}" to your CV.`);
};

const analyzeWithAI = async (cvText) => {
  try {
    const prompt = buildPrompt(cvText);
    const result = await cloudflare.run(MODEL, prompt);

    let raw = result.response?.trim() || '';
    raw = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '');

    const parsed = JSON.parse(raw);
    const strengths = parsed.strengths ?? [];
    const missingKeywords = parsed.missingKeywords ?? [];
    return {
      score: parsed.score ?? 0,
      foundKeywords: strengths,
      missingKeywords,
      totalKeywords: strengths.length + missingKeywords.length,
      strengths,
      weaknesses: parsed.weaknesses ?? [],
      improvementTips: generateImprovementTips(missingKeywords),
    };
  } catch {
    return analyze(cvText);
  }
};

const analyze = (cvText) => {
  const cv = cvText.toLowerCase().trim();

  const foundKeywords = COMMON_KEYWORDS.filter((kw) => cv.includes(kw));
  const missingKeywords = COMMON_KEYWORDS.filter((kw) => !cv.includes(kw));

  const score = COMMON_KEYWORDS.length
    ? Math.round((foundKeywords.length / COMMON_KEYWORDS.length) * 100)
    : 0;

  return {
    score,
    foundKeywords,
    missingKeywords,
    totalKeywords: COMMON_KEYWORDS.length,
    strengths: foundKeywords,
    weaknesses: missingKeywords,
    improvementTips: generateImprovementTips(missingKeywords),
  };
};

module.exports = { analyze, analyzeWithAI };
