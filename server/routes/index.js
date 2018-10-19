const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Teacher Portal API!');
});

router.get('/', function(req, res, next) {
  res.send({ key: 4 });
});

router.get('/classes', function(req, res, next) {
  res.send([
    { id: 1, name: 'ENGLISH 101', teacher: 'Party Shah' },
    { id: 2, name: 'English 201', teacher: 'Bboy Chee' },
    { id: 3, name: 'English 301', teacher: 'Trev4ev' }
  ]);
});

router.get('/units/1', function(req, res, next) {
  res.send([
    { id: 1, name: 'HOUSE on Mango Street' },
    { id: 2, name: 'Macbeth' },
    { id: 3, name: 'Harry Potter' },
    { id: 4, name: 'Jane Eyre' },
    { id: 5, name: '1984' }
  ]);
});

router.get('/units/2', function(req, res, next) {
  res.send([
    { id: 6, name: 'Romeo and Juliet' },
    { id: 7, name: 'Brave New World' },
    { id: 8, name: 'Fahrenheit 451' },
    { id: 9, name: 'Hamlet' }
  ]);
});

router.get('/units/3', function(req, res, next) {
  res.send([
    { id: 10, name: 'Lord of the Flies' },
    { id: 11, name: 'The Stranger' },
    { id: 12, name: 'Metamorphosis' },
    { id: 13, name: 'Animal Farm' },
    { id: 14, name: 'Frankenstein' }
  ]);
});

router.get('/units/:classID', function(req, res, next) {
  res.send(req.params.classID);
});

module.exports = router;
