const mongoose = require("mongoose");


const catagorySchema = mongoose.Schema({
  c_name: { type: String },
  c_media: {
    type: String,
  },
});

module.exports = mongoose.model("catagories", catagorySchema);
