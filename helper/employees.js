const mysql = require("mysql2");

function getAll (connection) {
     // this returns the query as a promise
     return connection.promise().query("SELECT * FROM employee");
};

function getName (connection) {
    // this returns names and id as a promise
    return connection.promise().query("SELECT id,first_name,last_name FROM employee");
};

function addEmp (connection, newEmpName) {
    return connection.promise().query("INSERT INTO employee (role_id, manager_id, first_name, last_name) VALUES ?", [newEmpName]);
};

function upEmp (connection, empID) {
    return connection.promise().query("UPDATE");
}

function delEmp (connection, delEmpID) {
    return connection.promise().query("DELETE FROM employee WHERE id=?", delEmpID);
}

module.exports = {getAll, getName, addEmp, upEmp, delEmp};