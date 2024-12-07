const express = require('express');
const router = express.Router();

const handlers = require('@usersHandlers');

router.post('/register', handlers.register);

module.exports = router;
