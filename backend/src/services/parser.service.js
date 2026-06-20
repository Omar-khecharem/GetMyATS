const fs = require('fs');
const pdf = require('pdf-parse');

const parsePDF = async (filePath) => {
  try {
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    return data.text.trim();
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};

module.exports = { parsePDF };
