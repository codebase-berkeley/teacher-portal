DROP DATABASE IF EXISTS portal;

CREATE DATABASE portal;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';

\c portal;
CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  email VARCHAR(254),
  first_name VARCHAR,
  last_name VARCHAR,
  is_teacher BOOLEAN,
  token VARCHAR,
  google_id VARCHAR
);

CREATE TABLE classes
(
  id SERIAL PRIMARY KEY,
  teacherID SERIAL REFERENCES users(id),
  class_name VARCHAR
);

CREATE TABLE students_classes
(
  studentID SERIAL REFERENCES users (id),
  classID SERIAL REFERENCES classes (id) ON DELETE CASCADE,
  yearName VARCHAR,
  PRIMARY KEY (studentID, classID)
);

CREATE TABLE units
(
  id SERIAL PRIMARY KEY,
  classid SERIAL REFERENCES classes(id) ON DELETE CASCADE,
  unit_name VARCHAR
);

CREATE TABLE lessons
(
  id SERIAL PRIMARY KEY,
  lesson_name VARCHAR,
  reflection_text TEXT,
  unit_id SERIAL REFERENCES units(id) ON DELETE CASCADE,
  filepath VARCHAR
);

CREATE TABLE questions
(
  id SERIAL PRIMARY KEY,
  unit_id SERIAL REFERENCES units(id) ON DELETE CASCADE,
  input VARCHAR
);

CREATE TABLE responses
(
  id SERIAL PRIMARY KEY,
  question SERIAL REFERENCES questions(id) ON DELETE CASCADE,
  unit SERIAL REFERENCES units(id) ON DELETE CASCADE,
  response FLOAT,
  yr VARCHAR
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;
