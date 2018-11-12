const Router = require('express-promise-router');

const db = require('../db/index');

const router = new Router();

router.get('/users', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM users;');
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
    const query = await db.query(
      'SELECT * FROM lessons WHERE unit_id = $1 ORDER BY id;',
      [unitID]
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.get('/teacherNotes/:lessonID', async (req, res) => {
  const { lessonID } = req.params;
  const query = await db.query('SELECT * FROM lessons WHERE id = $1;', [
    lessonID
  ]);
  const { rows } = query;
  res.send({ pdf: '/lessodn.pdf', notes: rows[0].reflection_text });
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

      const q = [[], [], [], []];

      rowsYear.forEach(row => {
        const i = row.question - 1;
        q[i].push(row.response);
      });

      const qlengths = [q[0].length, q[1].length, q[2].length, q[3].length];

      const averagedQ = [
        q[0].reduce((a, b) => a + b, 0) / qlengths[0],
        q[1].reduce((a, b) => a + b, 0) / qlengths[1],
        q[2].reduce((a, b) => a + b, 0) / qlengths[2],
        q[3].reduce((a, b) => a + b, 0) / qlengths[3]
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

router.get('/questions', async (req, res) => {
  const query = await db.query('SELECT text FROM questions');
  const questions = [];
  query.rows.forEach(e => {
    questions.push(e.text);
  });
  res.send(questions);
});

// TODO: unit_id is always 1...

router.post('/upload', async (req, res) => {
  const { sampleFile } = req.files;
  const { name } = req.body;
  const lessonPath = `./static/${sampleFile.name}`;

  // the RETURNING id is used for dynamically rendering the lesson box after uploading
  const query = await db.query(
    "INSERT INTO lessons (lesson_name, reflection_text, unit_id, filepath) VALUES ($1, '', 1, $2) RETURNING id;",
    [name, lessonPath]
  );

  const lessonID = query.rows[0].id;

  sampleFile.mv(lessonPath, err => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ id: lessonID });
    return null;
  });
  return null;
});

router.post('/survey/:unitID', async (req, res) => {
  /** TODO: make this dynamically update based on year */
  const year = 2018;
  const { unitID } = req.params;
  const { rating0, rating1, rating2, rating3 } = req.body;
  db.query(
    'INSERT INTO responses (question, unit, response, yr) VALUES (1, $1, $2, $3);',
    [unitID, rating0, year]
  );
  db.query(
    'INSERT INTO responses (question, unit, response, yr) VALUES (2, $1, $2, $3);',
    [unitID, rating1, year]
  );
  db.query(
    'INSERT INTO responses (question, unit, response, yr) VALUES (3, $1, $2, $3);',
    [unitID, rating2, year]
  );
  db.query(
    'INSERT INTO responses (question, unit, response, yr) VALUES (4, $1, $2, $3);',
    [unitID, rating3, year]
  );
  res.send('Update successful');
});

router.put('/update/:lessonID', async (req, res) => {
  const { lessonID } = req.params;
  const { notes } = req.body;
  db.query('UPDATE lessons SET reflection_text = $1 WHERE id = $2;', [
    notes.toString(),
    lessonID
  ]);
  res.send('Update successful');
});

module.exports = router;
