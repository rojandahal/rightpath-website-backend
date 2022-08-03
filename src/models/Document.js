const mongoose = require('mongoose');
const slugify = require('slugify');

const DocumentSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'User name is required.'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required.']
    },
    contactNumber: {
        type: Number,
        required: [true, 'Contact Number is required.']
    },
    email: {
        type: String,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email.'
        ],
        required: [true, 'Email is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required.']
    },
    // photo: {
    //     type: mongoose.Schema.ObjectId,
    // },
    passportNo: {
        type: String
    },
    levelStudy: {
        type: String
    },
    desiredCountry: {
        type: String
    },
    desiredCourse: {
        type: String
    },
    desiredCoLevel: {
        type: String
    },
    courseReq: {
        type: String,
        enum: ["IELTS", "PTE", ""],
        default: [""]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
})

// Create bootcamp slug from the name 
DocumentSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

module.exports = mongoose.model('Document', DocumentSchema);
