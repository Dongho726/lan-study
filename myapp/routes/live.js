const express = require('express');
const mysql = require('mysql');
const con = mysql.createConnection({
  host     : '15.164.216.145',
  user     : 'root',
  password : 'isabel716',
  database : 'lanstudy'
});
const router = express.Router();
con.connect();

/* GET home page. */
router.get('/',function(req,res){
  res.render('live-index');
});
router.get('/watch', function(req, res, next) {
  con.query('SELECT * FROM auth WHERE username = ?',[req.query.username],
    function(error, results){
      if(results.length==0){
          res.redirect('/live');
      }else{
        res.render('live-watch',{
            username:req.query.username,
            channel:results[0].id
        });
      }
  });
});
router.get('/host',function(req,res){
  if(req.session.username){
    con.query('SELECT * FROM auth WHERE username = ?',[req.session.username],
    function(error, results){
      if(results.length==0){
          res.redirect('/live');
      }else{
        res.render('live-host',{
            channel:results[0].id
        });
      }
  });
  }else{
    res.redirect('/live');
  }
});

module.exports = router;