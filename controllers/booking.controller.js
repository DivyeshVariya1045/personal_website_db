const path = require("path");
const bookingModel = require("../model/booking.model");
const bookingDetailsModel = require("../model/booking_detail.model");
const moment = require("moment");
const nodemailer = require("nodemailer");
const { default: mongoose } = require("mongoose");
const invoiceTemplate = require("../invoice");
const pdf = require("html-pdf");

const getBooking = async (req, res) => {
  try {
    let bookingList = [];
    const bookingResults = await bookingModel
      .aggregate([
        { $match: { u_id: mongoose.Types.ObjectId(req.params.u_id) } },
      ])
      .exec();
    if (bookingResults.length > 0) {
      for (let i = 0; i < bookingResults.length; i++) {
        const singleBooking = { booking: bookingResults[i], details: [] };
        const bookingDetailResults = await new Promise((resolve, reject) => {
          bookingDetailsModel
            .aggregate([
              {
                $lookup: {
                  from: "services",
                  localField: "s_id",
                  foreignField: "_id",
                  as: "service",
                },
              },
              // { $unwind: "$service" },
              {
                $lookup: {
                  from: "files",
                  localField: "service._id",
                  foreignField: "s_id",
                  as: "s_media",
                  pipeline: [{ $limit: 1 }],
                },
              },
              {
                $lookup: {
                  from: "catagories",
                  localField: "service.c_id",
                  foreignField: "_id",
                  as: "catagory",
                },
              },
              {
                $lookup: {
                  from: "subcatagories",
                  localField: "service.s_c_id",
                  foreignField: "_id",
                  as: "subcatagory",
                },
              },
              // { $unwind: "$s_media" },
              {
                $match: {
                  booking_id: mongoose.Types.ObjectId(
                    singleBooking.booking._id
                  ),
                },
              },
            ])
            .exec((error, result1) => {
              if (error) {
                reject(error);
              } else {
                console.log(result1, "result1:::::");
                resolve(result1);
              }
            });
        });
        if (bookingDetailResults.length > 0) {
          singleBooking.details = bookingDetailResults;
          bookingList.push(singleBooking);
        } else {
          singleBooking.details = [];
          bookingList.push(singleBooking);
        }
        if (bookingResults.length - 1 === i) {
          res.send({
            status: 1,
            result: bookingList,
            message: "Booking Fetched",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const getBookingProvider = async (req, res) => {
  try {
    let bookingList = [];
    const bookingResults = await bookingModel
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "u_id",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
      .exec();
    if (bookingResults.length > 0) {
      for (let i = 0; i < bookingResults.length; i++) {
        const singleBooking = { booking: bookingResults[i], details: [] };
        const bookingDetailResults = await new Promise((resolve, reject) => {
          bookingDetailsModel
            .aggregate([
              {
                $lookup: {
                  from: "services",
                  localField: "s_id",
                  foreignField: "_id",
                  as: "service",
                },
              },
              // { $unwind: "$service" },
              {
                $lookup: {
                  from: "files",
                  localField: "service._id",
                  foreignField: "s_id",
                  as: "s_media",
                  pipeline: [{ $limit: 1 }],
                },
              },
              {
                $lookup: {
                  from: "catagories",
                  localField: "service.c_id",
                  foreignField: "_id",
                  as: "catagory",
                },
              },
              {
                $lookup: {
                  from: "subcatagories",
                  localField: "service.s_c_id",
                  foreignField: "_id",
                  as: "subcatagory",
                },
              },
              // { $unwind: "$s_media" },
              {
                $match: {
                  booking_id: mongoose.Types.ObjectId(
                    singleBooking.booking._id
                  ),
                },
              },
            ])
            .exec((error, result1) => {
              if (error) {
                reject(error);
              } else {
                console.log(result1, "result1:::::");
                resolve(result1);
              }
            });
        });
        if (bookingDetailResults.length > 0) {
          singleBooking.details = bookingDetailResults;
          bookingList.push(singleBooking);
        } else {
          singleBooking.details = [];
          bookingList.push(singleBooking);
        }
        if (bookingResults.length - 1 === i) {
          res.send({
            status: 1,
            result: bookingList,
            message: "Booking Fetched",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
var refundController = (req, res) => {
  try {
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "homelysolutions0@gmail.com",
        pass: "efzvhxatargapgyc",
      },
    });

    let mailOptions = {
      from: "homelysolutions0@gmail.com",
      to: req.body.booking. email,
      subject: "Refund Related",
      text: `Hi ${req.body.booking.firstName},
            
We send this mail about the refund your payment.

I have refunded you the total amount : ${req.body.booking.total_amt}  paid by you for your canceled order bearing Booking ID: ${req.body.booking._id}

If you don’t see the refund in your account, reply to this email, and we’ll look into it immediately. In the meantime, please let me know if you have any additional questions or concerns — I’d be happy to help !

Thanks,
Homely Solutions`,
    };
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ status: 1, message: "Mail Send" });
        bookingModel
          .findOneAndUpdate({ booking_status:3,refund_status: 0 }, { refund_status: 1 })
          .then((result) => {
            if (result) {
              console.log("Refund processed successfully");
            } else {
              console.log("not updated");
            }
          });
        console.log(info, "info");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

var checkOut = (req, res) => {
  try {
    console.log(req.body, "hhhh");
    const bookingDate = moment().format("DD-MM-YYYY");
    bookingModel
      .create({
        u_id: req.body.u_id,
        booking_date: bookingDate,
        transaction_id: req.body.orderData.transactionId,
        total_amt: req.body.orderData.total,
        firstName: req.body.orderData.firstName,
        lastName: req.body.orderData.lastName,
        time: req.body.orderData.time,
        email: req.body.orderData.email,
        address: req.body.orderData.address,
        mobileNo: req.body.orderData.mobileNo,
        city: req.body.orderData.city,
        appointment_date: req.body.orderData.date,
        landMark: req.body.orderData.landmark,
      })
      .then((result) => {
        if (result) {
          for (let i = 0; i < req.body.services.length; i++) {
            bookingDetailsModel
              .create({
                booking_id: result._id,
                s_id: req.body.services[i]._id,
                price: req.body.services[i].price,
                total: req.body.services[i].total,
                qty: req.body.services[i].qty,
              })
              .then((b_details) => {
                if (b_details) {
                  let transport = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: "homelysolutions0@gmail.com",
                      pass: "efzvhxatargapgyc",
                    },
                  });

                  let mailOptions = {
                    from: "homelysolutions0@gmail.com",
                    to: req.body.orderData.email,
                    subject: "Booking Related",
                    text: `Dear${req.body.orderData.firstName}, Your Booking is done successfully.Your Order_No is ${result._id}`,
                  };
                  transport.sendMail(mailOptions, (err, info) => {
                    if (err) {
                      console.log(err, "err");
                    } else {
                      console.log(info, "info");
                    }
                  });
                } else {
                }
              });
          }

          res.send({
            status: 1,
            result: result,
            message: "Booking done successfully...",
          });
        } else {
          res.send({ status: 0, result: [], message: "Booking not done !" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
var cancelBooking = (req, res) => {
  try {
    console.log(req.body, "Book");
    bookingModel
      .findOneAndUpdate(
        { _id: req.body.booking._id, booking_status: 0 },
        { booking_status: 3 }
      )
      .then((booking) => {
        if (booking) {
          res.send({
            status: 1,
            result: booking,
            message: "Booking cancelled...",
          });
        } else {
          res.send({
            status: 0,
            result: [],
            message: "Booking cancelled failed !",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(err);
  }
};

var downloadInvoice = (req, res) => {
  try {
    console.log(req.body, "jukukggg");
    let newObj = req.body;
    let newPath = path.join(__dirname, "../public/assets/invoices");
    pdf
      .create(invoiceTemplate(newObj), {
        childProcessOptions: {
          env: {
            OPENSSL_CONF: "/dev/null",
          },
          pageFormat: "A4",
          renderDelay: 3000,
        },
      })
      .toFile(`${newPath}/${newObj.booking._id}.pdf`, async (err) => {
        if (err) {
          return console.log(err, "download bill error");
        } else {
          const responseData = {
            filename: `${newObj.booking._id}.pdf`,
          };
          let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "homelysolutions0@gmail.com",
              pass: "efzvhxatargapgyc",
            },
          });

          let mailOptions = {
            from: "homelysolutions0@gmail.com",
            to: req.body.booking.email,
            subject: "Booking Invoice",
            text: `Dear ${req.body.booking.firstName}, Your Booking is done successfully.Your Booking No. is ${req.body.booking._id}. You can download invoice from below.`,
            attachments: [
              {
                filename: `${newObj.booking._id}.pdf`,
                path: `${newPath}/${newObj.booking._id}.pdf`,
              },
            ],
          };
          transport.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err, "err");
            } else {
              console.log(info, "info");
            }
          });
          res.send({ status: 1, message: "Invoice sent on your email ..." });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

var reschedulingController = (req, res) => {
  try {
    bookingModel
      .findByIdAndUpdate(
        { _id: req.body.id },
        { time: req.body.time, appointment_date: req.body.date }
      )
      .then((result) => {
        if (result) {
          res.send({
            status: 1,
            result: result,
            message: "Your Booking Rescheduled",
          });
        } else {
          res.send({
            status: 0,
            result: [],
            message: "Your Booking Can't Rescheduled",
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

var updateBookingStatus = (req, res) => {
  try {
    console.log(req.body, "status");
    let statusOfBooking;
    if (req.body.booking.booking_status === 0) {
      statusOfBooking = 2;
    } else if (req.body.booking.booking_status === 2) {
      statusOfBooking = 1;
    } else {
      statusOfBooking = 0;
    }
    bookingModel
      .findByIdAndUpdate(
        { _id: req.body.booking._id },
        { booking_status: statusOfBooking }
      )
      .then((result) => {
        if (result) {
          res.send({
            status: 1,
            result: result,
            message: "status changed successfully...",
          });
        } else {
          res.send({ status: 0, result: [], message: "status not changed !" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
var chartDetaApiController = async (req, res) => {
  try {
    let lineChart = bookingModel.aggregate([
      {
        $group: {
          _id: {
            $substr: [
              {
                $toDate: {
                  $dateFromString: {
                    dateString: "$booking_date",
                    format: "%d-%m-%Y",
                  },
                },
              },
              0,
              7,
            ],
          },
          countBooking: { $sum: 1 },
        },
      },
      { $project: { _id: 0, monthDate: "$_id", countBooking: 1 } },
      { $sort: { monthDate: 1 } },
    ]);
    let responseForLineChart = await new Promise((resolve, reject) => {
      lineChart.then((result) => {
        if (result.length > 0) {
          resolve({ status: 1, data: result, message: "Booking Fetched" });
        } else {
          reject({ status: 0, data: [], message: "Booking not Fetched" });
        }
      });
    }).catch((error) => {
      console.log(error);
    });
    console.log(responseForLineChart, "AAAAAAAA");

    let lineResultCounter = [];
    let lineResultOfCategories = [];
    for (let index = 0; index < responseForLineChart.data.length; index++) {
      const singleRecordData = responseForLineChart.data[index];
      lineResultCounter.push(singleRecordData.countBooking);
      lineResultOfCategories.push(singleRecordData.monthDate);
    }
    let responseObject = {
      lineChartData: {
        categories: lineResultOfCategories,
        data: lineResultCounter,
      },
    };
    console.log(lineResultCounter, "hhhhhh");
    res.send({ status: 1, data: responseObject, message: "Booking Found" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  checkOut,
  getBooking,
  cancelBooking,
  downloadInvoice,
  getBookingProvider,
  updateBookingStatus,
  reschedulingController,
  refundController,
  chartDetaApiController,
};
