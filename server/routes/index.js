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

router.get('/students', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM students');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.get('/classes', async (req, res) => {
  try {
    const query = await db.query(
      'SELECT * FROM classes JOIN users on classes.teacherID = users.id;'
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.post('/classes', async (req, res) => {
  try {
    const { teacherID, class_name, emails } = req.body;
    const query = await db.query(
      'INSERT INTO classes (teacherID, class_name) VALUES ($1, $2) returning id;',
      [teacherID, class_name]
    );

    // const query = await db.query(
    //   'SELECT id FROM classes where classes.class_name=$1;',
    //   [class_name]
    // );
    console.log(emails);
    for (let i = 0; i < emails.length; i += 1) {
      console.log('GETTING HERE', emails[i]);
      db.query('INSERT INTO students (email, class_id) VALUES ($1, $2);', [
        emails[i],
        query.rows[0].id
      ]);
    }
    console.log('GETTING HERE????');
    res.send(class_name);
  } catch (error) {
    console.log(error.stack);
  }
});

// router.post('/students', async (req, res) => {
//   try {
//     const { email, class_name } = req.body;
//     const query = await db.query(
//       'SELECT id FROM classes where classes.class_name=$1;',
//       [class_name]
//     );
//     console.log(query);
//     await db.query('INSERT INTO students (email, class_id) VALUES ($1, $2);', [
//       email,
//       query.rows[0].class_name
//     ]);
//     res.send(class_name);
//   } catch (error) {
//     console.log(error.stack);
//   }
// });

router.get('/units/:classID', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM units WHERE classid = $1;', [
      req.params.classID
    ]);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.get('/lessons/:unitID', async (req, res) => {
  try {
    const { unitID } = req.params;
    console.log(unitID);
    const query = await db.query('SELECT * FROM lessons WHERE unit_id = $1;', [
      unitID
    ]);
    console.log(query);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.get('/teacherNotes/:lessonID', (req, res) => {
  res.send({
    pdf: '/lesson.pdf',
    notes:
      'In differential calculus, related rates problems involve finding a rate at which a quantity changes by relating that quantity to other quantities whose rates of change are known. The rate of change is usually with respect to time.'
  });
});

router.get('/studentSummary/:unitID', async (req, res) => {
  try {
    const { unitID } = req.params;
    const mainquery = await db.query(
      `SELECT * FROM responses WHERE unit=${unitID};`
    );
    const data = [];
    const { rows } = mainquery;

    const yearsquery = await db.query(
      `SELECT DISTINCT yr FROM responses WHERE unit=${unitID};`
    );
    const years = yearsquery.rows.map(e => e.yr);

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
