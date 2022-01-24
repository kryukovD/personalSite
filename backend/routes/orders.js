const pool=require("../config")
var express = require('express');
var router = express.Router();  
const { v4: uuidv4 } = require('uuid');

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.session.send!==true){
    pool.query("Insert INTO orders (`name`,`family`,`phone`,`message`,`category`) values (?,?,?,?,?)",
    [req.body.name,req.body.family,req.body.phone,req.body.message,req.body.category],
    function(error,results,fields){
      if(error) res.status(400).send({message:"Ошибка , что-то введено неверно",messageClass:"error"})
      if(results){
        req.session.send=true
        return res.send({message:`${req.body.name} , ваша заявка будет рассмотрена`,messageClass:"success"})}
        
    })
  }
  else{
    return res.status(400).send({message:"Повторная отправка форма",messageClass:"error"})
  }
});

module.exports = router;