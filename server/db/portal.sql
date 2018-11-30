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

CREATE TABLE students_classes
(
  studentID SERIAL REFERENCES users (id),
  classID SERIAL REFERENCES classes (id),
  PRIMARY KEY (studentID, classID)
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
  reflection_text TEXT,
  unit_id SERIAL REFERENCES units(id),
  filepath VARCHAR
);

CREATE TABLE questions
(
  id SERIAL PRIMARY KEY,
  unit_id SERIAL REFERENCES units(id),
  yr INTEGER,
  input VARCHAR
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
  (lesson_name, reflection_text, unit_id, filepath)
VALUES
  ('Volumes of Rotating Solids', 'one', 1, './static/lesson.pdf'),
  ('Related Rates', 'two', 1, './static/pdf-sample.pdf'),
  ('Linear Algebra', 'three', 1, './static/yeeeeee.pdf'),
  ('Integrals', 'four', 1, './static/yoighht.pdf'),
  ('Differential Equations', 'five', 1, './static/lesson.pdf');

-- dummy data for questions 

INSERT INTO questions
  (id, unit_id, yr, input)
VALUES
  (9, 3, 2018, 'How interesting was this unit?'),
  (10, 2, 2018, 'Would you recommend to a friend?'),
  (11, 2, 2018, 'Did you learn anything?'),
  (12, 3, 2018, 'What is the purpose of life?'),
  (13, 1, 2018, 'Why is Parth such a fucking snake?'),
  (14, 2, 2018, 'lol');

-- -- dummy data for responses

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