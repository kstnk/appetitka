const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  isready: {type:String, default:"В обработке"},
  goods: [
    {
      title:String,
      good: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Good",
      },
      value: Number,
    },
  ],
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
  regnumber: {
    type: Number,
  },
  date:{type: Date},
  comment: String,

});


module.exports = mongoose.model("Applications", applicationSchema);
