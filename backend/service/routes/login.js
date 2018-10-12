var express = require('express');
var router = express.Router();
const loginController = require('../services/loginController')

router.post('/login/username', loginController.loginByUsername)

router.post('/register/username', loginController.registerWithUsername)

module.exports = router;