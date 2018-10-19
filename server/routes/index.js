const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Teacher Portal API!');
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
  res.send({ pdf: '/lesson.pdf', notes: 'blah, blah' });
});

module.exports = router;
