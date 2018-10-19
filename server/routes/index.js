const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Teacher Portal API!');
});

router.get('/', (req, res) => {
  res.send({ key: 4 });
});

router.get('/classes', (req, res) => {
  res.send([
    { id: 1, name: 'ENGLISH 101', teacher: 'Party Shah', color: 'yellow' },
    { id: 2, name: 'English 201', teacher: 'Bboy Chee', color: 'aqua' },
    { id: 3, name: 'English 301', teacher: 'Trev4ev', color: 'dark-teal' }
  ]);
});

router.get('/units/1', (req, res) => {
  res.send([
    { id: 1, name: 'HOUSE on Mango Street' },
    { id: 2, name: 'Macbeth' },
    { id: 3, name: 'Harry Potter' },
    { id: 4, name: 'Jane Eyre' },
    { id: 5, name: '1984' }
  ]);
});

router.get('/units/2', (req, res) => {
  res.send([
    { id: 6, name: 'Romeo and Juliet' },
    { id: 7, name: 'Brave New World' },
    { id: 8, name: 'Fahrenheit 451' },
    { id: 9, name: 'Hamlet' }
  ]);
});

router.get('/units/3', (req, res) => {
  res.send([
    { id: 10, name: 'Lord of the Flies' },
    { id: 11, name: 'The Stranger' },
    { id: 12, name: 'Metamorphosis' },
    { id: 13, name: 'Animal Farm' },
    { id: 14, name: 'Frankenstein' }
  ]);
});

router.get('/units/:classID', (req, res) => {
  res.send(req.params.classID);
});

module.exports = router;
