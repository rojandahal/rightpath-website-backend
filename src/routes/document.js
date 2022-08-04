const express = require('express');

// Controllers
const {
    getDocuments,
    getDocument,
    createDocument,
    deleteDocument,
    updateDocument
} = require('../controllers/documents');

// Express router
const router = express.Router();

// Advance results
const advanceResults = require('../middlewares/advanceResults');
const { protect, authorization } = require('../middlewares/auth');
const Document = require('../models/Document');

// // Re-route into other resource routers
// router.use('/:DocumentId/reservations', reservationRoutes)


router
    .route('/')
    .get(protect, authorization('admin'),advanceResults(Document), getDocuments)
    .post(createDocument)

router
    .route('/:id')
    .get(protect, authorization('admin'),getDocument)
    .put(protect, authorization('admin'), updateDocument)
    .delete(protect, authorization('admin'), deleteDocument)



module.exports = router;