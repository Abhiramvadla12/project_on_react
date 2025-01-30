const express = require("express");
const mongoose = require("mongoose");
const {dbConnect} = require("./db.js");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors())
dbConnect();

mongoose.connection.once("open", () => {
    console.log(`✅ Connected to database: ${mongoose.connection.name}`);
});


const detailsSchema = new mongoose.Schema({
    username : String,
    password : String,
    email : String
});

const detailsModel = mongoose.model("login_details",detailsSchema);

//get login details

app.get("/login",async(req,res)=>{
        try{
            let data = await detailsModel.find();
            console.log(data);
            res.send(data);
        }
        catch(err){
            console.error("❌ Error fetching data:", err);
            res.status(500).send({ error: "Internal Server Error" });
        }
});


app.post("/register",async(req,res)=>{
    try{
        const data = req.body;
        console.log(data);
        let post = await detailsModel.create(data);
        res.send({
            message: "✅ Data inserted successfully into marustunna",
            user: post
        });
    }
    catch (error) {
        console.error("❌ Error inserting data into marustunna:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
})
app.listen(port,()=>{
    console.log(`🚀 Server running at http://localhost:${port}`);
})