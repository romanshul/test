const colorsController = require('../controllers/colorsController')

var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', colorsController.main);
router.get('/check', colorsController.check);

module.exports = router;
