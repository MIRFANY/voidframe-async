// Mongoose schema for a DPR record and its analyses
const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  text: { type: Object, default: {} },
  image: { type: Object, default: {} },
  risk: { type: Object, default: {} }
});

const DprSchema = new mongoose.Schema({
  filename: String,
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  analysis: { type: AnalysisSchema, default: {} },
  feedback: { type: String }
});

module.exports = mongoose.model('Dpr', DprSchema);
