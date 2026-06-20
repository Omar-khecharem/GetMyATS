const calculateScore = (cv, jobDescription) => {
  const cvWords = cv.toLowerCase().split(/\W+/).filter(Boolean);
  const jdWords = jobDescription.toLowerCase().split(/\W+/).filter(Boolean);

  const jdUnique = [...new Set(jdWords)];
  const matchCount = jdUnique.filter((word) => cvWords.includes(word)).length;

  return jdUnique.length === 0
    ? 0
    : Math.round((matchCount / jdUnique.length) * 100);
};

module.exports = { calculateScore };
