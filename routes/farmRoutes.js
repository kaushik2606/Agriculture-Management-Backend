const express = require('express');
const { addFarm, getFarm, getFarmById, updateFarm, deleteFarm } = require('../controllers/farmController');

const { farmerAccess } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/', farmerAccess, addFarm);
router.get('/', farmerAccess, getFarm);
router.get('/:farmId', farmerAccess, getFarmById);
router.put('/:farmId', farmerAccess, updateFarm);
router.delete('/:farmId', farmerAccess, deleteFarm);

module.exports = router;