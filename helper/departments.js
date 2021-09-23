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

function sumDept (connection) {
    // using `` makes the mysql query much easier to read; will consider refactoring the othe queries later
    return connection.promise().query(`SELECT 
    d.name, SUM(salary) AS total_budget 
    FROM department d
    JOIN role r ON d.id = r.department_id
    JOIN employee e on r.id = e.role_id
    WHERE d.id
    GROUP BY d.name`);
}

module.exports = {getAll, addDept, delDept, sumDept};