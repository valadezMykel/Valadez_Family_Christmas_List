DROP DATABASE IF EXISTS christmasList_DB;
CREATE DATABASE christmasList_DB;

USE christmasList_DB;

CREATE TABLE people(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE presents(
    id INT NOT NULL AUTO_INCREMENT,
    present VARCHAR(50) NOT NULL,
    peopleID INT,
    PRIMARY KEY (id),
    FOREIGN KEY (peopleID) REFERENCES people(id)
);
