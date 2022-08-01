const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  avatar: [
    {
      url: String,
      cloudinary_id: String,
    }
  ],
  document: {
    type: mongoose.Schema.ObjectId,
  },
});

module.exports = mongoose.model("photo", photoSchema);
