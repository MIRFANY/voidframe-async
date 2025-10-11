// ML service: orchestrates model prediction and training
// For a production-grade model we'd call a Python microservice or use TensorFlow.js / ONNX

const { spawn } = require('child_process');

module.exports = {
  async predictRisk(features) {
    // Prototype decision logic:
    // - If document is very short -> high risk (missing information)
    // - If images are missing and wordCount low -> high risk
    const wc = features.wordCount || 0;
    const hasImages = features.numFigures && features.numFigures > 0;

    let riskScore = 0.2;
    if (wc < 400) riskScore += 0.5; // too short
    if (!hasImages) riskScore += 0.15;
    if (features.readability && features.readability < 40) riskScore += 0.15;

    // clamp
    riskScore = Math.min(1, Math.max(0, riskScore));

    // Decision thresholds
    const decision = riskScore > 0.6 ? 'reject' : riskScore < 0.35 ? 'approve' : 'review';

    // Return structured result including top risk reasons for frontend display
    const reasons = [];
    if (wc < 400) reasons.push('Document too short or incomplete');
    if (!hasImages) reasons.push('No supporting images/figures');
    if (features.readability && features.readability < 40) reasons.push('Low readability / unclear language');

    return { riskScore, level: riskScore > 0.6 ? 'High' : riskScore > 0.35 ? 'Medium' : 'Low', decision, reasons };
  },

  async trainModel(datasetPath) {
    // Example: kick off a Python script to train XGBoost model
    return new Promise((resolve, reject) => {
      if (!datasetPath) return resolve({ status: 'skipped', message: 'No dataset path provided (demo)' });
      const py = spawn('python', ['ml/train_xgb.py', datasetPath]);
      py.stdout.on('data', data => console.log('py:', data.toString()));
      py.stderr.on('data', data => console.error('py err:', data.toString()));
      py.on('close', code => {
        if (code === 0) resolve({ status: 'ok' });
        else reject(new Error('Training failed'));
      });
    });
  }
};