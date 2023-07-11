const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: {
    type: String,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("review", reviewSchema);

