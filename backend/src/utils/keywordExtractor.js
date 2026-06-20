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

const extractKeywords = (text) => {
  const words = text
    .toLowerCase()
    .split(/[\s,;:.!?()\[\]{}"']+/)
    .filter(Boolean)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));

  return [...new Set(words)];
};

module.exports = { extractKeywords };
