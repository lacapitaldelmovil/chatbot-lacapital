const express = require('express');
const router = express.Router();
const { recibirWebhook } = require('../controllers/webhookController');

router.post('/', recibirWebhook);

module.exports = router;
