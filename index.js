// bring in express, mysql2, dotenv, and console.table
//const express = require("express");
const mysql = require("mysql2");
require('dotenv').config();
const cTable = require("console.table");

//const PORT = process.env.PORT || 3001;
//const app = express();

// use mysql2 to connect to the database, using the .env file to provide values
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  // message on successful connection
  console.log(`Connected to the ${process.env.DB_NAME} database`)
);

// test query of the database on a table, and output the result using the console.table package
db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.table("Employee Roster", result);
});