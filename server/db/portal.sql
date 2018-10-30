DROP DATABASE IF EXISTS portal;

CREATE DATABASE portal;

CREATE USER root WITH ENCRYPTED PASSWORD 'password';

\c portal;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(254),
  first_name VARCHAR,
  last_name VARCHAR,
  is_teacher BOOLEAN
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  user VARCHAR, --REFERENCES users(id),
  class_name VARCHAR
);

INSERT INTO classes(user, class_name)
  VALUES (1, 'English 102');

INSERT INTO classes(user, class_name)
  VALUES (2, 'English 202');

INSERT INTO classes(user, class_name)
  VALUES (1, 'Math 302');

CREATE TABLE units (
  id SERIAL PRIMARY KEY,
  classid INTEGER,
  unit_name VARCHAR

);

INSERT INTO units(classid, unit_name)
  VALUES(1, 'House on Mango Street');

INSERT INTO units(classid, unit_name)
  VALUES(2, 'Macbeth');

INSERT INTO units(classid, unit_name)
  VALUES(1, 'Jane Eyre' );

INSERT INTO users (email, first_name, last_name, is_teacher)
  VALUES ('bchee@berkeley.edu', 'Bradley', 'Chee', TRUE);

INSERT INTO users (email, first_name, last_name, is_teacher)
  VALUES ('parth.shah@berkeley.edu', 'Parth', 'Shah', TRUE);

INSERT INTO users (email, first_name, last_name, is_teacher)
  VALUES ('young.guo@gmail.com', 'Young', 'Guo', FALSE);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;

