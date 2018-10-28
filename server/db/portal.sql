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

INSERT INTO users (email, first_name, last_name, is_teacher)
  VALUES ('bchee@berkeley.edu', 'Bradley', 'Chee', TRUE);

INSERT INTO users (email, first_name, last_name, is_teacher)
  VALUES ('parth.shah@berkeley.edu', 'Parth', 'Shah', TRUE);

INSERT INTO users (email, first_name, last_name, is_teacher)
  VALUES ('young.guo@gmail.com', 'Young', 'Guo', FALSE);

CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  lesson_name VARCHAR,
  pdf VARCHAR,
  reflectionText VARCHAR,
  FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE
);

INSERT INTO lessons (lesson_name, pdf, reflectionText)
  VALUES ('Volumes of Rotating Solids', 'lesson.pdf', 'blah');

INSERT INTO lessons (lesson_name, pdf, reflectionText)
  VALUES ('Related Rates', 'lesson.pdf', 'blah');

INSERT INTO lessons (lesson_name, pdf, reflectionText)
VALUES ('Trigonometry', 'lesson.pdf', 'blah');

INSERT INTO lessons (lesson_name, pdf, reflectionText)
VALUES ('Integrals', 'lesson.pdf', 'blah');

INSERT INTO lessons (lesson_name, pdf, reflectionText)
VALUES ('Differential Equations', 'lesson.pdf', 'blah');


GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;

