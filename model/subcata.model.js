const mongoose = require("mongoose");
// var AutoIncrement = require("mongoose-sequence")(mongoose);

const subcataSchema = mongoose.Schema({
  s_c_name: { type: String },
  c_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "catagories",
  },
  s_c_media:{
  type:String}
});
// subcataSchema.plugin(AutoIncrement, { inc_field: "s_c_id" });

module.exports = mongoose.model("subcatagories", subcataSchema);
