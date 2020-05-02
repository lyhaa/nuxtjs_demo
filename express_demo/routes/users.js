var express = require('express');
var router = express.Router();
var token = require('../public/javascripts/token.js');
// console.log(token);
/* GET users listing. */
router.post('/', function(req, res, next) {
  let usertoken = token.createToken(req.body);
  // console.log();
  res.send(usertoken);
});

module.exports = router;