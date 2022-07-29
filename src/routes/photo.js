const express = require('express');
const upload = require("../utils/multer")

// Controllers
const {
    getPhotos,
    createPhoto,
    deletePhoto
} = require('../controllers/photo');

// Express router
const router = express.Router();

// Advance results
const advanceResults = require('../middlewares/advanceResults');
const { protect, authorization } = require('../middlewares/auth');
const Photo = require('../models/photo');

router
  .route('/')
  .post(upload.array("image"), createPhoto);

// photo.get("/", async (req, res) => {
//   try {
//     let photo = await Photo.find();
//     res.json(photo);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.delete("/:id",deletePhoto);

// photo.put("/:id", upload.single("image"), async (req, res) => {
//   try {
//     let photo = await Photo.findById(req.params.id);
//     // Delete image from cloudinary
//     await cloudinary.uploader.destroy(photo.cloudinary_id);
//     // Upload image to cloudinary
//     let result;
//     if (req.file) {
//       result = await cloudinary.uploader.upload(req.file.path);
//     }
//     const data = {
//       name: req.body.name || photo.name,
//       avatar: result?.secure_url || photo.avatar,
//       cloudinary_id: result?.public_id || photo.cloudinary_id,
//     };
//     photo = await photo.findByIdAndUpdate(req.params.id, data, { new: true });
//     res.json(photo);
//   } catch (err) {
//     console.log(err);
//   }
// });

// photo.get("/:id", async (req, res) => {
//   try {
//     // Find photo by id
//     let photo = await Photo.findById(req.params.id);
//     res.json(photo);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
