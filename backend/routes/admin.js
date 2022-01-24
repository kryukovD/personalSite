const pool=require("../config")
var express = require('express');
var router = express.Router();  

router.post("/post/edit",function(req,res,next){
    pool.getConnection(function(err,connection){
        if(err){
            throw err
        }
        const {theme,shortdesc,fulltext,id,image}=req.body
        pool.query("UPDATE posts SET theme=?,shortdesc=?,`fulltext`=?,image=? WHERE id=?",[theme,shortdesc,fulltext,image,id],
        function(err,result){
            if(err){
                res.send({message:"Ошибка",class:"error"})
            }
            else if(result){
            res.send({message:"Запись обновлена",class:"success"})
            connection.release()
            }
            
        })
    })
})
router.post("/post/add",function(req,res,next){
    pool.getConnection(function(err,connection){
        if(err){
            throw err
        }
        const {theme,shortdesc,fulltext,id,image}=req.body
        pool.query("Insert Into posts  (theme,shortdesc,`fulltext`,image) values (?,?,?,?)",[theme,shortdesc,fulltext,image],
        function(err,result){
            if(err){
                res.send({message:"Ошибка",class:"error"})
            }
            else if(result){
            res.send({message:"Запись добавлена",class:"success"})
            connection.release()
            }
            
        })
    })
})
router.post("/post/delete",function(req,res,next){
    pool.getConnection(function(err,connection){
        if(err){
            throw err
        }
        const {id}=req.body
        pool.query("Delete from posts where id=?",[id],
        function(err,result){
            if(err){
                res.send({message:"Ошибка",class:"error"})
            }
            else if(result){
            res.send({message:"Запись удалена",class:"success"})
            connection.release()
            }
            
        })
    })
})
router.get("/projects/all",function(req,res,next){
    pool.getConnection(function(err,connection){
        if(err){
            throw err
        }
        connection.query("Select * from projects",function(err,results){
            if(err){
                 throw err 
            }
            else{
                 res.send(results)
            }
        })
        connection.release()
    })
})
router.post("/projects/add/",function(req,res,next){
    console.log(req.body)
    const {id,title,src,image}=req.body
    pool.getConnection(function(err,connection,next){
        if(err){
            throw err
        }
       connection.query("Insert into projects (title,src,image) values (?,?,?)",[title,src,image],function(err,result){
        if(err){
           console.log(err)
        }
        else if(result){
            connection.release()
            return res.send({message:"Запись добавлена",class:"success"})
           
        }
       })
       
       
    })
})
router.put("/projects/edit",function(req,res,next){
    const {id,title,src,image}=req.body
    pool.getConnection(function(err,connection){
        connection.query("Update projects set title=?,image=?,src=? where id=?",[title,image,src,id],
        function(err,result){
            if(err){
                throw err
            }
            res.send({message:"Запись изменена",class:"success"})
            connection.release()
        })
       
    })
})

module.exports=router