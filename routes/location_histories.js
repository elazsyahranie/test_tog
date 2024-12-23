const express = require('express');
const router = express.Router();

const handlers = require('./handlers/location_histories');

router.post('/', handlers.add);

module.exports = router;
