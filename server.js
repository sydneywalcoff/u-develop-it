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
    // console.log(rows);
});

// // GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id=1`, (err, row) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// // DELETE a candidate
// db.query(`DELETE FROM candidates WHERE id=?`, 1, (err, result)=> {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// // CREATE a candidate
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//     VALUES(?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if(err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// catchall route
app.use((req, res) => {
    res.status(404).end();
});

// listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});