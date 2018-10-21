const express = require('express');

const router = express.Router();

router.get('/classes', (req, res) => {
  res.send([
    { id: 1, name: 'ENGLISH 101', teacher: 'Samantha Hopper', color: 'yellow' },
    { id: 2, name: 'ENGLISH 201', teacher: 'Samantha Hopper', color: 'aqua' },
    {
      id: 3,
      name: 'ENGLISH 301',
      teacher: 'Samantha Hopper',
      color: 'dark-teal'
    },
    {
      id: 4,
      name: 'ENGLISH 401',
      teacher: 'Samantha Hopper',
      color: 'dark-teal'
    },
    { id: 5, name: 'DRAMA', teacher: 'Samantha Hopper', color: 'dark-teal' },
    { id: 6, name: 'AVID', teacher: 'Samantha Hopper', color: 'dark-teal' }
  ]);
});

router.get('/units/:classID', (req, res) => {
  res.send([
    { id: 1, name: 'House on Mango Street' },
    { id: 2, name: 'Macbeth' },
    { id: 3, name: 'Harry Potter' },
    { id: 4, name: 'Jane Eyre' },
    { id: 5, name: '1984' }
  ]);
});

router.get('/lessons/:unitID', (req, res) => {
  res.send([
    { id: 1, name: 'Volumes of Rotating Solids', color: 'aqua' },
    { id: 2, name: 'Related Rates', color: 'aqua' },
    { id: 3, name: 'Trigonometry', color: 'aqua' },
    { id: 4, name: 'Integrals', color: 'aqua' },
    { id: 5, name: 'Differential Equations', color: 'aqua' }
  ]);
});

router.get('/teacherNotes/:lessonID', (req, res) => {
  res.send({
    pdf: '/lesson.pdf',
    notes:
      'In differential calculus, related rates problems involve finding a rate at which a quantity changes by relating that quantity to other quantities whose rates of change are known. The rate of change is usually with respect to time.'
  });
});

router.get('/studentSummary', (req, res) => {
  res.send([
    { year: 2016, q1: 3, q2: 4, q3: 0, q4: 2 },
    { year: 2017, q1: 3, q2: 4, q3: 0, q4: 2 }
  ]);
});

module.exports = router;
