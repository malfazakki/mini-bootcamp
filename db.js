require('dotenv').config();
const { Pool } = require('pg');

// Menggunakan connection string dari environment variable
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;
