// Simple ML controller that proxies to ML service (which may call Python scripts)
const mlService = require('../services/mlService');

module.exports = {
  async predictRisk(req, res) {
    try {
      const features = req.body;
      const result = await mlService.predictRisk(features);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Prediction failed' });
    }
  },

  async trainModel(req, res) {
    try {
      // Could accept dataset path or training params
      const { datasetPath } = req.body;
      const result = await mlService.trainModel(datasetPath);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Training failed' });
    }
  }
};