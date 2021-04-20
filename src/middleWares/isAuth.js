const jwt = require("jsonwebtoken");

const SECRET = "myName";

const isAuth = (req, res, next) => {
  const token = req.cookies.authcookie;
  jwt.verify(token, SECRET, (error, user) => {
    if (error) {
      res.send(error.message);
    } else {
      const { name, username, exp } = user;
      if (Date.now() / 1000 > exp) {
          
        res.send("session expires please try to reconeect ");
      }else{
          res.user = {user, username};
          next();
      }
    }
  });
};

module.exports = isAuth;
