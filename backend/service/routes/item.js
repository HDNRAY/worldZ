var express = require('express');
var router = express.Router();
const itemController = require('../services/itemController')
// const auth = require('../auth/auth');

router.post('/create/:character/:type', itemController.createToCharacter)

module.exports = router;
