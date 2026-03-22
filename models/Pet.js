const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Birds', 'Small Animals', 'Reptiles', 'Mammals', 'Aquarium']
    },
    breed: { type: String },
    age: { type: String },
    gender: { type: String },
    pairs: { type: Number, default: 1 },
    medicalStatus: { type: String },
    vaccinationStatus: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 1 },
    description: { type: String },
    images: [{ type: String }],
    rating: { type: Number, default: 5 },
    featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
