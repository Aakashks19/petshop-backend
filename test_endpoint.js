const jwt = require('jsonwebtoken');
require('dotenv').config();

// Simple script to test the /api/orders/:id endpoint
async function testEndpoint() {
    // Need a user token
    const token = jwt.sign({ _id: '65d1... some user id' }, process.env.JWT_SECRET);
    // This won't work easily because I need a REAL user id from the DB.
}
