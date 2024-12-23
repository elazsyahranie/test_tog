const express = require('express');
const router = express.Router();

const handlers = require('./handlers/vehicles');

router.post('/', handlers.add);
router.get('/:id', handlers.getDetail);
router.get('/', handlers.getAll);
router.patch('/:id', handlers.update);
router.delete('/:id', handlers.deleteVehicle);

module.exports = router;
