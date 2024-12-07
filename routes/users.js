const express = require('express');
const router = express.Router();

const handlers = require('./handlers/users');

router.post('/register', handlers.register);
router.post('/login', handlers.login);

module.exports = router;
