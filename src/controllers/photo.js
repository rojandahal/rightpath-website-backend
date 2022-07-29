// sendResponse helper function
const { sendResponse } = require("../helpers/response");

//cloudinary define
const cloudinary = require("../utils/cloudinary");
// asyncHandler import
const asyncHandler = require("../helpers/asyncHandler");

// Model photo
const Photo = require("../models/photo");
const ApiError = require("../errors/ApiError");
const { listeners } = require("../models/photo");

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
    const files = req.files;
    let avatars = [];
    let response = [];

    for (const file of files) {
      let result = await cloudinary.uploader.upload(file.path, "Images");
      const urls = {
        url: result.secure_url,
        cloudinary_id: result.public_id,
      };
      avatars.push(urls);
      response.push(result);
    }

    // Create new photo
    let photo = new Photo({
      name: req.body.name,
      avatar: avatars,
      user: req.body.userid,
    });
    // Save photo
    await photo.save();

    return sendResponse(
      res,
      {
        status: "Sucess",
        data: response,
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
    for (const avatar of photo.avatar) {
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(avatar.cloudinary_id);
    }

    // Delete photo from db
    await photo.remove();
    res.json(photo);
  } catch (err) {
    console.log(err);
  }
});
