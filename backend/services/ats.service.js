const cloudflare = require('../config/cloudflare');
const { buildPrompt, buildJobMatchPrompt, buildEnhancePrompt, buildInterviewPrompt, buildInterviewChatPrompt } = require('../utils/prompts/ats.prompt');

const MODEL = '@cf/meta/llama-3.1-8b-instruct-fast';

const extractResponse = (result) => {
  if (typeof result.response === 'string') return result.response;
  if (result.choices?.[0]?.message?.content) return result.choices[0].message.content;
  return '';
};

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

const analyzeWithAI = async (cvText) => {
  try {
    const prompt = buildPrompt(cvText);
    const result = await cloudflare.run(MODEL, prompt);

    let raw = extractResponse(result);
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
      improvementTips: parsed.improvementTips ?? ['Your CV covers all common ATS keywords.'],
    };
  } catch (err) {
    console.error('[AI FALLBACK] analyzeWithAI failed:', err.message);
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

  const tips = [];
  if (!/led|managed|developed|created|designed|implemented|delivered|launched|built|engineered|optimized|increased|improved|reduced|generated|achieved|established|spearheaded/.test(cv)) {
    tips.push('Your CV lacks strong action verbs. Replace passive phrases (e.g. "Was responsible for") with powerful verbs like Led, Engineered, Delivered, Optimized.');
  }
  if (!/\d+%|\$\d+|\d+x|\d+ percent|\d+ people|\d+ team|\d+ million|\d+ thousand/.test(cv)) {
    tips.push('Add measurable achievements with numbers: "Increased sales by 30%", "Managed a team of 12", "Reduced costs by $50K".');
  }
  if (/\b(i|my|me|we|our)\b/i.test(cv)) {
    tips.push('Remove first-person pronouns ("I", "my"). Use implied subject in bullet points: "Led a team..." instead of "I led a team...".');
  }
  if (cv.split(/\s+/).length > 400) {
    tips.push('Your CV is too long. Trim to 1-2 pages max — remove outdated roles or reduce older positions to 1 line each.');
  }
  if (!/profile|summary|objective|about/i.test(cv)) {
    tips.push('Add a professional summary at the top: 2-3 sentences highlighting your seniority, key skills, and target role.');
  }
  if (!/core competencies|skills|expertise|technologies/i.test(cv)) {
    tips.push('Add a "Core Competencies" section with relevant keywords — ATS scanners give heavy weight to this section.');
  }
  if (!/education|university|college|degree|bachelor|master/i.test(cv)) {
    tips.push('Add an Education section even if brief — many ATS filters require it.');
  }
  if (tips.length === 0) {
    tips.push('Your CV is well-structured! Consider tailoring it for each job application by mirroring keywords from the job description.');
  }

  return {
    score,
    foundKeywords,
    missingKeywords,
    totalKeywords: COMMON_KEYWORDS.length,
    strengths: foundKeywords,
    weaknesses: missingKeywords,
    improvementTips: tips,
  };
};

const matchWithJob = async (cvText, jobDescription) => {
  try {
    const prompt = buildJobMatchPrompt(cvText, jobDescription);
    const result = await cloudflare.run(MODEL, prompt);

    let raw = extractResponse(result);
    raw = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '');

    const parsed = JSON.parse(raw);
    return {
      matchScore: parsed.matchScore ?? 0,
      matchedSkills: parsed.matchedSkills ?? [],
      missingSkills: parsed.missingSkills ?? [],
      extraSkills: parsed.extraSkills ?? [],
      recommendations: parsed.recommendations ?? [],
    };
  } catch (err) {
    console.error('[AI FALLBACK] matchWithJob failed:', err.message);
    const cv = cvText.toLowerCase();
    const job = jobDescription.toLowerCase();
    const requiredWords = [...new Set(job.split(/\s+/).filter(w => w.length > 4 && !STOP_WORDS.has(w)))];
    const matched = requiredWords.filter(w => cv.includes(w));
    const missing = requiredWords.filter(w => !cv.includes(w));
    const matchScore = requiredWords.length ? Math.round((matched.length / requiredWords.length) * 100) : 0;

    return {
      matchScore,
      matchedSkills: matched.slice(0, 20),
      missingSkills: missing.slice(0, 20),
      extraSkills: [],
      recommendations: missing.slice(0, 5).map(w => `Consider adding "${w}" to your CV.`),
    };
  }
};

const enhanceBullet = async (bulletText, context) => {
  try {
    const prompt = buildEnhancePrompt(bulletText, context || '');
    const result = await cloudflare.run(MODEL, prompt);

    let raw = extractResponse(result);
    raw = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '');

    return JSON.parse(raw);
  } catch (err) {
    console.error('[AI FALLBACK] enhanceBullet failed:', err.message);
    const verbs = ['Led', 'Developed', 'Implemented', 'Optimized', 'Engineered', 'Delivered', 'Designed', 'Launched'];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    return {
      original: bulletText,
      enhanced: `${verb} ${bulletText.replace(/^(responsible for |managed |handled |worked on )/i, '').toLowerCase()}, resulting in measurable improvements.`,
      verb,
      impact: 'Shows leadership and direct contribution',
      why: 'Strong action verbs instantly grab recruiter attention and convey ownership.',
    };
  }
};

const generateInterviewQuestions = async (cvText, jobDescription) => {
  try {
    const prompt = buildInterviewPrompt(cvText, jobDescription);
    const result = await cloudflare.run(MODEL, prompt);

    let raw = extractResponse(result);
    raw = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '');

    return JSON.parse(raw);
  } catch (err) {
    console.error('[AI FALLBACK] generateInterviewQuestions failed:', err.message);
    return {
      role: 'Target Position',
      likelyQuestions: [
        { question: 'Tell me about yourself.', why: 'Standard opener to assess fit.', tips: 'Connect your CV narrative to this role in 60 seconds.' },
        { question: 'Why are you interested in this role?', why: 'Measures motivation.', tips: 'Reference specific points from the job description.' },
      ],
      talkingPoints: [
        { point: 'Your relevant experience', context: 'Align your background with the job requirements.' },
      ],
      redFlags: [
        { issue: 'Potential skill gaps', advice: 'Be honest about learning new skills.' },
      ],
    };
  }
};

const interviewChat = async (cvText, jobDescription, history, latestAnswer) => {
  try {
    const prompt = buildInterviewChatPrompt(cvText, jobDescription, history, latestAnswer);
    const result = await cloudflare.run(MODEL, prompt);

    let raw = extractResponse(result);
    raw = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '');

    return JSON.parse(raw);
  } catch (err) {
    console.error('[AI FALLBACK] interviewChat failed:', err.message);
    const qs = [
      'Tell me about yourself and why you applied for this role.',
      'What relevant experience do you have for this position?',
      'Describe a challenging project you worked on and how you handled it.',
      'Where do you see yourself in 5 years?',
      'Do you have any questions for me?',
    ];
    const count = history.length;
    if (count >= qs.length) {
      return { message: 'Thank you for your time. We will be in touch.', questionCount: count, isComplete: true, feedback: 'You participated well. Consider preparing more specific examples of your work.' };
    }
    return { message: qs[count], questionCount: count + 1, isComplete: false, feedback: '' };
  }
};

module.exports = { analyze, analyzeWithAI, matchWithJob, enhanceBullet, generateInterviewQuestions, interviewChat };
