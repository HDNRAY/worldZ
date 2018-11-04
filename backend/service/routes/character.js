var express = require('express');
var router = express.Router();
const auth = require('../auth/auth');
const characterController = require('../services/characterController')

router.put('/create', auth.userAuth, characterController.create)

router.get('/:id', characterController.getCharacterById)

module.exports = router;
