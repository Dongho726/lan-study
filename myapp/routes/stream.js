const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'onstudy',
    acl: 'public-read'
  })
}).single('video');
const mysql = require('mysql');
const con = mysql.createConnection({
  host     : '15.164.216.145',
  user     : 'root',
  password : 'isabel716',
  database : 'lanstudy'
});
con.connect();

const router = express.Router();


router.post('/connect',function(req,res,next){
  con.query('SELECT MAX(id) FROM stream',
  function(error,results){
    res.json({
      id: results[0]['MAX(id)']
    });
  });
});
router.post('/update',function(req,res,next){
  con.query('select * from stream where id > ? and channel = ?',
  [req.body.id,req.body.channel],
  function(error,results){
    if(error){
      console.log(error);
      res.json({
        update: false
      });
    }else{
      res.json({
        update: true,
        video:results
      });
    }
  });
});
router.post('/upload', function(req, res, next) {
  if(req.session.username){
    con.query('SELECT * FROM auth WHERE username = ?',[req.session.username],
    function(error, results){
      if(results.length==0){
          res.redirect('/live');
      }else{
        upload(req,res,function(err){
          if(err){
            console.log(err);
          }
          con.query('INSERT INTO stream (channel,content,time) VALUES (?,?,now())',
            [results[0].id,req.file.key],
            function(error,results){
              if(error){
                console.log(error);
                res.json({
                  submit: false
                });
              }else{
                res.json({
                  submit: true
                });
              }
          });
        });
      }
  });
  }else{
    res.redirect('/live');
  }
});

module.exports = router;