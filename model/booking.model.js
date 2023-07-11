const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  booking_date: { type: String },
  total_amt: { type: Number },
  u_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  transaction_id: { type: String },
  address: { type: String },
  mobileNo:{type:String},
  city: { type: String },
  landMark: { type: String },
  appointment_date: { type: String },
  time:{type:String},
  booking_status: { type: Number, default: 0 },
  refund_status:{
  type:Number,
  default:0
  //0-no,
  //1-accept,
  //2-complete
  }
  //0-pending
  //1-completed
  //2-accepted
  //3-cancelled
  // refund_status: { type: Boolean },
});

module.exports = mongoose.model("booking", bookingSchema);
