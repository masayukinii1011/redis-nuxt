const express = require("express");
const session = require('express-session');
const redis = require('redis')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient()
const app = express();

app.use(cookieParser())
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    //host: '127.0.0.0',
    //host: 'localhost',
    //port: 6379,
    //ttl: 260,
    //prefix: 'sid:',
    client: redisClient
  }),
  cookie: {
    httpOnly: true, secure: false, maxage: 1000 * 60 * 30, path: '/'
  }
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
  if (req.session) {
    res.send("HelloWorld");
  } else {
    res.send("hello")
  }
});

module.exports = {
  path: "/api/",
  handler: app
};