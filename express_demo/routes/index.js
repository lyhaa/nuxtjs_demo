var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var data = {
    gg:100,
    bug:0
  }
  res.send(data);
});

module.exports = router;
