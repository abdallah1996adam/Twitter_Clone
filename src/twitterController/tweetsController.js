const { response } = require("express");
const tweetsList = require("../models/tweets");
const jwt = require("jsonwebtoken");

const SECRET = "myName";

exports.findAll = (req, res) => {
  tweetsList.getAllTweets((error, tweets) => {
    if (error) {
      res.send(error.message);
    }
  
    res.render("home.ejs", { tweets });
  });
};

exports.findOne = async (req, res) => {
  const cookieValue = req.cookies.authcookie;
  try {
    const user = await jwt.verify(cookieValue, SECRET);
    tweetsList.getTweetByUserId(user.userId, (error, result) => {
      
      if (error) {
        res.send(error.message);
      }
      console.log(result);
      res.render("profile.ejs", { result , user });
      
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addOne = async (req, res) => {
  const token = req.cookies.authcookie;
  const userId = await jwt.verify(token, SECRET).userId
  const message = req.body.message;
  console.log(req.body);
  tweetsList.addTweet(message, userId, (error, result) => {
    if (error) {
      res.send(error.message);
    } else {
      res.redirect("/");
    }
  });
};

// exports.userTweets = async (req, res) => {};
