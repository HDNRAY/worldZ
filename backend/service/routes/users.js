var express = require('express');
var router = express.Router();
const userController = require('../services/userController')

// router.put('/create', userController.create)

router.get('/:id', userController.getUserById)

module.exports = router;
