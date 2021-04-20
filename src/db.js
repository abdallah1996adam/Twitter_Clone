const mysql = require('mysql2');
const db = mysql.createConnection({
    host:"localhost",
    user:"MyData",
    password:"c,jifçfh8 gMSLi)587zéçufhènvwl",
    database: "Twitter_clone"
});

db.connect((error, result)=>{
    if(error) throw error
    console.log("connection to database works!!");
});



module.exports = db;