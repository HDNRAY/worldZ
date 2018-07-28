var express = require('express');
var router = express.Router();
const characterController = require('../services/characterController')

router.put('/create/:id', characterController.create)

router.get('/:id', characterController.getCharacterById)

module.exports = router;
