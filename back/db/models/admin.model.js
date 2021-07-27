const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  login: { 
    type: String, 
    required: true
  },
  password: { 
    type: String, 
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
});

module.exports = mongoose.model("Admin", adminSchema);
