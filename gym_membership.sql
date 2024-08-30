CREATE DATABASE gym_membership;
USE gym_membership ;

/*
The data in the owner table is pre set because , as it makes sense , because giving to user to register as a owner on the website , kind of looks 
weird and is not seen on any real world website
*/
CREATE TABLE owner (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL
);

INSERT INTO owner
(username,password)
VALUES 
("Namit","Namit"),
("Jaskaran","Jaskaran"),
("Stefan","Stefan");

SELECT * 
FROM owner;
/*
Member Table 
Assumption -> USER NAME HAS BEEN ASSUMED TO BE THE PRIMARY KEY 
SO IN A TABLE ONLY ONE PERSON CAN EXIST WITH THE ONE USER NAME 
*/
CREATE TABLE members (
    username VARCHAR(50) PRIMARY KEY ,
    password VARCHAR(50) NOT NULL,
    membership_plan VARCHAR(20),
    locker VARCHAR(20),
    payment_option VARCHAR(20),
    session VARCHAR(20),
    attendance Boolean
);

SELECT * 
FROM members;

DROP table members;

/*
Employee Table 
Assumption -> USER NAME HAS BEEN ASSUMED TO BE THE PRIMARY KEY 
SO IN A TABLE ONLY ONE PERSON CAN EXIST WITH THE ONE USER NAME 
*/
CREATE TABLE employees (
    username VARCHAR(50) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    session VARCHAR(20)	
);

/* A dummy value to test , other wise only the owner is authorized to set the values in the website*/
INSERT INTO employees
(username,password)
VALUES 
("Namit","Namit");

SELECT *
FROM employees ;

CREATE TABLE session_plans (
    plan_name VARCHAR(20) PRIMARY KEY
);

INSERT INTO session_plans (plan_name)
VALUES 
("basic"),
("standard"),
("premium"),
("gold"),
("platinum"),
("ultimate");

CREATE TABLE equipment_maintenance (
    equipment VARCHAR(20),
    equipment_id INT PRIMARY KEY
);
 
SELECT * 
FROM equipment_maintenance;

DROP DATABASE gym_membership;