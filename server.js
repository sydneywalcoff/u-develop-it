const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '59Zyv@VbJwBJ',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// routes
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// catchall route
app.use((req, res) => {
    res.status(404).end();
});

// listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});