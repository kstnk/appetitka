const mongoose = require("mongoose");

const agentSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true
  },
  itn: { // ИНН
    type: String, 
    required: true
  },
  login: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model("Agent", agentSchema);
