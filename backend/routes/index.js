var express = require('express');
var router = express.Router();
const fs = require('fs');
const controller = require('../controller');
const auth = require('./auth');
const article = require('./article');

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

    controller.problem.getProblems(grade, chapter, semester)
        .then((result) => {
            res.send(result);
        })
});

router.get('/problem/:grade/:semester/:chapter/:problem', async function(req, res) {
    const { grade, semester, chapter, problem } = req.params;
    const rand = Math.floor(Math.random() * 16);
    const problemId = `${grade}${semester}${chapter}${problem}${rand.toString(16)}`;

    const compJson = await controller.problem.getComp(problemId);
    const varsJsons = await controller.problem.getVars(problemId);

    res.send({
        "compJson": compJson,
        "varsJsons": varsJsons
        });
});

router.get('/problem/:problemId', async function(req, res) {
    const { problemId } = req.params;

    const compJson = await controller.problem.getComp(problemId);
    const varsJsons = await controller.problem.getVars(problemId);

    res.send({
        "compJson": compJson,
        "varsJsons": varsJsons
    })
});

router.use('/auth', auth);
router.use('/article', article);

module.exports = router;
