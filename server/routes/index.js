/* eslint-disable camelcase */
const Router = require('express-promise-router');
const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const db = require('../db/index');

const router = new Router();

/** Configure key for AWS */
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

/** configure AWS to work with promises */
AWS.config.setPromisesDependency(bluebird);

/** Create S3 instance */
const s3 = new AWS.S3();

async function getUsers(req, res) {
  try {
    if (Object.keys(req.session).length === 0) {
      res.redirect('/login');
      return 0;
    }
    const query = await db.query(
      'SELECT id, is_teacher FROM users WHERE users.token = $1',
      [req.session.passport.user.token]
    );
    return query.rows[0];
  } catch (error) {
    console.log(error.stack);
    return null;
  }
}

async function setEmails(classID, emails) {
  const promises = [];

  for (let i = 0; i < emails.length; i += 1) {
    promises.push(
      db.query('SELECT * FROM users WHERE email = $1;', [emails[i]])
    );
  }

  let j = 0;

  await Promise.all(promises).then(async values => {
    if (values[0].rowCount === 0) {
      db.query('INSERT INTO users (email, is_teacher) values ($1, FALSE);', [
        emails[j]
      ]);
      j += 1;
    }
  });
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
    const userInfo = await getUsers(req, res);
    const { id, is_teacher } = userInfo;
    let query;
    const checkEmail = await db.query(
      'SELECT email FROM users WHERE users.token = $1',
      [req.session.passport.user.token]
    ); //  this query will help check if a user is both a student and a teacher. this will set that user to a student
    const check = await db.query(
      'SELECT is_teacher FROM users WHERE email = $1',
      [checkEmail]
    );
    const checkCount = check.rowCount;
    if (is_teacher && checkCount === 1) {
      query = await db.query(
        'SELECT classes.id AS classID, classes.class_name, users.* FROM classes, users WHERE classes.teacherID = $1 and users.id = $1;',
        [id]
      );
    } else {
      query = await db.query(
        'SELECT c.id, c.class_name, s.studentid, u.* FROM classes as c, students_classes as s, users as u WHERE s.studentid = $1 and s.studentid = c.id and u.id = s.studentid;',
        [id]
      );
    }

    res.send({ query: query.rows, is_teacher });
  } catch (error) {
    console.log(error.stack);
  }
});

router.post('/classes', async (req, res) => {
  try {
    const { className, emails, yearName } = req.body;
    const { id } = await getUsers(req, res);
    const check = await db.query(
      'SELECT * FROM classes where class_name = $1;',
      [className]
    );

    // if that class name already exists (rows.length should be 1)
    let classID;
    if (check.rows.length !== 0) {
      // rows.length should be 1 (there should be exactly one other class with that name)
      classID = check.rows[0].id;
    } else {
      // insert into table classes; make a new class row
      const result = await db.query(
        'INSERT INTO classes (teacherID, class_name) VALUES ($1, $2) returning id;',
        [id, className]
      );

      classID = result.rows[0].id;
    }

    setEmails(classID, emails);

    for (let i = 0; i < emails.length; i += 1) {
      db.query(
        'INSERT INTO students_classes (studentID, classID, yearName) values ( (SELECT u.id FROM users as u WHERE u.email = $1 LIMIT 1), $2, $3 );',
        [emails[i], classID, yearName]
      );
    }
    res.send(className);

    res.send('success!');
  } catch (error) {
    console.log(error.stack);
  }
});

router.delete('/deleteClass/:className', async (req, res) => {
  try {
    const { className } = req.params;
    const query = await db.query('DELETE FROM classes WHERE class_name = $1;', [
      className
    ]);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.delete('/deleteUnit/:unitName', async (req, res) => {
  try {
    const { unitName } = req.params;
    const query = await db.query('DELETE FROM units WHERE unit_name = $1;', [
      unitName
    ]);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.delete('/deleteLesson/:lessonName', async (req, res) => {
  try {
    const { lessonName } = req.params;
    const query = await db.query(
      'DELETE FROM lessons WHERE lesson_name = $1;',
      [lessonName]
    );
    res.send(query.rows);
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
    const userInfo = await getUsers(req, res);
    const { is_teacher } = userInfo;
    const { classID } = req.params;
    const query = await db.query('SELECT * FROM units WHERE classid = $1;', [
      classID
    ]);
    res.send({ query: query.rows, is_teacher });
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
    res.send({ query: query.rows });
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

    const offsetQuery = await db.query(
      `SELECT question FROM responses WHERE unit=${unitID} ORDER BY question`
    );

    const offset = offsetQuery.rows[0].question;

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
        const i = row.question - offset;
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
  const query = await db.query('SELECT input FROM questions WHERE unit_id=$1', [
    unitID
  ]);
  const questions = [];
  query.rows.forEach(e => {
    questions.push(e.text);
  });
  res.send(questions);
});

router.post('/questions', async (req, res) => {
  try {
    const { idForUnit, questionInput } = req.body;
    db.query('INSERT INTO questions(unit_id, input) VALUES($1 ,$2)', [
      idForUnit,
      questionInput
    ]);
  } catch (error) {
    console.log(error.stack);
  }
  res.send('Update successful');
});

router.post('/upload', async (req, res) => {
  const { sampleFile } = req.files;
  const { name, unitID } = req.body;

  // the RETURNING id is used for dynamically rendering the lesson box after uploading
  const query = await db.query(
    "INSERT INTO lessons (lesson_name, reflection_text, unit_id) VALUES ($1, '', $2) RETURNING id;",
    [name, unitID]
  );

  const lessonID = query.rows[0].id;

  const params = {
    ACL: 'public-read',
    Bucket: process.env.S3_BUCKET,
    Body: sampleFile.data,
    ContentType: 'application/pdf',
    Key: `${lessonID}.pdf`
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error in callback');
      console.log(err);
    }
    console.log('Success!');
    console.log(data);
  });

  res.send({ id: lessonID });
});

router.post('/survey', async (req, res) => {
  const { input, unitID, studentID } = req.body;
  const ratings = JSON.parse(input);
  const classQuery = await db.query('SELECT classid FROM units WHERE id=$1;', [
    unitID
  ]);
  const classID = classQuery.rows[0].classid;
  const yearQuery = await db.query(
    'SELECT yearName FROM students_classes WHERE studentID=$1 AND classID=$2;',
    [studentID, classID]
  );
  const year = yearQuery.rows[0].yearname;
  Object.keys(ratings).forEach(q => {
    db.query(
      'INSERT INTO responses (question, unit, response, yr) VALUES ($1, $2, $3, $4);',
      [q, unitID, ratings[q], year]
    );
  });
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

router.post('/questions', async (req, res) => {
  try {
    const { idForUnit, questionInput } = req.body;
    db.query('INSERT INTO questions(unit_id, input) VALUES($1 ,$2)', [
      idForUnit,
      questionInput
    ]);
  } catch (error) {
    console.log(error.stack);
  }
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
