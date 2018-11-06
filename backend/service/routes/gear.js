var express = require('express');
var router = express.Router();
const gearController = require('../services/gearController')
// const auth = require('../auth/auth');

router.put('/create', gearController.create)

module.exports = router;
