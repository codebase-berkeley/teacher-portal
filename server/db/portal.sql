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
  is_teacher BOOLEAN
);

CREATE TABLE units
(
  id SERIAL PRIMARY KEY
);

INSERT INTO users
  (email, first_name, last_name, is_teacher)
VALUES
  ('parth.shah@berkeley.edu', 'Parth', 'Shah', TRUE);

CREATE TABLE questions
(
  id SERIAL PRIMARY KEY,
  text VARCHAR
);

CREATE TABLE responses
(
  id SERIAL PRIMARY KEY,
  question SERIAL REFERENCES questions(id),
  unit SERIAL REFERENCES units(id),
  response FLOAT,
  yr INTEGER
);

CREATE TABLE units
(
  id SERIAL PRIMARY KEY
);

CREATE TABLE lessons
(
  id SERIAL PRIMARY KEY,
  lesson_name VARCHAR,
  pdf VARCHAR,
  reflectionText TEXT,
  unit_id SERIAL REFERENCES units (id)
);

INSERT INTO units
  (id)
VALUES
  (1);


INSERT INTO lessons
  (lesson_name, pdf, reflectionText, unit_id)
VALUES
  ('Volumes of Rotating Solids', 'lesson.pdf', 'blah', 1);

INSERT INTO lessons
  (lesson_name, pdf, reflectionText, unit_id)
VALUES
  ('Related Rates', 'lesson.pdf', 'blah', 1);

INSERT INTO lessons
  (lesson_name, pdf, reflectionText, unit_id)
VALUES
  ('Linear Algebra', 'lesson.pdf', 'blah', 1);

INSERT INTO lessons
  (lesson_name, pdf, reflectionText, unit_id)
VALUES
  ('Integrals', 'lesson.pdf', 'blah', 1);

INSERT INTO lessons
  (lesson_name, pdf, reflectionText, unit_id)
VALUES
  ('Differential Equations', 'lesson.pdf', 'blah', 1);

INSERT INTO users
  (email, first_name, last_name, is_teacher)
VALUES
  ('parth.shah@berkeley.edu', 'Parth', 'Shah', TRUE);

INSERT INTO users
  (email, first_name, last_name, is_teacher)
VALUES
  ('young.guo@gmail.com', 'Young', 'Guo', FALSE);

-- dummy data for responses 

INSERT INTO questions
  (id, text)
VALUES
  (1, 'How interesting was this unit?');

INSERT INTO questions
  (id, text)
VALUES
  (2, 'Would you recommend to a friend?');

INSERT INTO questions
  (id, text)
VALUES
  (3, 'Did you learn anything?');

INSERT INTO questions
  (id, text)
VALUES
  (4, 'What is the purpose of life?');

INSERT INTO units
  (id)
VALUES
  (1);

INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (1, 1, 2, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (1, 1, 4, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (1, 1, 5, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (2, 1, 2.5, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (2, 1, 3.5, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (2, 1, 4.5, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (3, 1, 2.5, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (3, 1, 3.5, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (3, 1, 4.5, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (4, 1, 5.0, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (4, 1, 2.5, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (4, 1, 3.5, 2016);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (1, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (1, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (1, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (2, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (2, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (3, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (2, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (2, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (3, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (3, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (3, 1, 4.5, 2017);
INSERT INTO responses
  (question, unit,response, yr)
VALUES
  (4, 1, 2.0, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (4, 1, 1.5, 2017);
INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (4, 1, 3.5, 2017);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  teacherID SERIAL REFERENCES users(id),
  class_name VARCHAR
);

INSERT INTO classes(teacherID, class_name)
  VALUES (1, 'English 102');

INSERT INTO classes(teacherID, class_name)
  VALUES (2, 'English 202');

INSERT INTO classes(teacherID, class_name)
  VALUES (1, 'English 302');

CREATE TABLE units (
  id SERIAL PRIMARY KEY,
  classid SERIAL REFERENCES classes(id),
  unit_name VARCHAR
);

INSERT INTO units(classid, unit_name)
  VALUES(1, 'House on Mango Street');

INSERT INTO units(classid, unit_name)
  VALUES(2, 'Macbeth');

INSERT INTO units(classid, unit_name)
  VALUES(1, 'Jane Eyre');

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;