// Central router: attaches feature routers here
const express = require('express');
const router = express.Router();

// Feature routers
const dprRouter = require('./dpr');
const mlRouter = require('./ml');

router.use('/dpr', dprRouter);
router.use('/ml', mlRouter);

// Health check
router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;
