const catagoryModel = require("../model/catagory.model");
// const fileModel = require("../model/file.model");

var insertCatagory = (req,res) =>{
  try {
  
    console.log(req.files,"lllllllllllll");
    catagoryModel
      .create({
        c_name: req.body.c_name,
        c_media: req.files.c_media.name,
      })
      .then((result) => {
        if (result) {
          let media = [];
          if (req.files.c_media.length == undefined) {
            media.push(req.files.c_media);
          } else {
            media = req.files.c_media;
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
            message: "category Inserted successfully...",
          });
        } else {
          res.send({ status: 1, result: [], message: "category not inserted" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
 }catch(error){
console.log(error);}}

var updateCategory = (req, res) => {
    try {
      console.log(req.body);
  
      catagoryModel
        .findByIdAndUpdate(
          {
            _id: req.body.c_id,
          },
          {
            c_name: req.body.c_name,
            c_media: req.files.c_media.name,
          }
        )
        .then((result) => {
          if (result) {
            let media = [];
            if (req.files.c_media.length == undefined) {
              media.push(req.files.c_media);
            } else {
              media = req.files.c_media;
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
              message: "category Updated successfully...",
            });
          } else {
            res.send({ status: 1, result: [], message: "category not Updated" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  var deleteCategory = (req, res) => {
    try {
      catagoryModel
        .findByIdAndDelete({ _id: req.body.c_id })
        .then((result) => {
          res.send({ status: 1, result: result, message: "Category deleted" });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  var getCatagoryList = (req, res) => {
    try {
      catagoryModel
        .find()
        .then((catagory) => {
          if (catagory) {
            // console.log(catagory);
            res.send({ status: 1, data: catagory, message: "catagory list" });
          } else {
            res.send({ status: 0, data: [], message: " List not found" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  
module.exports ={
getCatagoryList,
insertCatagory,
deleteCategory,
updateCategory,
}  
