const express = require('express');
const { addFarm, getFarm, getFarmById, updateFarm, deleteFarm } = require('../controllers/farmController');

const { formerAccess } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/', formerAccess, addFarm);
router.get('/', formerAccess, getFarm);
router.get('/:farmId', formerAccess, getFarmById);
router.put('/:farmId', formerAccess, updateFarm);
router.delete('/:farmId', formerAccess, deleteFarm);

module.exports = router;