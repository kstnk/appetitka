const dotenv = require("dotenv");
dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eqypr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const options = {
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

module.exports = { dbUrl, options };
