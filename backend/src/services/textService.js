// Text analysis service: use NLP to compute DPR quality scores
// In production, integrate with spaCy, transformers, or a hosted NLP API

const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = {
  async analyzeTextFromFile(filePath) {
    try {
      const buffer = fs.readFileSync(filePath);
      const data = await pdf(buffer);
      const text = data.text || '';
      const words = text.trim().split(/\s+/).filter(Boolean).length;

      // Very simple heuristics for demo purposes
      const features = { wordCount: words, pageCount: data.numpages };
      const score = Math.min(0.99, Math.max(0.05, words / 2000)); // normalize by 2000 words

      return {
        features,
        score,
        comments: `Extracted ${words} words from PDF` ,
        text
      };
    } catch (err) {
      console.error('textService error:', err);
      return { features: {}, score: 0, comments: 'Failed to extract text' };
    }
  }
};