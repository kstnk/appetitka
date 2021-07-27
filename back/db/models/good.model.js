const mongoose = require("mongoose");

const goodSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  image:{type:String, default:""}
});

module.exports = mongoose.model("Good", goodSchema);
