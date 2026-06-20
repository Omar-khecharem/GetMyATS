const buildPrompt = (cvText) => ({
  messages: [
    {
      role: 'system',
      content: 'You are an ATS expert. Analyze the CV against common ATS criteria and industry standards. Respond ONLY with valid JSON, no text before or after.',
    },
    {
      role: 'user',
      content: `CV:\n${cvText}\n\nAnalyze this CV against common ATS keywords and industry best practices. Return JSON with: score (number 0-100), strengths ([] of keywords found), weaknesses ([] of areas to improve), missingKeywords ([] of important missing keywords).`,
    },
  ],
});

module.exports = { buildPrompt };
