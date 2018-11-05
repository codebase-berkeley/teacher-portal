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

CREATE TABLE questions
(
  id SERIAL PRIMARY KEY,
  content VARCHAR
);

CREATE TABLE responses
(
  id SERIAL PRIMARY KEY,
  question SERIAL REFERENCES questions(id),
  response FLOAT,
  yr INTEGER
);

INSERT INTO users
  (email, first_name, last_name, is_teacher)
VALUES
  ('bchee@berkeley.edu', 'Bradley', 'Chee', TRUE);

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
  (id, content)
VALUES
  (1, 'How interesting was this unit?');

INSERT INTO questions
  (id, content)
VALUES
  (2, 'Would you recommend to a friend?');

INSERT INTO questions
  (id, content)
VALUES
  (3, 'Did you learn anything?');

INSERT INTO questions
  (id, content)
VALUES
  (4, 'What is the purpose of life?');

INSERT INTO responses
  (question, response, yr)
VALUES
  (1, 2, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (1, 4, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (1, 5, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (2, 2.5, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (2, 3.5, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (2, 4.5, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (3, 2.5, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (3, 3.5, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (3, 4.5, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (4, 5.0, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (4, 2.5, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (4, 3.5, 2016);
INSERT INTO responses
  (question, response, yr)
VALUES
  (1, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (1, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (1, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (2, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (2, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (2, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (3, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (3, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (3, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (2, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (2, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (3, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (3, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (3, 4.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (4, 2.0, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (4, 1.5, 2017);
INSERT INTO responses
  (question, response, yr)
VALUES
  (4, 3.5, 2017);



GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;

