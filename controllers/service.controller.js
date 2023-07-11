const serviceModel = require("../model/service.model");
const fileModel = require("../model/file.model");
var insertService = (req, res) => {
  try {
    console.log(req.body,"is");
    console.log(req.files,"isf");

    serviceModel
      .create({
        s_name: req.body.s_name,
        c_id: req.body.c_id,
        // duration:req.body.duration,
        s_c_id: req.body.s_c_id,
        s_desc: req.body.s_desc,
        price: req.body.price,
      })
      .then((result) => {
        console.log(result, "ddddddddddd");
        if (result) {
          let media = [];
          if (req.files.s_media.length == undefined) {
            media.push(req.files.s_media);
          } else {
            media = req.files.s_media;
          }
          for (let index = 0; index < media.length; index++) {
            fileModel
              .create({
                s_media: media[index].name,
                s_id: result._id,
              })
              .then((result) => {
                if (result) {
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
              })
              .catch((error) => {
                console.log(error);
              });
          }
          res.send({
            status: 1,
            result: result,
            message: "Service Inserted successfully...",
          });
        } else {
          res.send({ status: 1, result: [], message: "Service not inserted" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

var updateServices = (req, res) => {
  try {
    console.log(req.body,"us");
    console.log(req.files,"usf");

    serviceModel
      .findByIdAndUpdate(
        {
          _id: req.body.s_id,
        },
        {
          s_name: req.body.s_name,
          c_id: req.body.c_id,
          s_c_id: req.body.s_c_id,
          s_desc: req.body.s_desc,
          // duration:req.body.duration,
          price: req.body.price,
        }
      )
      .then((result) => {
        if (result) {
          let media = [];
          if (req.files.s_media) {
            if (req.files.s_media.length == undefined) {
              media.push(req.files.s_media);
            } else {
              media = req.files.s_media;
            }
            for (let index = 0; index < media.length; index++) {
              fileModel
                .create({
                  s_media: media[index].name,
                  s_id: result._id,
                })
                .then((result) => {
                  if (result) {
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
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
          res.send({
            status: 1,
            result: result,
            message: "Service updated successfully...",
          });
        } else {
          res.send({ status: 0, result: [], message: "Service not updated" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
var getServices = (req, res) => {
  try {
    serviceModel
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
        {
          $lookup: {
            from: "subcatagories",
            localField: "s_c_id",
            foreignField: "_id",
            as: "s_c_id",
          },
        },
        {
          $unwind: "$s_c_id",
        },

        {
          $lookup: {
            from: "files",
            localField: "_id",
            foreignField: "s_id",
            as: "s_media",
          },
        },
        // {
        //    $unwind: "$s_media",
        // }
      ])
      .exec((err, services) => {
        console.log(services);
        if (err) {
          console.log(err);
          res.send({ status: 0, data: [], message: "Products List not Found" });
        } else {
          if (services.length > 0) {
            console.log(services,"okoko");
            res.send({ status: 1, data: services, message: "Product List" });
          }
        }
      });
  } catch (error) {
    console.log(error);
  }
};
var deleteServices = (req, res) => {
  try {
    serviceModel
      .findByIdAndDelete({ _id: req.body.s_id })
      .then((result) => {
        res.send({ status: 1, result: result, message: "service deleted" });
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { insertService, getServices, updateServices, deleteServices };
