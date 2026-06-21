const buildPrompt = (cvText) => ({
  messages: [
    {
      role: 'system',
      content: 'You are an expert ATS consultant. Analyze the CV and return ONLY valid JSON. No other text.',
    },
    {
      role: 'user',
      content: `CV:\n${cvText}\n\nReturn JSON with this exact structure:
{
  "score": number 0-100,
  "strengths": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "improvementTips": ["Tip 1 with problem → fix", "Tip 2", "Tip 3"]
}

Rules for improvementTips (3-5 items only):
- If CV has "responsible for" or "managed" → suggest replacing with strong verbs like Led, Engineered, Delivered
- If CV lacks numbers/% → suggest adding metrics to bullet points
- If CV summary is generic → suggest writing a targeted summary
- If CV has first-person pronouns → suggest removing "I", "my"
- If CV section order is wrong → suggest reordering
- If no core competencies section → suggest adding one
- If CV is long → suggest trimming to 2 pages
- Always suggest 1 tip about adding quantifiable achievements`,
    },
  ],
});

const buildJobMatchPrompt = (cvText, jobDescription) => ({
  messages: [
    {
      role: 'system',
      content: 'You are an ATS matching expert. Compare a CV against a job description and respond ONLY with valid JSON, no text before or after.',
    },
    {
      role: 'user',
      content: `CV:\n${cvText}\n\nJOB DESCRIPTION:\n${jobDescription}\n\nAnalyze how well this CV matches the job description. Return JSON with: matchScore (number 0-100), matchedSkills ([] of skills from CV that match the job), missingSkills ([] of required skills missing from CV), extraSkills ([] of relevant CV skills not mentioned in the job), recommendations ([] of specific suggestions to improve the CV for this job).`,
    },
  ],
});

const buildEnhancePrompt = (bulletText, context) => ({
  messages: [
    {
      role: 'system',
      content: 'You are a professional CV writer and copywriter. Transform weak bullet points into powerful, achievement-oriented statements. Respond ONLY with valid JSON.',
    },
    {
      role: 'user',
      content: `Original: "${bulletText}"\n${context ? `Job Context: ${context}\n` : ''}\n\nRewrite this bullet point to be powerful and ATS-friendly. Return JSON with:\n- original: the original text\n- enhanced: the rewritten version\n- verb: the main action verb used\n- impact: what impact/result it shows\n- why: brief explanation of why this version is stronger (1 sentence)`,
    },
  ],
});

const buildInterviewPrompt = (cvText, jobDescription) => ({
  messages: [
    {
      role: 'system',
      content: 'You are a senior technical interviewer and career coach. Generate realistic interview questions based on the CV and job description. Respond ONLY with valid JSON.',
    },
    {
      role: 'user',
      content: `CV:\n${cvText}\n\nJOB DESCRIPTION:\n${jobDescription}\n\nGenerate interview preparation material. Return JSON with:\n- role: the job title being applied for\n- likelyQuestions ([] of {question: string, why: string, tips: string}): 8-10 realistic interview questions with why they're asked and how to answer\n- talkingPoints ([] of {point: string, context: string}): 5 key talking points the candidate should prepare based on matching their CV to this job\n- redFlags ([] of {issue: string, advice: string}): potential concerns an interviewer might raise and how to address them`,
    },
  ],
});

const buildInterviewChatPrompt = (cvText, jobDescription, history, latestAnswer) => {
  const roleMatch = jobDescription.match(/(job title|title|position|role):\s*([^\n]+)/i);
  const jobTitle = roleMatch ? roleMatch[2].trim() : 'the position';

  const historyText = history.map((h) => `Interviewer: ${h.question}\nCandidate: ${h.answer}`).join('\n\n');

  return {
    messages: [
      {
        role: 'system',
        content: `You are a professional interviewer conducting a job interview for ${jobTitle}. You are friendly but thorough. Use the candidate's CV and job description to ask relevant, specific questions. Acknowledge answers naturally before asking the next question. After 8-10 exchanges, wrap up the interview. Be encouraging but honest. Respond ONLY with valid JSON.`,
      },
      {
        role: 'user',
        content: `CV:\n${cvText}\n\nJOB DESCRIPTION:\n${jobDescription}\n\n${historyText ? `INTERVIEW SO FAR:\n${historyText}\n\n` : ''}Candidate's latest answer: "${latestAnswer}"\n\nRespond as the interviewer. If no questions have been asked yet (history is empty), greet the candidate and ask the first question. Otherwise, respond to their answer naturally and ask the next question. Return JSON: { "message": string, "questionCount": number, "isComplete": boolean, "feedback": string (only if isComplete, brief 2-3 sentence performance summary) }`,
      },
    ],
  };
};

module.exports = { buildPrompt, buildJobMatchPrompt, buildEnhancePrompt, buildInterviewPrompt, buildInterviewChatPrompt };
