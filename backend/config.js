const mysql=require("mysql")
const connection=mysql.createPool({
    host:"localhost",
    port:3310,
    user:"root",
    password:"MyNewPass",
    database:"my_site"
  })
  module.exports=connection