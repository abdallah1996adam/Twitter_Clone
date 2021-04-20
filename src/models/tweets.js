const db = require("../db");


exports.getAllTweets = (callback) => {
  db.query(
    `SELECT *, DATE_FORMAT(date_de_création, '%d/%m/%Y %H:%i:%s') AS date_de_création FROM Tweets INNER JOIN Users ON Users.Id = Tweets.Id_user ORDER BY Tweets.Id DESC LIMIT 20 `,
    (error, result) => {
      if (error) {
        console.log("error:", error);
        callback(error, null);
        return;
      }
      callback(null, result);
    }
  );
};

exports.getTweetByUserId = (userId, callback)=>{
  db.query(`SELECT * FROM Users inner join Tweets on Users.Id = Tweets.Id_user WHERE Users.id = ${userId};`, (error, result)=>{
    if (error) {
      console.log("error:", error.message);
      callback(error, null);
      return;

    }
    callback(null, result);
  })
}

exports.addTweet = (message, idUser, callback) => {
  db.query(
    `insert into Tweets values(Id,"${message}",now(), ${idUser});`,
    (error, result) => {
      if (error) {
        console.log("error:", error);
        callback(error, null);
        return;
      }
      callback(null, result);
    }
  );
};
