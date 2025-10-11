// ML service: orchestrates model prediction and training
// For a production-grade model we'd call a Python microservice or use TensorFlow.js / ONNX

const { spawn } = require('child_process');

module.exports = {
  async predictRisk(features) {
    // Simple demo: convert features to a mock risk score
    const riskScore = (features.wordCount || 1000) > 1000 ? 0.9 : 0.3;
    return { riskScore, level: riskScore > 0.7 ? 'High' : 'Low' };
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