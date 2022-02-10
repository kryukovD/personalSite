const express=require("express")
const router=express.Router()
const pool=require("../config")
let messages=[]
let roomUser=""
let user
const io=(io)=>{
 
        io.on("connection",function(socket){  
            io.sockets.emit("getRooms",Array.from(socket.rooms))  
            socket.on("initUser",function(currentUser){
                 user=currentUser
            })
            socket.on("createRoom",(room,isAdmin)=>{
                if(room){
                    if(user.isAdmin!=true){
                    socket.join(room)
                    }
                    io.sockets.emit("getRooms",Array.from(socket.rooms))  
                    if(roomUser!==""){
                        if(roomUser!==room){
                            io.sockets.emit("changeRoom",{message:"Смена комнаты"})
                            messages=[]
                        }
                    }
                    roomUser=room     
                    rooms=socket.rooms
                    if(isAdmin){
                        for (let o of socket.rooms){
                            socket.join(o)
                        }
                    }
                   
                   
                }   

                pool.getConnection((err,connection)=>{
                    connection.query("Select * from messages where messageByOrder=? ",[roomUser],(err,result)=>{
                        if(err){
                            throw err
                        }
                        else{
                            if(result[0]){
                            io.sockets.in(roomUser).emit("message",JSON.parse(result[0].data))    
                            console.log("query success Select")
                            }
                            else{
                                messages=[]
                            }
                        }
                    })
                    connection.release()
                })
               
                io.sockets.in(roomUser).emit("message",messages)
                
                io.sockets.to(roomUser).emit("message",messages)
            })     
            socket.on("message",(data)=>{
                if(io.sockets.adapter.rooms.get(roomUser)){
                messages=data.messages
                io.sockets.in(data.order).emit("message",messages)
                /* Added in database */
                pool.getConnection((err,connection)=>{
                    connection.query(`INSERT INTO messages ( data, messageByOrder) VALUES(?,?) ON DUPLICATE KEY UPDATE  data=?`,[JSON.stringify(messages),data.order,JSON.stringify(messages)],(err,result)=>{
                        if(err){
                           throw err
                        }
                        else{
                            console.log("query success--Insert and Update")
                        }
                    })
                    connection.release()
                })

                }    
            })
            socket.on("disconnect",()=>{
                
            })
             
           
        })
      
    
}



module.exports={io,router}