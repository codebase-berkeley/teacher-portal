const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Teacher Portal API!');
});

router.get('/studentSummary', function(req, res, next) {
  res.send([
    { "year": 2016, "q1": 3, "q2": 4, "q3": 0, "q4": 2 }, 
    { "year": 2017, "q1": 3, "q2": 4, "q3": 0, "q4": 2 }
  ]);
});

module.exports = router;
