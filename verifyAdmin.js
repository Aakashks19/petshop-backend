const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');

const verifyAdmin = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb+srv://aakashks1903_db_user:pRrCNDH06Ie81Jvj@cluster0.8g8kxge.mongodb.net/petshop?retryWrites=true&w=majority';
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const admin = await User.findOne({ email: 'admin@exoticpets.com' });
        if (admin) {
            console.log('Admin user found:', admin.email);
            console.log('Role:', admin.role);
        } else {
            console.log('Admin user NOT found');
        }
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

verifyAdmin();
