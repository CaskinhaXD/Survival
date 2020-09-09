const express = require('express');
const dataStore=require('nedb');

const app = express();
app.listen(8080, () => {
  console.log('server is listening');
});

const database=new dataStore('database.db');
database.loadDatabase()

app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));