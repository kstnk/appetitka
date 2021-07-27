const express = require("express");
const connect = require("./db/connect");
const path = require('path')
const mainRote = require("./routes/main");
const adminRote = require("./routes/admin");
const agentRoute = require("./routes/agent");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const dotenv = require("dotenv");
dotenv.config();


const app = express();
connect()
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser())
app.use(express.static(path.resolve('../front/build/')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  store: MongoStore.create({mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eqypr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`}),
  key: 'user',
  secret: 'anything',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 24 * 100 * 60 * 1000,
    httpOnly: false,
  },
  unset: 'destroy'
}))


app.use("/", mainRote);
app.use("/admin", adminRote);
app.use("/agent", agentRoute);
app.use('*' , (req, res) => {
  res.sendFile(path.resolve('../front/build/index.html'))
})

module.exports = app
