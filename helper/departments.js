const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

function getAll (connection) {
     // this returns the query as a promise
     return connection.promise().query("SELECT * FROM department")
};

function addDept (connection, newDeptName) {
    return connection.promise().query("INSERT INTO department (name) VALUES (?)", newDeptName);
};

function delDept (connection, delDeptID) {
    return connection.promise().query("DELETE FROM department WHERE name = ?", delDeptID);
}

module.exports = {getAll, addDept, delDept};