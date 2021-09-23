const mysql = require("mysql2");

function getAll (connection) {
     // this returns the query as a promise
     return connection.promise().query("SELECT * FROM role");
};

function getTitle (connection) {
    // this returns just the titles as a promise
    return connection.promise().query("SELECT title FROM role");
};

function addRole (connection, newRole) {
    return connection.promise().query("INSERT INTO role (salary, department_id, title) VALUES (?, ?, ?)", newRole);
};

function upRole (connection, roleName) {
    return connection.promise().query("UPDATE");
}

function delRole (connection, delRoleName) {
    return connection.promise().query("DELETE FROM role WHERE title = ?", delRoleName);
}

module.exports = {getAll, getTitle, addRole, upRole, delRole};