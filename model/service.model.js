const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  s_name: { type: String },
  duration:{type:String},
  c_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "catagories",
  },
  s_c_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcatagories",
  },
  price: {
    type: Number,
  },
  s_desc:{ 
    type:String,
  }

});

module.exports = mongoose.model("services", serviceSchema);
