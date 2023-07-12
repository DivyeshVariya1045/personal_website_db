const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
// const db = mongoose.connect(
//   "mongodb+srv://rronak4674:H@cluster0.eszwbnk.mongodb.net/?retryWrites=true&w=majority",
//   (error, db) => {
//     if (error) {
//       console.log("Database not connected", error);
//     } else {
//       console.log("Database connected");
//     }
//   }
// );

const db = mongoose
  .connect(
    "mongodb+srv://Divyesh:divyesh123@cluster0.8btjodd.mongodb.net/personal_website_db?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("database connected ");
  })
  .catch((err) => {
    console.log("err", err);
  });
//const customer=require(’./modals/customer’)
//Add New Customer


module.exports = db;
