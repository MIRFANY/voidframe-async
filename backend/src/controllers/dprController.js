// Controller for DPR endpoints: orchestrates analysis services and DB models
const Dpr = require('../models/Dpr');
const textService = require('../services/textService');
const imageService = require('../services/imageService');
const mlService = require('../services/mlService');

module.exports = {
  async uploadDPR(req, res) {
    // For demo, assume file is text or image; in production detect MIME and branch
    try {
      const { originalname, path } = req.file || {};
      const dpr = new Dpr({ filename: originalname, status: 'processing' });
      await dpr.save();

      // Example: run text analysis (if text) and image analysis (if image)
      const textResults = await textService.analyzeTextFromFile(path);
      const imageResults = await imageService.analyzeImageFromPath(path);

      // Combine features and run risk prediction
      const features = { ...textResults.features, ...imageResults.features };
      const risk = await mlService.predictRisk(features);

      dpr.analysis = { text: textResults, image: imageResults, risk };
      dpr.status = 'done';
      await dpr.save();

      res.json(dpr);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to process DPR' });
    }
  },

  async getDprById(req, res) {
    const dpr = await Dpr.findById(req.params.id);
    if (!dpr) return res.status(404).json({ error: 'Not found' });
    res.json(dpr);
  },

  async submitFeedback(req, res) {
    const { feedback } = req.body;
    const dpr = await Dpr.findById(req.params.id);
    if (!dpr) return res.status(404).json({ error: 'Not found' });
    dpr.feedback = feedback;
    await dpr.save();
    res.json({ success: true });
  },
  
  async handleDPR(req, res) {
    try {
      const { dprText, structuredFields } = req.body;
      const analysis = await analyzeDPR(dprText, structuredFields);
      res.json({ success: true, analysis });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};