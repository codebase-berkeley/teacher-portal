const Router = require('express-promise-router');

const db = require('../db/index');

const router = new Router();

async function getUsers(req, res) {
  try {
    if (Object.keys(req.session).length === 0) {
      res.redirect('/login');
      return 0;
    }
    const query = await db.query(
      'SELECT id FROM users WHERE users.token = $1',
      [req.session.passport.user.token]
    );
    return query.rows[0].id;
  } catch (error) {
    console.log(error.stack);
    return null;
  }
}

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
    const userID = await getUsers(req, res);
    const query = await db.query(
      'SELECT classes.id AS classID, classes.class_name, users.* FROM classes, users WHERE classes.teacherID = $1 and users.id = $1;',
      [userID]
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.post('/classes', async (req, res) => {
  try {
    const userID = await getUsers(req, res);
    const { className, emails } = req.body;
    const check = await db.query(
      'SELECT * FROM classes where class_name = $1;',
      [className]
    );

    if (check.rows.length !== 0) {
      res.send(false);
    } else {
      const classID = await db.query(
        'INSERT INTO classes (teacherID, class_name) VALUES ($1, $2) returning id;',
        [userID, className]
      );
      for (let i = 0; i < emails.length; i += 1) {
        db.query(
          'INSERT INTO students_classes (studentID, classID) values((SELECT u.id FROM users as u WHERE u.email = $1), $2);',
          [emails[i], classID.rows[0].id]
        );
      }
      res.send(className);
    }
  } catch (error) {
    console.log(error.stack);
  }
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
  res.send({
    filepath: rows[0].filepath,
    notes: rows[0].reflection_text
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
        averagedQ.push([
          i + 1,
          rawQuestions[i].reduce((a, b) => a + b, 0) / rawQuestions[i].length
        ]);
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

router.post('/upload', async (req, res) => {
  const { sampleFile } = req.files;
  const { name, unitID } = req.body;
  const lessonPath = `./static/${sampleFile.name}`;

  // the RETURNING id is used for dynamically rendering the lesson box after uploading
  const query = await db.query(
    "INSERT INTO lessons (lesson_name, reflection_text, unit_id, filepath) VALUES ($1, '', $2, $3) RETURNING id;",
    [name, unitID, lessonPath]
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

router.post('/units', async (req, res) => {
  try {
    const { unitName, classID } = req.body;
    const query = await db.query(
      'INSERT INTO units(classid, unit_name) VALUES($1 ,$2) RETURNING id;',
      [classID, unitName]
    );
    const unitID = query.rows[0].id;
    res.send({ id: unitID });
  } catch (error) {
    console.log(error.stack);
  }
});

module.exports = router;
