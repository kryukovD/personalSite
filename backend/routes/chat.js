const express=require("express")
const router=express.Router()
let messages=[]
const io=(io)=>{
 
        io.on("connection",function(socket){
            socket.on("message",(data)=>{
                messages=data
                io.sockets.emit("message",messages)
            })
            io.sockets.emit("message",messages)
        })
      
    
}



module.exports={io,router}