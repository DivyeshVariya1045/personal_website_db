const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  s_media: {
    type: String,
  },
  s_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services",
  },
});

module.exports = mongoose.model("files", fileSchema);
