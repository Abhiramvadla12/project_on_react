const mysql2 = require("mysql2");
const conn = mysql2.createConnection({
    host: "localhost",
    user:"root",
    password:"abhiram@1234",
    database:"vadla_abhiram"
});
conn.connect((err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("established connection to sql");
    }
});
module.exports = conn;