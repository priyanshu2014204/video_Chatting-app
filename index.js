const express=require("express");
const app=express();
const {Server}=require("socket.io");
const http=require("http");
const { v4: uuidv4 } = require('uuid');
const { uuid } = require("uuidv4");
const ejs =require("ejs")
const mainserver = http.createServer(app).listen(8080);
// app.use(express.static("public"));
app.set("view engine","ejs")



app.get("/",(req,res)=>{
   res.redirect(`/${uuid()}`)
})


app.get("/:roomid",(req,res)=>{
    res.render("index",{id:req.params.roomid})
})

const ws=new Server(mainserver);
ws.on("connection",(socket)=>{
   socket.on("user_entered",(roomname)=>{
     socket.join(roomname)
     socket.broadcast.to(roomname).emit("server",roomname)
   })
})


    
