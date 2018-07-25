var express = require('express');
var router = express.Router();
const loginController = require('../services/loginController')

router.post('/username', loginController.loginByUsername)

module.exports = router;
