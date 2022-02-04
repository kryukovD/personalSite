const express=require("express")
const router=express.Router()
const pool=require("../config")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
router.post("/",function(req,res,next){
    bcrypt.genSalt(7,function(err,salt){
        bcrypt.hash(req.body.password,salt,function(err,hash){
            pool.getConnection(function(err,connection){
                if (err) throw err
                pool.query("Insert Into users (`login`,`password`)  values (?,?)",[req.body.login,hash],function(error,result){
                    if (error){
                        throw error
                    }
                    if(result){
                        res.cookie("token",getJwt(req.body.login),{maxAge:3600000})
                        return res.send({message:"Вы зарегистрированы" ,type:"success"}).status(200)
                    }
                })
                connection.release()

            })
          
        })
    })
  
})
function getJwt(login){
    return jwt.sign({login:login},"kryukov")
}
module.exports=router