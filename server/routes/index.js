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
    { id: 4, name: 'DRAMA', teacher: 'Samantha Hopper', color: 'dark-teal' },
    { id: 5, name: 'AVID', teacher: 'Samantha Hopper', color: 'dark-teal' }
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

// router.get('/studentSummary', (req, res) => {
//   res.send([
//     { year: 2016, q1: 3, q2: 4, q3: 0, q4: 2 },
//     { year: 2017, q1: 3, q2: 4, q3: 0, q4: 2 }
//   ]);
// });

router.get('/studentSummary', async (req, res) => {
  try {
    // {"id":1,"question":1,"response":2,"yr":2016}
    const query = await db.query('SELECT * FROM responses');

    const data = [];
    const years = [];
    const { rows } = query.rows;

    rows.forEach(row => {
      if (!years.includes(row.yr)) {
        years.push(row.yr);
      }
    });

    console.log(years);

    years.forEach(yr => {
      const rowsYear = [];
      rows.forEach(row => {
        if (row.yr === yr) {
          rowsYear.push(row);
        }
      });

      const q = [[0], [0], [0], [0]];

      rowsYear.forEach(row => {
        const i = row.question - 1;
        q[i].push(row.response);
      });

      const averagedQ = [
        q[0].reduce((a, b) => a + b, 0) / q[0].length,
        q[1].reduce((a, b) => a + b, 0) / q[0].length,
        q[2].reduce((a, b) => a + b, 0) / q[0].length,
        q[3].reduce((a, b) => a + b, 0) / q[0].length
      ];

      data.push({
        year: yr,
        q1: averagedQ[0],
        q2: averagedQ[1],
        q3: averagedQ[2],
        q4: averagedQ[3]
      });
    });

    res.send(data);
  } catch (error) {
    console.log(error.stack);
  }
});

module.exports = router;
