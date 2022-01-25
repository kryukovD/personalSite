const express=require("express")
const router=express.Router()
const pool=require("../config")
router.get("/all",function(req,res,next){
    pool.getConnection((err,connection)=>{
        if (err){
            return  res.end().status(200)
        }
        else{
            connection.query("Select * from projects ",function(err,result){
                if(err){
                    res.end().status(200)
                }
                else{
                    res.send(result)
                }
                connection.release()
            })
        }
    })
})
module.exports=router