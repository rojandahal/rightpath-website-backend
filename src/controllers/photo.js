// sendResponse helper function
const { sendResponse } = require("../helpers/response");

//cloudinary define
const cloudinary = require("../utils/cloudinary");
// asyncHandler import
const asyncHandler = require("../helpers/asyncHandler");

// Model photo
const Photo = require("../models/photo");
const ApiError = require("../errors/ApiError");

//@des      Get all photo
//@route    GET /api/v1/photo
//@access   Public
exports.getPhotos = asyncHandler(async (req, res, next) => {
  return sendResponse(res, res.advanceResults, 200, "application/json");
});

//@des      Create photo
//@route    POST /api/v1/photo
//@access   Private: [admin, owner]
exports.createPhoto = asyncHandler(async (req, res, next) => {
  try {
    // Upload image to cloudinary
    // const files = req.files;
    
    let result=cloudinary.uploader.upload(req.file.path);
    // for (const file of files) {
    // }
     // Create new photo
     let photo = new Photo({
      name: req.body.name,
      avatar: result.secure_url,
      user: req.body.userid,
      cloudinary_id: result.public_id,
    });
    // Save photo
    await photo.save();
    return sendResponse(
      res,
      {
        status: "Sucess",
        data: result,
      },
      200,
      "application/json"
    );
  } catch (err) {
    console.log(err);
  }
});

exports.deletePhoto = asyncHandler(async (req, res, next) => {
  try {
    // Find photo by id
    let photo = await Photo.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(photo.cloudinary_id);
    // Delete photo from db
    await photo.remove();
    res.json(photo);
  } catch (err) {
    console.log(err);
  }
});
