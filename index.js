const express = require("express");
const app = express();
const database = require("./database");
const bodyParser = require("body-parser");
const Cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const pdf = require("html-pdf");
//controllers
const userController = require("./controllers/user.controller");
const reviewController = require("./controllers/review.controller");
const categoryController = require("./controllers/catagory.controller");
const servicesController = require("./controllers/service.controller");
const subcategoryController = require("./controllers/subcataegory.controller");
const bookingController = require("./controllers/booking.controller");

//use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("files"));
app.use(Cors());
app.use(
  "/images",
  express.static(path.join(__dirname + "/public/assets/images"))
);

//api
app.get("/get-userlist", userController.getUserList);
app.post("/login", userController.loginUsers);
// app.post("/change-pwd", userController.changePassword);
app.post("/insert-user", userController.insertUserController);
// app.post("/update-user", userController.updateUserController);
// app.delete("/delete-user", userController.deleteUser);
// app.get("/provider-list", userController.getUserList1);
// app.post("/block-user", userController.updateStatusController);
// app.post("/provider-register",userController.insertProviderController)
// app.post("/request-provider",userController.updateProviderStatusController)

//category
// app.get("/get-catagorylist", categoryController.getCatagoryList);
// app.post("/insert-catagory", categoryController.insertCatagory);
// app.post("/update-category", categoryController.updateCategory);
// app.post("/delete-category", categoryController.deleteCategory);
//subcategory
// app.post("/insert-subcatagory", subcategoryController.insertSubCatagory);
// app.get("/get-subcatagory/:c_id", subcategoryController.getSubCatagoryList);
// app.get("/get-subcatagorylist", subcategoryController.getSubCatagoryListAll);
// app.post("/delete-subcategory", subcategoryController.deleteSubcategory);
// app.post("/update-subcategory", subcategoryController.updateSubcategory);
//services
// app.post("/insert-sevices", servicesController.insertService);
// app.get("/get-services", servicesController.getServices);
// app.post("/update-services", servicesController.updateServices);
// app.post("/delete-services", servicesController.deleteServices);
//review
app.post("/insert-review", reviewController.insertReview);
app.post("/update-review",reviewController.updateReview);
app.get("/get-review", reviewController.getReviewConntroller);


//forget
// app.get("/request-otp/:email", userController.otpRequestController);
// app.get("/verify-otp1/:otp", userController.verifyOtp1);
// app.post("/set-newpassword", userController.setNewPassword);
// app.get("/getTotalUsers", userController.totalUser);
// app.post("/edit-provider-profile",userController.editProviderProfile)

//booking
// app.post("/check-out", bookingController.checkOut);
// app.get("/get-bookings/:u_id", bookingController.getBooking);
// app.post("/cancel-booking", bookingController.cancelBooking);
// app.post("/download-invoice", bookingController.downloadInvoice);
// app.get("/get-bookings-provider", bookingController.getBookingProvider);
// app.post("/change-booking-status", bookingController.updateBookingStatus);
// app.get("/verify-otp/:otp/:email", userController.verifyOtp);
// app.post("/booking-refund",bookingController.refundController)

// app.post("/rescheduling-booking", bookingController.reschedulingController);
// app.get("/get-user/:u_id",userController.getUser);
// app.get("/chartdeta-api", bookingController.chartDetaApiController);

//server
const server = app.listen(8000, () => {
  console.log("server started on 8000");
});
