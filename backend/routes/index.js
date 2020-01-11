var express = require('express');
var router = express.Router();
const fs = require('fs');
const controller = require('../controller');

/* GET home page. */
router.get('/test', function(req, res) {
  const { grade } = req.params;
  fs.readFile('test.json', 'utf-8', (err, data) => {
    res.send(data);
  })
});

router.get('/chapter/:grade', function(req, res) {
  const { grade } = req.params;

  controller.chapter.getChapters(grade)
      .then((result) => {
        res.send(result);
      })
});

router.get('/problems/:grade/:semester/:chapter', function(req, res) {
  const { grade, chapter, semester } = req.params;
  console.log(semester);

  controller.problem.getProblems(grade, chapter, semester)
      .then((result) => {
        res.send(result);
      })
});

router.get('/problem/:grade/:semester/:chapter/:problem', function(req, res) {
  const { grade, semester, chapter, problem } = req.params;
  fs.readFile(`problemSet/${grade}/${semester}/${unit}/${problem}.json`, 'utf-8', (err, data) => {
    res.send(data);
  })
});

module.exports = router;
