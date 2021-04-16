const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
const inputCheck = require('./utils/inputCheck');

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

// GET all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id= ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'sucess',
            data: row
        });
    });
});
    

// DELETE a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id=?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result)=> {
        if(err) {
            res.statusMessage(400).json({ error: res.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


// CREATE a candidate
app.post('/api/candidate', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({errors: errors});
        return;
    }
    const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES(?,?,?,?)`;
    const params = [2, 'Virginia', 'Woolf', 1];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});


// catchall route
app.use((req, res) => {
    res.status(404).end();
});

// listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});