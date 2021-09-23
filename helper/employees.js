const mysql = require("mysql2");

function getAll (connection) {
     // this returns the query as a promise
     return connection.promise().query("SELECT * FROM employee");
};

function getName (connection) {
    // this returns names and id as a promise
    return connection.promise().query("SELECT id,first_name,last_name FROM employee");
};

function getJoin (connection) {
    // this returns a joined table with the department table
    // how to SELECT a self-referencing foreign key: https://www.mysqltutorial.org/mysql-self-join/
    // how to JOIN 3 tables: https://www.mysqltutorial.org/mysql-inner-join.aspx
    return connection.promise().query("SELECT employee.id AS ID, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS Department, role.salary AS Salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM department JOIN role ON role.department_id = department.id JOIN employee ON role.id = employee.role_id JOIN employee m ON m.id = employee.manager_id")
}

function addEmp (connection, newEmpName) {
    return connection.promise().query("INSERT INTO employee (role_id, manager_id, first_name, last_name) VALUES ?", [newEmpName]);
};

function upEmp (connection, empID) {
    // this returns an UPDATE query, taking in empID which is an array with 2 values, the employee ID and the new role
    return connection.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", empID);
}

function getEmpRole (connection, empID) {
    // this returns just the role_id of the employee
    return connection.promise().query("SELECT role_id FROM employee WHERE employee.id = ?", empID);
}

function delEmp (connection, delEmpID) {
    return connection.promise().query("DELETE FROM employee WHERE id=?", delEmpID);
}

module.exports = {getAll, getName, getJoin, addEmp, upEmp, getEmpRole, delEmp};