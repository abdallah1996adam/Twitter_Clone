const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "myName";
const MAXAGE = Math.floor(Date.now() / 1000) + 60 * 60; //1 hour of expiration

exports.signup = (req, res) => {
  res.render("signup.ejs");
};
 
exports.logout = (req, res) => {
  res.clearCookie("authcookie", {path: "/"});
  res.redirect("/login");
};

exports.login = (req, res) => {
  res.render("login.ejs");
};
exports.newAccount = (req, res) => {
  const {
    first_name,
    last_name,
    birthday,
    city,
    email,
    telephone,
    username,
    password,
  } = req.body;

  user.getUserByName(username, (error, result) => {
    if (error) {
      res.send(error.message);
    } else if (result.length !== 0) {
      res.send("A user with this username already exists!");
    } else {
      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, (error, hash) => {
        if (error) {
          res.send(error.message);
        }

        const newUser = {
          first_name,
          last_name,
          birthday,
          city,
          email,
          telephone,
          username,
          password: hash,
        };

        user.createAccount(newUser, (error, result) => {
          if (error) {
            res.send(error.message);
          }
          res.redirect("/login");
        });
      });
    }
  });
};

exports.authenticate = (req, res) => {
  const { username, password } = req.body;
  user.getUserByName(username, (error, result) => {
    if (error) {
      res.send(error.message);
    } else if (result.length === 0) {
      res.send(`This User doesn't exist`);
    } else {
      const hash = result[0].user_password;
      bcrypt.compare(password, hash, (error, correct) => {
        if (error) {
          res.send(error.message);
        } else if (!correct) {
          res.send("Invalid Password");
        } else {
        
          const user = {
            name: result[0].user_name,
            username: result[0].username_pseudo,
            userId : result[0].Id,
            userCity : result[0].city,
            exp: MAXAGE,
          };
          jwt.sign(user, SECRET, (error, token) => {
            if (error) {
              res.send(error.message);
            } else {
              req.user = user;
              res.cookie("authcookie", token, { maxAge: 60 * 60 *1000 });
              res.redirect("/");
            }
          });
        }
      });
    }
  });
};

