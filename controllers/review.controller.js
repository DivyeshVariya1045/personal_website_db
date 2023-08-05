const reviewModel = require("../model/review.model");

var insertReview = (req, res) => {
  try {
    reviewModel.findOne({ userId: req.body.userId }).then((result) => {
      if (result) {
        res.send({ status: 0, message: "Review is already exist !" });
      } else {
        reviewModel
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            message: req.body.message,
            userId: req.body.userId,
          })
          .then((result) => {
            if (result) {
              res.send({
                status: 200,
                result: result,
                message: "review posted successfully...",
              });
            } else {
              res.send({
                status: 0,
                result: [],
                message: "review not posted !!!",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

var getReviewConntroller = (req, res) => {
  try {
    reviewModel
      .find()
      .then((review) => {
        res.send({ reviews: review });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("error found");
  }
};

module.exports = {
  insertReview,
  getReviewConntroller,
};
