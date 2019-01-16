const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const port = process.env.PORT || 4000;
const app = express();

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendfile(path.join((__dirname = 'client/build/index.html')));
  });
}

app.use(cors());

const SELECT_ALL_CONTACTS = `SELECT * FROM contacts ORDER BY name ASC`;

//Connection creation to mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'newpass',
  database: 'contacts_sql',
  insecureAuth: true
});

connection.connect(err => {
  if (err) console.log(err);
});

//Server start
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

app.get('/', (req, res) => {
  connection.query(SELECT_ALL_CONTACTS, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.get('/contacts', (req, res) => {
  connection.query(SELECT_ALL_CONTACTS, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.post('/contacts/add', (req, res) => {
  const { name, email, phone } = req.query;
  const INSERT_CONTACT = `INSERT INTO contacts (name, email, phone) VALUES ('${name}', '${email}', '${phone}')`;
  connection.query(INSERT_CONTACT, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      return res.send(results);
    }
  });
});

app.delete('/contacts/delete/:id', (req, res) => {
  const { id } = req.params;
  const DELETE_CONTACT = `DELETE FROM contacts WHERE id = ${id}`;
  connection.query(DELETE_CONTACT, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      return res.send(results);
    }
  });
});

app.get('/contacts/edit/:id', (req, res) => {
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
});

app.put('/contacts/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.query;
  const UPDATE_CONTACT = `UPDATE contacts SET name = '${name}', email = '${email}', phone = '${phone}' WHERE id = ${id}`;
  connection.query(UPDATE_CONTACT, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

//this goes in the end after all the requests
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});
