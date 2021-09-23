// bring in express, mysql2, dotenv, and console.table
//const express = require("express");
const mysql = require("mysql2");
require('dotenv').config();
const cTable = require("console.table");
const inquirer = require("inquirer");

// import the helper functions
const department = require("./helper/departments");
const role = require("./helper/roles");
const employee = require("./helper/employees");

/*
PORT and express skeleton left in place for future development
const PORT = process.env.PORT || 3001;
const app = express();
*/

// use mysql2 to connect to the database, using the .env file to provide values
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  // message on successful connection
  console.log(`Connected to the ${process.env.DB_NAME} database
  Welcome to the Eriadu Manufacturing & Design Employee Database.
  EMD is a part of Kuat Space Engineering`)
);

// test query of the database on a table, and output the result using the console.table package
/*db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
    console.table("Employee Roster", result);
});*/

// test query using prepared statement to verify data from the database
/*db.promise().query("SELECT * FROM employee")
    .then( ([result, fields]) => {
        // when using promises, mysql2 will return extra metadata that has to be separated
        // this is done by using [] to separate the rows from the metadata
        // console.log(result);
        console.table("Employee Roster", result);
    }); */

// Main Menu of Options
const mainMenuOptions = [
    {
        name: "mainChoice",
        message: "Please choose what you wish to do:",
        type: "list",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee", "Delete a Department", "Delete a Role", "Quit"]
    }
];

// init function that will start off the entire app
function init() {
    console.log("MAIN MENU");
    // inquirer prompt for the main menu
    inquirer.prompt(mainMenuOptions)
    .then( (answer) => {
        // calls the next function depending on the option chosen
        switch (answer.mainChoice) {
            case "View All Departments":
                /* call the query to view all departments
                 this will get a promisified query response back from the helper file (departments.js)
                 .then console.table the rows that were returned
                 .then call the init() function again to bring up the main menu   
                 putting the console.table and loop with init() have to be done here instead of in the helper file so that the console.log from the helper file doesn't overlap with the inquirer prompt
                 While this works, it may be memory-intensive and lead to a memory leak */
                department.getAll(db).then( ([rows, fields]) => {
                    console.log("\n");
                    console.table(rows);
                }).then( () => {init();} );
                break;
            case "View All Roles":
                // call the query to view all roles
                role.getAll(db).then( ([rows, fields]) => {
                    console.log("\n");
                    console.table(rows);
                }).then( () => {init();} );
                break;
            case "View All Employees":
                // call the query to view all employees
                employee.getAll(db).then( ([rows, fields]) => {
                    console.log("\n");
                    console.table(rows);
                }).then( () => {init();} );
                break;
            case "Add a Department":
                // call the query to add a Department
                addItem("department");
                break;
            case "Add a Role":
                // call the query to add a role
                addItem("role");
                break;
            case "Add an Employee":
                // call the query to add an employee
                addItem("employee");
                break;
            case "Update an Employee":
                // call the query to update an employee
                break;
            case "Delete a Department":
                // call a function to delete a department
                delItem("department");
                break;
            case "Delete a Role":
                // call a function to delete a role
                delItem("role");
                break;
            case "Quit":
                // quit out of the app
                console.log("Goodbye!");
                process.exit();
            default:
                console.log("An error has occurred; no recognized Main Menu option was chosen")
        };
    });//.then( () => init());
};

// This function will take in a parameter and use it to create a SQL query to get all entries from a table
function getFull(tableEl){
    let sqlQuery = `SELECT * from ${tableEl}`;
    db.promise().query(sqlQuery)
                .then( ([result, fields]) => {
                    console.table(`${tableEl} Listing`, result);
                }).then( () => init());
}

// This function will be for adding a department
function addItem (addItem){
    // questions will start with asking for the name of the new department/role/employee
    const question = [
        {
            name: "newName",
            message: `Please enter the name of the new ${addItem}:`,
            type: "input"
        },
    ];
    
    // newName is used to store the name of the new department/role/employee so that it can be used throughout this function
    let newName = "";
    /* the inquirer gets the name of the new thing from the user
       .then sends the newName and the db connection to the query in the helper file
       .then gets a returned promisified sql query that's already run, logs that the database was updated, then runs init() again*/ 
    inquirer.prompt(question)
        .then ( (answer) => {
            newName = answer.newName;
            switch (addItem) {
                case "department":
                    department.addDept(db, answer.newName)
                    .then ( () => {
                        console.log(`The database has been updated with a new ${addItem}, ${newName}`);
                        init();
                    });
                    break;
                case "role":
                    department.getAll(db).then( ([rows, fields]) => {
                        // the departments are all brought back so that it can be used to choose a department to associate with the role
                        const questions = [{
                            name: "salary",
                            message: "Please enter the salary (numbers only, no symbols or separators): ",
                            type: "number"
                        },
                        {
                            name: "department_id",
                            message: "Please select the department that this role is associated with: ",
                            type: "list",
                            choices: rows
                        }];
                        
                        inquirer.prompt(questions)
                        .then( (answers) => {
                            answers.title = newName;
                            const deptID = rows.find( element => element.name == answers.department_id);
                            answers.department_id = deptID.id;
                            let tester = Object.values(answers);
                            role.addRole(db, tester)
                            .then ( () => {
                                console.log(`The database has been updated with a new ${addItem}, ${newName}`);
                                init();
                            });
                        });
                    });
                    break;
                case "employee":
                    console.log("This is where the employee would have been added");
                    break;
                default:
                    console.log("An error has occurred within the switch statement of function addItem");
            };
        });
}

// this function updates an employee or role

// this function will be for deletion
function delItem (delItem) {
    switch (delItem) {
        case "department":
            department.getAll(db).then( ([rows, fields]) => {
                const questions = [
                {
                    name: "delDeptID",
                    message: `Please choose the department to delete:`,
                    type: "list",
                    choices: rows
                }];
            inquirer.prompt(questions)
                .then ( (answer) => {
                    department.delDept(db, answer.delDeptID);
                })
                .then ( () => {
                    init();
                });
            });
        break;
        case "role":
            role.getTitle(db).then( ([rows, fields]) => {
                // roleList must be created using the map() function on rows, as inquirer.js expects an array, or an array of objects where one key is named "name"
                // since the role table's column is "title" and not "name", we need to pull out the titles by themselves from rows and put them into a new array
                const roleList = rows.map( (element) => {
                    return element.title;
                });

                const questions = [
                {
                    name: "delRoleName",
                    message: `Please choose the role to delete:`,
                    type: "list",
                    choices: roleList
                }];
            inquirer.prompt(questions)
                .then ( (answer) => {
                    role.delRole(db, answer.delRoleName);
                })
                .then ( () => {
                    init();
                });
            });
        break;
        default:
            console.log("Something other than department was to be deleted");
    };
}
// starts the app
init();