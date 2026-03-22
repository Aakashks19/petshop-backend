const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { auth, adminAuth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) return cb(null, true);
        cb(new Error('Only images are allowed!'));
    }
});

router.get('/', petController.getPets);
router.get('/:id', petController.getPetById);
router.post('/upload', auth, adminAuth, upload.single('image'), petController.uploadImage);
router.post('/', auth, adminAuth, petController.createPet);
router.put('/:id', auth, adminAuth, petController.updatePet);
router.delete('/:id', auth, adminAuth, petController.deletePet);

module.exports = router;
