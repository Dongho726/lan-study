const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: 'public/streaming',
  onError : function(err) {
    console.log(err);
  }
}).single('video');

const router = express.Router();

/* GET home page. */
router.post('/upload', function(req, res, next) {
  upload(req,res,function(err){
    if(err){
      console.log(err);
    }
  });
  console.log(req.file);
});

module.exports = router;