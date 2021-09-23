const mysql = require("mysql2");

function getAll (connection) {
     // this returns the query as a promise
     return connection.promise().query("SELECT * FROM employee");
};

function addEmp (connection, newEmpName) {
    return connection.promise().query("INSERT INTO employee (name) VALUES (?)", newDeptName);
};

function upEmp (connection, empName) {
    return connection.promise().query("UPDATE");
}

function delEmp (connection, delDeptID) {
    return connection.promise().query("DELETE FROM department WHERE id=(?)", delDeptID);
}

module.exports = {getAll, addEmp, upEmp, delEmp};