const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    name : {
        type: String
    },
    avatar: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
    },
    cloudinary_id: {
        type: String
    },

});

module.exports = mongoose.model("photo",photoSchema);
