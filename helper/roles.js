const mysql = require("mysql2");

function getAll (connection) {
     // this returns the query as a promise
     return connection.promise().query("SELECT * FROM role");
};

function getTitle (connection) {
    // this returns just the titles as a promise
    return connection.promise().query("SELECT id,title FROM role");
};

function getJoin (connection) {
    // this returns a joined table with the department table
    return connection.promise().query("SELECT role.id AS ID, role.title AS Title, department.name AS Department, role.salary AS Salary FROM role JOIN department ON role.department_id = department.id")
}

function addRole (connection, newRole) {
    return connection.promise().query("INSERT INTO role (salary, department_id, title) VALUES ?", [newRole]);
};

function upRole (connection, roleName) {
    return connection.promise().query("UPDATE");
}

function delRole (connection, delRoleName) {
    return connection.promise().query("DELETE FROM role WHERE title = ?", delRoleName);
}

module.exports = {getAll, getTitle, getJoin, addRole, upRole, delRole};