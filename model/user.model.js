const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile:{
    type: String,
  },
  password: {
    type: String,
  },
  u_status: {
    type: Number,
    default:1
    // default: 1,
    //0-block , 1- active
  },
//   u_category:{
//   type:mongoose.Schema.Types.ObjectId,
//   ref:"catagories",
// default:null},
  // u_type: {
  //   type: Number,
  //   default:1
  // },
  // p_status:{
  //   type:Number,
  // default:0},
  // 0-Admin
  // 1-user
  //2-provider
  // u_media:{
  // type:String,
  // default:"avataaars.png"}
});

module.exports = mongoose.model("users", userSchema);
