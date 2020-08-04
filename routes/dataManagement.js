var express = require('express');
var router = express.Router();
const dataController = require('../controllers/dataManipulation.controller');

/* GET users listing. */
router.route('/').get(function(req,res,next) {
  
    dataController.findData(req,res,next) });

module.exports = router;
