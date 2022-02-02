const pool=require("../config")
var express = require('express');
var router = express.Router();  
const sendMessage=require("./../mail")


/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.session.send!==true){
    pool.query("Insert INTO orders (`name`,`family`,`phone`,`message`,`category`,`email`) values (?,?,?,?,?,?)",
    [req.body.name,req.body.family,req.body.phone,req.body.message,req.body.category,req.body.email],
    function(error,results,fields){
      if(error)  res.status(400).send({message:"Ошибка , что-то введено неверно",messageClass:"error"})
      if(results){
        req.session.send=true
        return res.send({message:`${req.body.name} , ваша заявка будет рассмотрена`,messageClass:"success"})}
        
    })
  }
  else{
    return res.status(400).send({message:"Повторная отправка форма",messageClass:"error"})
  }
});
router.get("/all",(req,res,next)=>{
  pool.getConnection((err,connection)=>{
    if(err){
      res.send({message:"Нет соединения",class:"error"})
    }
    else{
      connection.query("Select * from orders",(err,result)=>{
        if(err){
          res.send({message:"Неверный запрос",class:"success"})
        }
        else{
          res.send(result)
        }
        connection.release()
      })
    }
  })
})
router.put("/key",(req,res,next)=>{
  const {id,key,active,email}=req.body
  pool.getConnection((err,connection)=>{
    if (err){
      res.send({message:"Нет соединения",class:"error"})
    }
    else{
      if(key){
      connection.query("Update orders set `key`=?,`active`=? where id=?",[key,active,id],(err,result)=>{
        if(err){
          res.send({message:"Неверный запрос",class:"error"})
        }
        else{
          sendMessage(key,email).then(()=>console.log("email send"))
          res.send({message:"Готово",class:"success"})
        }
      })
    }else{
      connection.query("Update orders set `active`=? where id=?",[active,id],(err,result)=>{
        if(err){
          res.send({message:"Неверный запрос",class:"error"})
        }
        else{
          res.send({message:"Готово",class:"success"})
        }
      })
    }
    }
    connection.release()
  })
})
router.post("/key",function(req,res,next){
   const {id,key}=req.body
    pool.getConnection((err,connection)=>{
      if (err){
        return res.send({message:"Нет соединения",class:"error"})
      }
      else{
        connection.query("Select * from orders where `key`=?",[key],(err,result)=>{
            if(err){
              res.send({message:"Не активировано",class:"error"})
            }
            if(result.length==1 && result[0].user==null){

              connection.query("Update orders set `user`=? where `key`=?",[id,key],(err,result)=>{
                if(err){
                  res.send({message:"Не активировано",class:"error"})
                }
                else{
                  res.send({message:"Активировано",class:"success"})
                }
              })
            }
            else{
              return res.send({message:"Ошибка ключа ",class:"error"})
            }
        })
      }
      connection.release()
    })
})
router.get("/active/:id",(req,res,next)=>{
  const id=req.params.id
  pool.getConnection((err,connection)=>{
      if (err){
        return res.send({message:"Нет соединения",class:"error"})
      }
      else{
        connection.query("Select * from orders  Join users on orders.user=users.idusers where orders.user=?",id,
        (err,result)=>{
          if(err){
            res.send({message:"Ошибка",class:"error"})
          }
          else{
            res.send(result)
          }
        })
      }
      connection.release()
  })
})
module.exports = router;