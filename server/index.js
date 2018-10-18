const express = require('express');

const router = express.Router();
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

// Allow cross origin requests
app.use(cors());

router.get('/', (req, res, next) => {
  res.send({ key: 4 });
});

router.get('/lessons/:unitID', (req, res, next) => {
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

router.get('/teacherNotes/:lessonID', (req, res, next) => {
  res.send([
    { pdf: '/lesson1.pdf', notes: 'blah, blah' },
    { pdf: '/lesson2.pdf', notes: 'blah, blah' },
    { pdf: '/lesson3.pdf', notes: 'blah, blah' },
    { pdf: '/lesson4.pdf', notes: 'blah, blah' },
    { pdf: '/lesson5.pdf', notes: 'blah, blah' }
  ]);
});

router.get('/teacherNotes/:lessonID', (req, res, next) => {
  res.send(req.params.classID);
});

app.use('/api', router);

app.listen(port);

process.env.RUNKIT_ENDPOINT_URL;
