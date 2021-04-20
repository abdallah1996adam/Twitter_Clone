const { response } = require("express");
const db = require("../db");

exports.getUserByName = (username, callback) => {
  // if(username.match(/^[0-9a-zA-Z]+$/)){
    //filtrer la user input pour autoriser le numero et les letters 
  db.query(
    `SELECT * FROM Users WHERE username_pseudo = ?;`, [username], 
    (error, result) => {
      if (error) {
        console.log("error:", error.message);
        callback(error, null);
        return;

      }
      callback(null, result);
    }
  )
  // else{
  //   console.log("invalid input");
   
  // }
};



exports.createAccount = (user, callback) => {
  db.query(
    `INSERT into Users VALUES (id, "${user.first_name}","${user.last_name}", "${user.birthday}", "${user.username}", "${user.email}", "${user.password}", "${user.telephone}", "${user.city}" )`,
    (error, result) => {
      if(error){
        console.log("error:",error.message);
        callback(error, null);
        return;
      }
      callback(null, result)
    }
  );
};


