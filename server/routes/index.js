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
    const { classID } = req.params;
    const query = await db.query('SELECT * FROM units WHERE classid = $1;', [
      classID
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
    const questionquery = await db.query(
      `SELECT * FROM questions where unit_id=${unitID}`
    );
    const NUMQS = questionquery.rows.length;
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

      const rawQuestions = [];

      for (let i = 0; i < NUMQS; i += 1) {
        rawQuestions.push([]);
      }

      rowsYear.forEach(row => {
        const i = row.question - 1;
        rawQuestions[i].push(row.response);
      });

      const averagedQ = [];

      for (let i = 0; i < rawQuestions.length; i += 1) {
        averagedQ.push(
          rawQuestions[i].reduce((a, b) => a + b, 0) / rawQuestions[i].length
        );
      }

      data.push({
        year: yr,
        num: NUMQS,
        questions: averagedQ
      });
    });
    res.send(data);
  } catch (error) {
    console.log(error.stack);
  }
});

router.get('/questions/:unitID', async (req, res) => {
  const { unitID } = req.params;
  const query = await db.query(
    `SELECT text FROM questions where unit_id=${unitID}`
  );
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
