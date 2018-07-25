var express = require('express');
var router = express.Router();
const userController = require('../services/userController')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.put('/create', userController.create)

router.get('/:id', userController.getUserById)

module.exports = router;
