// DPR routes: upload DPR, get evaluations, feedback
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const dprController = require('../controllers/dprController');

router.post('/upload', upload.single('file'), dprController.uploadDPR);
router.get('/:id', dprController.getDprById);
router.post('/:id/feedback', dprController.submitFeedback);
router.post("/dpr/analyze", dprController.handleDPR);

module.exports = router;
