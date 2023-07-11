const reviewModel = require("../model/review.model");


var insertReview = (req, res) => {
    try {
      console.log("body", req.body);
      reviewModel
        .create({
          r_desc: req.body.review,
          u_id: req.body.u_id,
          s_id: req.body.s_id,
          r_date: req.body.date,
          rating: req.body.rating,
          isInserted:0
        })
        .then((result) => {
          if (result) {
            res.send({
              status: 1,
              result: result,
              message: "review posted successfully...",
            });
          } else {
            res.send({ status: 0, result: [], message: "review not posted !!!" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  var getReviewConntroller = (req, res) => {
    try {
      reviewModel
          .aggregate([
            {
              $lookup: {
                from: "users",
                localField: "u_id",
                foreignField: "_id",
                as: "user",
              },
            },
            // { $unwind: "$u_id" },
          ])
          .exec((err, review) => {
          
            if (err) {
              console.log(err);
              res.send({ status: 0, data: [], message: "Products List not Found" });
            } else {
              if (review.length > 0) {
           
                res.send({ status: 1, data: review, message: "Product List" });
              }
            }
          });
           }   catch (error) {
        console.log(error);
      }
  };


  module.exports = {
    insertReview,
    getReviewConntroller}