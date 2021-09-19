INSERT INTO department (id, name)
VALUES (01, "Sapient Resources"),
       (02, "Marketing"),
       (03, "Public Relations"),
       (04, "Research & Development"),
       (05, "Information Technology"),
       (06, "Accounts Payable"),
       (07, "Accounts Receivable"),
       (08, "Corporate Management"),
       (09, "Manufacturing");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "President", 0, 08),
       (002, "Senior Researcher", 200000, 04),
       (003, "Senior Engineer", 200000, 04),
       (004, "Junior Researcher", 70000, 04),
       (005, "Junior Engineer", 70000, 04),
       (006, "Researcher", 120000, 04),
       (007, "Engineer", 120000, 04),
       (008, "Chief Executive Officer", 250000, 08);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (0001, "Arthrus", "Cezaran", 001, null),
       (0002, "Vera", "Cezaran", 008, 0001),
       (0003, "Ariel", "Ulysirs", 003, 0001),
       (0004, "Jenna", "Arbor", 002, 0001),
       (0005, "Galen", "Erso", 006, 0004),
       (0006, "Jin", "Erso", 004, 0004);

