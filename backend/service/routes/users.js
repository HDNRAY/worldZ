var express = require('express');
var router = express.Router();
const userController = require('../services/userController')
const auth = require('../auth/auth');

// router.get('/:id', userController.getUserById)

router.get('/characters', auth.userAuth, userController.getAllCharacters)

module.exports = router;
