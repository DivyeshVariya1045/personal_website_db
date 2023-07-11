const { resolve } = require("path");
const bookingModel = require("../model/booking.model");
const subCatagoryModel = require("../model/subcata.model");
const { rejects } = require("assert");
const { error } = require("console");

var insertSubCatagory = (req, res) => {
  try {
    console.log(req.files, "uuu");
    console.log(req.body);
    subCatagoryModel
      .create({
        s_c_name: req.body.s_c_name,
        c_id: req.body.c_id,
        s_c_media: req.files.s_c_media.name,
      })
      .then((result) => {
        if (result) {
          let media = [];
          if (req.files.s_c_media.length == undefined) {
            media.push(req.files.s_c_media);
          } else {
            media = req.files.s_c_media;
          }
          for (let index = 0; index < media.length; index++) {
            const filePath = media[index];
            filePath.mv(
              `${__dirname}/../public/assets/images/${media[index].name}`,
              (error) => {
                if (error) {
                  console.log(error, "error1");
                }
              }
            );
          }
          res.send({
            status: 1,
            result: result,
            message: "subcategory Inserted successfully...",
          });
        } else {
          res.send({
            status: 1,
            result: [],
            message: "subcategory not inserted",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
var updateSubcategory = (req, res) => {
  try {
    console.log(req.body, "lllll");

    subCatagoryModel
      .findByIdAndUpdate(
        {
          _id: req.body.s_c_id,
        },
        {
          c_id: req.body.c_id,
          s_c_name: req.body.s_c_name,
          s_c_media: req.files.s_c_media.name,
        }
      )
      .then((result) => {
        if (result) {
          let media = [];
          if (req.files.s_c_media.length == undefined) {
            media.push(req.files.s_c_media);
          } else {
            media = req.files.s_c_media;
          }
          for (let index = 0; index < media.length; index++) {
            const filePath = media[index];
            filePath.mv(
              `${__dirname}/../public/assets/images/${media[index].name}`,
              (error) => {
                if (error) {
                  console.log(error, "error1");
                }
              }
            );
          }
          res.send({
            status: 1,
            result: result,
            message: "subcategory updated successfully...",
          });
        } else {
          res.send({
            status: 1,
            result: [],
            message: "subcategory not updated",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

var deleteSubcategory = (req, res) => {
  try {
    subCatagoryModel
      .findByIdAndDelete({ _id: req.body.s_c_id })
      .then((result) => {
        res.send({
          status: 1,
          result: result,
          message: "subcategory  deleted",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
var getSubCatagoryList = (req, res) => {
  try {
    subCatagoryModel
      .find({ c_id: req.params.c_id })
      .then((result) => {
        if (result) {
          res.send({ status: 1, data: result, message: "Sub Category List" });
        } else {
          res.send({
            status: 0,
            data: [],
            message: "Sub Category List not Found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
var getSubCatagoryListAll = (req, res) => {
  try {
    subCatagoryModel
      .aggregate([
        {
          $lookup: {
            from: "catagories",
            localField: "c_id",
            foreignField: "_id",
            as: "c_id",
          },
        },
        { $unwind: "$c_id" },
      ])
      .exec((err, subcategory) => {
        console.log(subcategory);
        if (err) {
          console.log(err);
          res.send({ status: 0, data: [], message: "Products List not Found" });
        } else {
          if (subcategory) {
            res.send({ status: 1, data: subcategory, message: "Product List" });
          }
        }
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertSubCatagory,
  deleteSubcategory,
  updateSubcategory,
  getSubCatagoryList,
  getSubCatagoryListAll,
 
};
