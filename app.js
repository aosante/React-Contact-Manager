const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const port = process.env.PORT || 4000;
const app = express();

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());

const SELECT_ALL_CONTACTS = `SELECT * FROM contacts ORDER BY firstName ASC`;

//get and create database connection
function getConnection() {
  return mysql.createConnection({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b540407049090c',
    port: '3306',
    password: '1f41ab2e',
    database: 'heroku_cdf7d751774d818',
    insecureAuth: true
  });
}

//Server start
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

app.get('/api', (req, res) => {
  const connection = getConnection();
  connection.connect(err => {
    if (err) console.log(err);
    return;
  });
  connection.query(SELECT_ALL_CONTACTS, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
  connection.end();
});

app.get('/api/contacts', (req, res) => {
  const connection = getConnection();
  connection.connect(err => {
    if (err) console.log(err);
    return;
  });
  connection.query(SELECT_ALL_CONTACTS, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
  connection.end();
});

app.post('/api/contacts/add', (req, res) => {
  const connection = getConnection();
  connection.connect(err => {
    if (err) console.log(err);
    return;
  });
  const { firstName, lastName, email, phone } = req.query;
  const INSERT_CONTACT = `INSERT INTO contacts (firstName, lastName, email, phone) VALUES ('${firstName}', '${lastName}', '${email}', '${phone}')`;
  connection.query(INSERT_CONTACT, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      return res.send(results);
    }
  });
  connection.end();
});

app.delete('/api/contacts/delete/:id', (req, res) => {
  const connection = getConnection();
  connection.connect(err => {
    if (err) console.log(err);
    return;
  });
  const { id } = req.params;
  const DELETE_CONTACT = `DELETE FROM contacts WHERE id = ${id}`;
  connection.query(DELETE_CONTACT, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      return res.send(results);
    }
  });
  connection.end();
});

app.get('/api/contacts/edit/:id', (req, res) => {
  const connection = getConnection();
  connection.connect(err => {
    if (err) console.log(err);
    return;
  });
  const { id } = req.params;
  const GET_CONTACT = `SELECT * FROM contacts WHERE id = ${id}`;
  connection.query(GET_CONTACT, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
  connection.end();
});

app.put('/api/contacts/update/:id', (req, res) => {
  const connection = getConnection();
  connection.connect(err => {
    if (err) console.log(err);
    return;
  });
  const { id } = req.params;
  const { firstName, lastName, email, phone } = req.query;
  const UPDATE_CONTACT = `UPDATE contacts SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}', phone = '${phone}' WHERE id = ${id}`;
  connection.query(UPDATE_CONTACT, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
  connection.end();
});

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

//this goes in the end after all the requests
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});
