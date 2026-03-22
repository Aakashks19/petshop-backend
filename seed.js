const mongoose = require('mongoose');
const Pet = require('./models/Pet');
const dotenv = require('dotenv');

dotenv.config();

const pets = [
    // BIRDS
    {
        name: 'Rainbow Lovebirds',
        category: 'Birds',
        breed: 'Fischer\'s',
        age: '3 Months',
        price: 1200,
        stock: 10,
        description: 'Playful and colorful bonded pair of lovebirds with vibrant plumage.',
        images: ['/images/pets/rainbow_lovebirds.jpg'],
        featured: true
    },
    {
        name: 'Golden Cockatiel',
        category: 'Birds',
        breed: 'Lutino',
        age: '5 Months',
        price: 2500,
        stock: 5,
        description: 'Hand-tamed cockatiel with a beautiful golden crest and friendly personality.',
        images: ['/images/pets/golden_cockatiel.jpg']
    },
    {
        name: 'Zebra Finches',
        category: 'Birds',
        breed: 'Common',
        age: '2 Months',
        price: 600,
        stock: 20,
        description: 'Active and social small birds, perfect for beginners and community aviaries.',
        images: ['/images/pets/zebra_finches.jpg']
    },
    {
        name: 'African Lovebird',
        category: 'Birds',
        breed: 'Peachfaced',
        age: '4 Months',
        price: 1500,
        stock: 8,
        description: 'Active, loud, and incredibly charming companion birds.',
        images: ['/images/pets/african_lovebird.jpg']
    },
    {
        name: 'Yellow Budgerigar',
        category: 'Birds',
        breed: 'Parakeet',
        age: '3 Months',
        price: 800,
        stock: 15,
        description: 'Bright yellow budgie, very active and easy to train.',
        images: ['/images/pets/budgerigar.jpg']
    },

    // SMALL ANIMALS
    {
        name: 'Grey Hamster',
        category: 'Small Animals',
        breed: 'Siberian',
        age: '2 Months',
        price: 450,
        stock: 15,
        description: 'Tiny and cute dwarf hamster, very energetic and fun to watch.',
        images: ['/images/pets/grey_hamster.jpg']
    },
    {
        name: 'Pygmy Hedgehog',
        category: 'Small Animals',
        breed: 'African',
        age: '4 Months',
        price: 4500,
        stock: 3,
        description: 'Unique and exotic small pet, easy to care for and very quiet.',
        images: ['/images/pets/pygmy_hedgehog.jpg']
    },
    {
        name: 'Holland Lop Rabbit',
        category: 'Small Animals',
        breed: 'Purebred',
        age: '3 Months',
        price: 3500,
        stock: 4,
        description: 'Fluffy ears and a very friendly, docile personality.',
        images: ['/images/pets/holland_lop_rabbit.jpg']
    },
    {
        name: 'Sugar Glider',
        category: 'Small Animals',
        breed: 'Classic Gray',
        age: '5 Months',
        price: 12000,
        stock: 2,
        description: 'Pocket-sized marsupial that loves to bond with its owners.',
        images: ['/images/pets/sugar_glider.jpg']
    },

    // REPTILES
    {
        name: 'Ball Python',
        category: 'Reptiles',
        breed: 'Normal Morph',
        age: '1 Year',
        price: 8000,
        stock: 2,
        description: 'Docile and great starter snake for reptile enthusiasts.',
        images: ['/images/pets/ball_python.jpg']
    },
    {
        name: 'Green Iguana',
        category: 'Reptiles',
        breed: 'South American',
        age: '6 Months',
        price: 5500,
        stock: 4,
        description: 'Majestic reptile that grows quite large; for experienced keepers.',
        images: ['/images/pets/green_iguana.jpg']
    },
    {
        name: 'Corn Snake',
        category: 'Reptiles',
        breed: 'Amelanistic',
        age: '8 Months',
        price: 3500,
        stock: 5,
        description: 'Bright orange colorful snake, very active and easy to handle.',
        images: ['/images/pets/corn_snake.jpg']
    },
    {
        name: 'Veiled Chameleon',
        category: 'Reptiles',
        breed: 'Yemen',
        age: '4 Months',
        price: 6500,
        stock: 3,
        description: 'Stunning colors and unique eyes; a master of camouflage.',
        images: ['/images/pets/veiled_chameleon.jpg']
    },

    // MAMMALS (DOGS & CATS)
    {
        name: 'Golden Retriever',
        category: 'Mammals',
        breed: 'Purebred',
        age: '2 Months',
        price: 25000,
        stock: 2,
        description: 'Friendly, active, and healthy puppy ready for a forever home.',
        images: ['/images/pets/golden_retriever.jpg'],
        featured: true
    },
    {
        name: 'Persian Cat',
        category: 'Mammals',
        breed: 'Punch Face',
        age: '3 Months',
        price: 15000,
        stock: 3,
        description: 'Long-haired fluffy white kitten with a gentle temperament.',
        images: ['/images/pets/persian_cat.jpg']
    },
    {
        name: 'French Bulldog',
        category: 'Mammals',
        breed: 'Standard',
        age: '3 Months',
        price: 40000,
        stock: 1,
        description: 'Loyal and playful companion, perfect for apartment living.',
        images: ['/images/pets/french_bulldog.jpg']
    },
    {
        name: 'Dachshund Puppy',
        category: 'Mammals',
        breed: 'Miniature',
        age: '2 Months',
        price: 35000,
        stock: 2,
        description: 'Adorable "wiener dog" puppy with a brave and curious spirit.',
        images: ['/images/pets/dachshund.jpg']
    },
    {
        name: 'Siamese Cat',
        category: 'Mammals',
        breed: 'Traditional',
        age: '4 Months',
        price: 18000,
        stock: 2,
        description: 'Elegant cat with striking blue eyes and a vocal personality.',
        images: ['/images/pets/siamese_cat.jpg']
    },
    {
        name: 'Beagle Puppy',
        category: 'Mammals',
        breed: 'Tri-color',
        age: '2 Months',
        price: 28000,
        stock: 3,
        description: 'Merry and energetic hound puppy, great for families.',
        images: ['/images/pets/beagle.jpg']
    },

    // AQUARIUM
    {
        name: 'Betta Fish',
        category: 'Aquarium',
        breed: 'Halfmoon',
        age: '6 Months',
        price: 500,
        stock: 30,
        description: 'Beautiful vibrant colors and long flowing fins; independent fish.',
        images: ['/images/pets/betta_fish.jpg']
    },
    {
        name: 'Neon Tetras',
        category: 'Aquarium',
        breed: 'Tropical',
        age: '3 Months',
        price: 50,
        stock: 100,
        description: 'Glowing school of fish that adds life to any community tank.',
        images: ['/images/pets/neon_tetras.jpg']
    },
    {
        name: 'Guppy Fish',
        category: 'Aquarium',
        breed: 'Fancy Tail',
        age: '3 Months',
        price: 80,
        stock: 50,
        description: 'Active and colorful tropical fish, very easy to breed.',
        images: ['/images/pets/guppy_fish.jpg']
    }
];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://aakashks1903_db_user:pRrCNDH06Ie81Jvj@cluster0.8g8kxge.mongodb.net/petshop?retryWrites=true&w=majority');
        console.log('Connected to MongoDB... 🔌');

        await Pet.deleteMany({});
        console.log('Old pets cleared... 🧹');

        await Pet.insertMany(pets);
        console.log(`Database Seeded with ${pets.length} pets! 🐾`);

        process.exit();
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seedDB();
