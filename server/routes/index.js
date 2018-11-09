const Router = require('express-promise-router');

const db = require('../db/index');

const router = new Router();

router.get('/users', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM users');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.get('/classes', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT * FROM classes JOIN users on classes.teacherID = users.id'
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.get('/units/:classID', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM units WHERE classid = $1', [
      req.params.classID
    ]);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
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
