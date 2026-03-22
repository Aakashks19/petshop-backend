const Pet = require('../models/Pet');

exports.getPets = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sort, search } = req.query;
        let query = {};

        if (category) query.category = category;

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { breed: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let pets = Pet.find(query);
        if (sort === 'low') pets = pets.sort({ price: 1 });
        else if (sort === 'high') pets = pets.sort({ price: -1 });

        const results = await pets;
        res.send(results);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).send();
        res.send(pet);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.createPet = async (req, res) => {
    const pet = new Pet(req.body);
    try {
        await pet.save();
        res.status(201).send(pet);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!pet) return res.status(404).send();
        res.send(pet);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) return res.status(404).send();
        res.send(pet);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'Please upload a file' });
        }
        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        res.send({ imageUrl });
    } catch (e) {
        res.status(500).send(e);
    }
};
