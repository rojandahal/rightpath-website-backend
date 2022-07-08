// sendResponse helper function 
const {sendResponse} = require('../helpers/response');

// asyncHandler import 
const asyncHandler = require('../helpers/asyncHandler');

// Model futsal
const Document = require('../models/Document');
const ApiError = require('../errors/ApiError');

//@des      Get all document
//@route    GET /api/v1/document
//@access   Public
exports.getDocuments = asyncHandler( async (req, res, next) => {
    return sendResponse(res, res.advanceResults, 200, 'application/json')
})

//@des      Get single document
//@route    GET /api/v1/document/:id
//@access   Public
exports.getDocument = asyncHandler( async (req, res, next) => {
    let doc = await Document.findById(req.params.id);

    if(!doc){
        return next(
            ApiError.notfound(`id of ${req.params.id} couldn't found.`)
        )
    }
    // doc = await doc.populate({
    //     path: 'reservation',
    //     select: 'reserverName startsAt endsAt'
    // })
    return sendResponse(res, {
        status: "Sucess",
        data: doc
    }, 200, 'application/json')
});

//@des      Create document 
//@route    POST /api/v1/document
//@access   Private: [admin, owner]
exports.createDocument = asyncHandler( async (req, res, next) => {

    const doc = await Document.create(req.body);
    
    return sendResponse(res, {
        status: "Sucess",
        data: doc
    }, 200, 'application/json')
});



/* No update Required */

// //@des      Update futsal 
// //@route    PUT /api/v1//:id
// //@access   Private: [admin, owner]
// exports.updateFutsal = asyncHandler( async (req, res, next) => {
//     let futsal = await Futsal.findById(req.params.id);
    
//     if(!futsal){
//         return next(
//             new ApiError(400, `Futsal of id ${req.params.id} couldn't be found.`)
//             )
//     }
    
//     if(futsal.user.toString() !== req.user.id && req.user.role !== 'admin'){
//         return next(
//             ApiError.unauthorized(`User of id ${req.user.id} is unauthorized.`)
//         )
//     }

//     futsal = await Futsal.findByIdAndUpdate(req.params.id, req.body, {
//         new: true, 
//         runValidators: true
//     })

//     return sendResponse(res, {
//         status: "Sucess",
//         data: futsal
//     }, 200, 'application/json')
//     });

    
//@des      Delete document 
//@route    Delete /api/v1/document/:id
//@access   Private: [admin, owner]
exports.deleteDocument = asyncHandler( async (req, res, next) => {
    let doc = await Document.findById(req.params.id);
    
    if(!doc){
        return next(
            new ApiError(400, `Futsal of id ${req.params.id} couldn't be found.`)
            )
    }
    
    if(doc.user.toString() !== req.user.id && req.user.role !== 'admin'){
        return next(
            ApiError.unauthorized(`User of id ${req.user.id} is unauthorized.`)
        )
    }

    await doc.remove();
    
    return sendResponse(res, {
        status: "Sucess",
        data: [],
        message: 'Deletetion sucess.'
    }, 200, 'application/json')
});


// //@des      Get all futsals by the publisher
// //@route    GET /api/v1/futsals/myfutsals
// //@access   Private: [admin, owner]
// exports.getMyFutsals = asyncHandler( async (req, res, next) => {
//     // Find the futsal by userId

//     console.log('my futsals')
//     const futsals = await Futsal.find({user: req.user._id})

//     // If there is no futsals
//     if(!futsals){
//         return next(
//             ApiError.notfound(`Futsals not found for user ${req.user._id} `)
//         )
//     };

//     return sendResponse(res, {
//         status: "Sucess",
//         data: futsals
//     }, 200, 'application/json')
// });