const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/upload', function(req, res, next) {
  console.log(req.body.length);
});

module.exports = router;