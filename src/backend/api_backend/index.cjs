const express = require("express");
const cors = require("cors");
const app = express();
let fs = require("fs");
app.use(cors());
app.get("/data",(req,res)=>{
    fs.readFile('./data.json',"utf-8",(err,data)=>{
        if(err){
            res.send(err.message);
        }
        else{
            console.log("checking the data:",JSON.parse(data));
            res.send(JSON.parse(data));
        }
    })
});

let port = 3000;
app.listen(port,()=>{
    console.log("server started");
})