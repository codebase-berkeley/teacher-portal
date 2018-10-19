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

router.get('/units/:classID', (req, res) => {
  res.send([
    { id: 1, name: 'HOUSE on Mango Street' },
    { id: 2, name: 'Macbeth' },
    { id: 3, name: 'Harry Potter' },
    { id: 4, name: 'Jane Eyre' },
    { id: 5, name: '1984' }
  ]);
});

router.get('/lessons/:unitID', (req, res) => {
  res.send([
    { id: 1, name: 'One Weird Ass Class Name Here', color: 'aqua' },
    { id: 2, name: 'Another Weird Ass Class Name Here', color: 'aqua' },
    { id: 3, name: 'One Last Weird Ass Class Name Here', color: 'aqua' },
    { id: 4, name: 'JUST KIDDING ANUTHA ONE YEET', color: 'aqua' },
    {
      id: 5,
      name: 'ANUTHA ONE ANUTHA ONE ANUTHA ONE ANUTHA ONE',
      color: 'aqua'
    }
  ]);
});

router.get('/teacherNotes/:lessonID', (req, res) => {
  res.send([
    { pdf: '/lesson1.pdf', notes: 'blah, blah' },
    { pdf: '/lesson2.pdf', notes: 'blah, blah' },
    { pdf: '/lesson3.pdf', notes: 'blah, blah' },
    { pdf: '/lesson4.pdf', notes: 'blah, blah' },
    { pdf: '/lesson5.pdf', notes: 'blah, blah' }
  ]);
});

module.exports = router;
