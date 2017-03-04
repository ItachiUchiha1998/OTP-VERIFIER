var express = require('express');
var router = express.Router();

/* GET verification page */
router.get('/verify', function(req, res, next) {
  res.render('verify');
});

module.exports = router;
