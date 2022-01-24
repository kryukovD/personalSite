const express=require("express")
const router=express.Router();
const pool=require("../config")
const fs=require("fs")
const path=require("path")
router.get("/",function(req,res,next){
    pool.getConnection((err,connection)=>{
        if (err){
            throw err
        }
        connection.query("Select * From posts",function(error,results,fields){
            if(error){
                throw error
            }
            else{
                    
                res.send(results)
            }
            connection.release()
    
        })
    })
})
function convertBase64(imagePath){
    const url=path.join(__dirname,"../images",imagePath)
    return  fs.readFileSync(url).toString("base64")

}
router.get("/:id",function(req,res,next){
    pool.getConnection((err,connection)=>{
        if(err){
            throw err
        }
        const id=req.params["id"]
        connection.query(`Select * from posts where id=?`,[id],function(err,results,fields){
            if (err){
                throw err
            }
            else{
               
                res.send(results[0])
            }
        })
        connection.release()

    })
})


module.exports=router

