// ML routes: trigger model training / prediction endpoints
const express = require('express');
const router = express.Router();
const mlController = require('../controllers/mlController');

router.post('/predict', mlController.predictRisk);
router.post('/train', mlController.trainModel);

module.exports = router;
