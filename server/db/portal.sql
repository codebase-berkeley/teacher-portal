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

CREATE TABLE classes
(
  id SERIAL PRIMARY KEY,
  teacherID SERIAL REFERENCES users(id),
  class_name VARCHAR
);

CREATE TABLE units
(
  id SERIAL PRIMARY KEY,
  classid SERIAL REFERENCES classes(id),
  unit_name VARCHAR
);

CREATE TABLE lessons
(
  id SERIAL PRIMARY KEY,
  lesson_name VARCHAR,
  pdf VARCHAR,
  reflectionText TEXT,
  unit_id SERIAL REFERENCES units (id)
);

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

-- dummy data for users

INSERT INTO users
  (email, first_name, last_name, is_teacher)
VALUES
  ('parth.shah@berkeley.edu', 'Parth', 'Shah', TRUE),
  ('young.guo@gmail.com', 'Young', 'Guo', FALSE
);

-- dummy data for classes

INSERT INTO classes
  (teacherID, class_name)
VALUES
  (1, 'English 102'),
  (2, 'English 202'),
  (1, 'English 302');

-- dummy data for units

INSERT INTO units
  (classid, unit_name)
VALUES
  (1, 'House on Mango Street'),
  (2, 'Macbeth'),
  (1, 'Jane Eyre');

-- dummy data for lessons 

INSERT INTO lessons
  (lesson_name, pdf, reflectionText, unit_id)
VALUES
  ('Volumes of Rotating Solids', 'lesson.pdf', 'blah', 1),
  ('Related Rates', 'lesson.pdf', 'blah', 1),
  ('Linear Algebra', 'lesson.pdf', 'blah', 1),
  ('Integrals', 'lesson.pdf', 'blah', 1),
  ('Differential Equations', 'lesson.pdf', 'blah', 1);

-- dummy data for questions 

INSERT INTO questions
  (id, text)
VALUES
  (1, 'How interesting was this unit?'),
  (2, 'Would you recommend to a friend?'),
  (3, 'Did you learn anything?'),
  (4, 'What is the purpose of life?');

-- dummy data for responses

INSERT INTO responses
  (question, unit, response, yr)
VALUES
  (1, 1, 2, 2016),
  (1, 1, 4, 2016),
  (1, 1, 5, 2016),
  (2, 1, 2.5, 2016),
  (2, 1, 3.5, 2016),
  (2, 1, 4.5, 2016),
  (3, 1, 2.5, 2016),
  (3, 1, 3.5, 2016),
  (3, 1, 4.5, 2016),
  (4, 1, 5.0, 2016),
  (4, 1, 2.5, 2016),
  (4, 1, 3.5, 2016),
  (1, 1, 4.5, 2017),
  (1, 1, 4.5, 2017),
  (1, 1, 4.5, 2017),
  (2, 1, 4.5, 2017),
  (2, 1, 4.5, 2017),
  (3, 1, 4.5, 2017),
  (2, 1, 4.5, 2017),
  (2, 1, 4.5, 2017),
  (3, 1, 4.5, 2017),
  (3, 1, 4.5, 2017),
  (3, 1, 4.5, 2017),
  (4, 1, 2.0, 2017),
  (4, 1, 1.5, 2017),
  (4, 1, 3.5, 2017);


GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;