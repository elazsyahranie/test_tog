const express = require('express');
const router = express.Router();

const handlers = require('./handlers/users');

router.post('/register', handlers.register);

module.exports = router;
