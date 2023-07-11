const mongoose = require("mongoose");

const booking_detailSchema = mongoose.Schema({
  booking_id:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"bookings"},
  s_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"services"},
  price:{
  type:Number},
  qty:{type:Number}, 
  total:{
  type:Number}

});

module.exports = mongoose.model("booking_details", booking_detailSchema);
