const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const pool=require("../config")
const bcrypt=require("bcrypt")
router.get("/",function(req,res,next){
    if(req.cookies.token){
        jwt.verify(req.cookies.token,"kryukov", function(err, decoded) {
            if(decoded){
            return res.send({login:decoded.login,auth:true,isAdmin:decoded.isAdmin,id:decoded.id}).status(200) // login
            }
            else{
            return res.status(400).send({message:"Не авторизирован",auth:false})
            }
            
          });
    }
    else{
    return res.send({message:"Не авторизирован"}).status(400)
    }
})
router.get("/logout",function(req,res,next){
    res.clearCookie("token")
    return res.send({message:"Разлогинен"}).status(200)
})
router.post("/login",function(req,res,next){
    pool.getConnection(function(err,connection){
        if(err) throw err;
        else{
        pool.query("Select  * from `users` where login=?",[req.body.login],function(err,result){
            if (err) throw err;
            if(result.length>0){
               const resultCheckPass=bcrypt.compareSync(req.body.password,result[0].password);
               if(resultCheckPass){
               const token=jwt.sign({login:result[0].login,isAdmin:result[0].isAdmin,id:result[0].idusers},"kryukov")
               res.cookie("token",token,{maxAge:3600000})
               return res.send(result[0])
               }
               else{
                return res.send({message:"*Неверные данные"}).status(200)
               }
            }
            else{
                return res.send({message:"*Неверные данные"}).status(200)
            }
            
        })
    }
       connection.release()
    })

})



module.exports=router