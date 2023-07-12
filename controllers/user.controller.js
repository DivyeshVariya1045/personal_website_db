const userModel = require("../model/user.model");
var nodemailer = require("nodemailer");
const moment = require("moment");
var md5 = require("md5");
const fileModel = require("../model/file.model");

// var changePassword = (req, res) => {
//   try {
//     userModel
//       .findOne({ _id: req.body.u_id })
//       .then((result) => {
//         if (result) {
//           console.log(result, "rrrrr");
//           if (result.password == md5(req.body.currentPassword)) {
//             userModel
//               .findByIdAndUpdate(
//                 { _id: req.body.u_id },
//                 { password: md5(req.body.newPassword) }
//               )
//               .then((result) => {
//                 if (result) {
//                   console.log(result, "new");
//                   res.send({
//                     status: 1,
//                     result: result,
//                     message: "Password change successfully...",
//                   });
//                 } else {
//                   res.send({
//                     status: 0,
//                     message: "Password not changed successfully...",
//                   });
//                 }
//               });
//           } else {
//             res.send({ status: 0, message: "old password not matched !" });
//           }
//         } else {
//           res.send({
//             status: 0,
//             message: "User not found !",
//           });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     // userModel
//     //   .findByIdAndUpdate(
//     //     { _id: req.body.u_id },
//     //     { password: md5(req.body.newPassword) }
//     //   )
//     //   .then((user) => {
//     //     if (req.body.password == result[0].password) {
//     //       res.send({
//     //         status: 1,
//     //         user: user,
//     //         message: "Password Changed Successfully...",
//     //       });
//     //     } else {
//     //       res.send({ status: 0, user: [], message: "Invalid Old Password..." });
//     //     }
//     //   });
//   } catch (error) {
//     console.log(error);
//   }
// };
var totalUser = (req, res) => {
  try {
    var query = userModel.find({ u_type: 1 });
    query.count(function (err, count) {
      if (err) {
        console.log(err);
      }
      res.send({ count: count });
    });
  } catch (error) {
    console.log(error);
  }
};

var getUserList = (req, res) => {
  try {
    userModel
      .find()
      .then((users) => {
        console.log(users);
        res.send({ users: users });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("error found");
  }
};
// var getUserList1 = (req, res) => {
//   try {
//     userModel
//       .find({ u_type: 2 })
//       .then((users) => {
//         console.log(users);
//         res.send({ users: users });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log("error found");
//   }
// };

var insertUserController = async (req, res) => {
  try {
    userModel
      .findOne({ email: req.body.email })
      .then((result) => {
        if (result) {
          res.send({ status: 0, message: "Email is already exist !" });
        } else {
          userModel
            .create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              mobile: req.body.mobile,
              password: md5(req.body.password),
              // u_media:req.files.u_media.name
            })
            .then((result) => {
              if (result) {
                // let media = [];
                // if (req.files.u_media.length == undefined) {
                //   media.push(req.files.u_media);
                // } else {
                //   media = req.files.u_media;
                // }
                // for (let index = 0; index < media.length; index++) {
                //   const filePath = media[index];
                //   filePath.mv(
                //     `${__dirname}/../public/assets/images/${media[index].name}`,
                //     (error) => {
                //       if (error) {
                //         console.log(error, "error1");
                //       }
                //     }
                //   );
                // }
                res.send({
                  status: 200,
                  result: result,
                  message: "Registration successfully...",
                });
              } else {
                res.send({ status: 1, result: [], message: "not inserted" });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(req.body, "inserted");
  } catch (error) {
    console.log(error);
  }
};

// var insertProviderController = async (req, res) => {
//   try {
//     userModel
//       .findOne({ email: req.body.email })
//       .then((result) => {
//         if (result) {
//           res.send({ status: 0, message: "Email is already exist !" });
//         } else {
//           userModel
//             .create({
//               firstName: req.body.firstName,
//               lastName: req.body.lastName,
//               // u_category: req.body.category,
//               email: req.body.email,
//               otp: req.body.otp,
//               password: md5(req.body.password),
//               u_type: req.body.u_type,

//               // u_media:req.files.u_media.name
//             })
//             .then((result) => {
//               if (result) {
//                 // let media = [];
//                 // if (req.files.u_media.length == undefined) {
//                 //   media.push(req.files.u_media);
//                 // } else {
//                 //   media = req.files.u_media;
//                 // }
//                 // for (let index = 0; index < media.length; index++) {
//                 //   const filePath = media[index];
//                 //   filePath.mv(
//                 //     `${__dirname}/../public/assets/images/${media[index].name}`,
//                 //     (error) => {
//                 //       if (error) {
//                 //         console.log(error, "error1");
//                 //       }
//                 //     }
//                 //   );
//                 // }
//                 res.send({
//                   status: 1,
//                   result: result,
//                   message: "Registration successfully...",
//                 });
//               } else {
//                 res.send({ status: 0, result: [], message: "not inserted" });
//               }
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     console.log(req.body, "inserted");
//   } catch (error) {
//     console.log(error);
//   }
// };

// var updateUserController = (req, res) => {
//   try {
//     userModel
//       .findByIdAndUpdate(
//         {
//           _id: req.body.u_id,
//           u_type: 2,
//         },
//         {
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           u_media: req.body.u_media,
//         }
//       )
//       .then((u_result) => {
//         if (result) {
//           res.send({
//             result: u_result,
//             status: 1,
//             message: "Profile updated successfully...",
//           });
//         } else {
//           res.send({ status: 0, message: "Something is Wrong,Try again!" });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// var updateStatusController = (req, res) => {
//   try {
//     // let UserStatus ;
//     // if(req.body.u_status === 1){
//     // UserStatus===0;}else{
//     // UserStatus===1;}
//     userModel
//       .findByIdAndUpdate(
//         {
//           _id: req.body._id,
//         },
//         {
//           u_status: req.body.u_status,
//         }
//       )
//       .then((u_result) => {
//         if (u_result) {
//           res.send({
//             result: u_result,
//             status: 1,
//             message: "status updated successfully...",
//           });
//         } else {
//           res.send({ status: 0, message: "Something is Wrong,Try again!" });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
// var updateProviderStatusController = (req, res) => {
//   try {
//     // let UserStatus ;
//     // if(req.body.u_status === 1){
//     // UserStatus===0;}else{
//     // UserStatus===1;}
//     userModel
//       .findByIdAndUpdate(
//         {
//           _id: req.body._id,
//         },
//         {
//           p_status: req.body.p_status,
//         }
//       )
//       .then((p_result) => {
//         if (p_result) {
//           res.send({
//             result: p_result,
//             status: 1,
//             message: "Request Accepted",
//           });
//         } else {
//           res.send({ status: 0, message: "Something is Wrong,Try again!" });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
var loginUsers = (req, res) => {
  try {

    userModel
      .findOne({ email: req.body.email, password: md5(req.body.password) })
      .then((result) => {
        if (result) {

          // let transport = nodemailer.createTransport({
          //   service: "gmail",
          //   auth: {
          //     user: "homelysolutions0@gmail.com",
          //     pass: "efzvhxatargapgyc",
          //   },
          // });

          // let mailOptions = {
          //   from: "homelysolutions0@gmail.com",
          //   to: req.body.email,
          //   subject: "Login Alerts",
          //   text: "Login Suceessfully...",
          // };
          // transport.sendMail(mailOptions, (err, info) => {
          //   if (err) {
          //     console.log(err, "err");
          //   } else {
          //     console.log(info, "info");
          //   }
          // });
          res.send({
            status: 200,
            result: result,
            message: "Login Successfully",
          });
        } else {
          res.send({
            status: 0,
            result: [],
            message: "email or password invalid !",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("no exist");
  }
};

// var otpRequestController = (req, res) => {
//   try {
//     const otp = Math.floor(Math.random() * 1000000) + 1;
//     userModel.findOne({ email: req.params.email }).then((result) => {
//       if (result) {
//         userModel
//           .findOneAndUpdate({ email: req.params.email }, { otp: otp })
//           .then((result) => {
//             if (result) {
//               let transport = nodemailer.createTransport({
//                 service: "gmail",
//                 auth: {
//                   user: "homelysolutions0@gmail.com",
//                   pass: "efzvhxatargapgyc",
//                 },
//               });

//               let mailOptions = {
//                 from: "homelysolutions0@gmail.com",
//                 to: req.params.email,
//                 subject: "Test Mail",
//                 text: `Otp is ${otp} ...`,
//               };
//               transport.sendMail(mailOptions, (err, info) => {
//                 if (err) {
//                   console.log(err, "err");
//                 } else {
//                   console.log(info, "info");
//                 }
//               });
//               res.send({ status: 1, message: "otp sent successfully" });
//             } else {
//               res.send({ status: 0, message: "otp not send" });
//             }
//           });
//       } else {
//         res.send({ status: 0, message: "email does not exist" });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// var verifyOtp = (req, res) => {
//   try {
//     userModel
//       .findOne({ email: req.params.email, otp: req.params.otp })
//       .then((result) => {
//         if (result) {
//           userModel.findOne(
//             { email: req.params.email, otp: req.params.otp },
//             { otp: null }
//           );
//           res.send({ status: 1, message: "Otp Verified... " });
//         } else {
//           userModel.findOne(
//             { email: req.params.email, otp: req.params.otp },
//             { otp: null }
//           );
//           res.send({ status: 0, message: "Otp is Wrong !" });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
// var verifyOtp1 = (req, res) => {
//   try {
//     userModel
//       .findOne({ otp: req.params.otp })
//       .then((result) => {
//         if (result) {
//           userModel.findOneAndUpdate({ otp: req.params.otp }, { otp: null });
//           res.send({ status: 1, message: "Otp Verified... " });
//         } else {
//           userModel.findOneAndUpdate({ otp: req.params.otp }, { otp: null });
//           res.send({ status: 0, message: "Otp is Wrong !" });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// var setNewPassword = (req, res) => {
//   try {
//     userModel
//       .findOneAndUpdate(
//         { email: req.body.email, otp: req.body.otp },
//         { otp: null, password: md5(req.body.password) }
//       )
//       .then((result) => {
//         if (result) {
//           res.send({ status: 1, message: "Password changed successfully..." });
//         } else {
//           res.send({ status: 0, message: "Password not changed !" });
//         }
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// var deleteUser = (req, res) => {
//   try {
//     userModel
//       .findByIdAndDelete({ _id: req.body._id })
//       .then((result) => {
//         res.send({ status: 1, result: result, message: "record deleted" });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// var editProviderProfile = (req, res) => {
//   try {

//     console.log(req.files,"fgfggffg")
//     userModel
//       .findByIdAndUpdate(
//         { _id: req.body.u_id },
//         {
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           u_media: req.files.u_media.name,
//         } 
//       )
//       .then((profile) => {
//         if (profile) {
//           let media = [];
//           if (req.files.u_media.length == undefined) {
//             media.push(req.files.u_media);
//           } else {
//             media = req.files.u_media;
//           }
//           for (let index = 0; index < media.length; index++) {
//             const filePath = media[index];
//             filePath.mv(
//               `${__dirname}/../public/assets/images/${media[index].name}`,
//               (error) => {
//                 if (error) {
//                   console.log(error, "error1");
//                 }
//               }
//             );
//           }
//           res.send({
//             status: 1,
//             profile: profile,
//             message: "Profile Updated successfully...",
//           });
//         } else {
//           res.send({ status: 1, profile: [], message: "Profile not Updated" });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// var getUser = (req, res) => {
//   try {
//     userModel.findOne({ _id: req.params.u_id }).then((result) => {
//       if (result) {
//         res.send({ status: 1, data: result, message: "get user" });
//       } else {
//         res.send({ status: 0, data: [], message: "get not user" });
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


module.exports = {
  getUserList,
  insertUserController,
  // updateUserController,
  // otpRequestController,
  // setNewPassword,
  loginUsers,
  // deleteUser,
  // changePassword,
  // verifyOtp,
  // totalUser,
  // verifyOtp1,
  // getUserList1,
  // updateStatusController,
  // insertProviderController,
  // editProviderProfile,
  // updateProviderStatusController,
  // getUser
};
