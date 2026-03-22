const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://aakashks1903_db_user:pRrCNDH06Ie81Jvj@cluster0.8g8kxge.mongodb.net/petshop?retryWrites=true&w=majority');
        console.log('Connected to MongoDB... 🔌');

        const adminEmail = 'admin@exoticpets.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists. 🛡️');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash('admin123', 8);
        const adminUser = new User({
            name: 'System Admin',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            phone: '9999999999',
            address: 'Admin HQ, Pet City'
        });

        await adminUser.save();
        console.log('Admin user seeded successfully! 🛡️✨');
        console.log('Email: admin@exoticpets.com');
        console.log('Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
