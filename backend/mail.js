const nodemailer = require('nodemailer')
let transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:'dimjson5430@gmail.com',
        pass:process.env.PASS
    }
})
function sendMessage(code,emailUser){
   return transporter.sendMail({
        from:"dimjson5430@gmail.com",
        to:`${emailUser}`,
        subject:'Активация заказа',
        text:"Для активации заказа введите этот код в поле",
        html:`<h1 style="font-famyle:Caveat"> KryukovStudio </h1><p style="font-size:18px">Ваш код активации- <span style='font-size:30px;color:blue'>${code} <span/> </p>`
    })
}
module.exports=sendMessage