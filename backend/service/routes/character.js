var express = require('express');
var router = express.Router();
const auth = require('../auth/auth');
const characterController = require('../services/characterController')

router.put('/create', auth.userAuth, characterController.create)

router.get('/:id', auth.userAuth, characterController.loadCharacterById)

router.post('/gear/equip', auth.userAuth, characterController.equipGear)
router.post('/gear/unequip', auth.userAuth, characterController.unequipGear)

module.exports = router;
