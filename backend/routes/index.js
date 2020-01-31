var express = require('express');
var router = express.Router();
const fs = require('fs');
const controller = require('../controller');
const auth = require('./auth');
const article = require('./article');
const comment = require('./comment');
const score = require('./score');
const multer = require('multer');
const vimeo = require('vimeo').Vimeo;

const upload = multer({ dest : "uploads/videos/"});
/* GET home page. */
router.get('/test', function(req, res) {
  const { grade } = req.params;
  fs.readFile('test.json', 'utf-8', (err, data) => {
    res.send(data);
  })
});

router.get('/', function(req, res) {
   res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/count', function(req, res) {
   controller.problem.count()
       .then((result) => {
           res.send(result[0]);
       })
       .catch((err) => {
           res.send(err);
       })
});

router.get('/chapter/:grade', function(req, res) {
  const { grade } = req.params;

  controller.chapter.getChapters(grade)
      .then((result) => {
        res.send(result);
      })
});

router.get('/make/:grade/:semester/:chapter/:problemNumber', function(req, res) {
    const { grade, chapter, semester, problemNumber } = req.params;

    controller.problem.makeProblem(grade, chapter, semester, problemNumber)
        .then((result) => {
            res.send({ problemId: result});
        })
});
router.get('/problems/:grade/:semester/:chapter', function(req, res) {
    const {grade, chapter, semester} = req.params;

    controller.problem.getProblems(grade, chapter, semester)
        .then((result) => {
            res.send(result);
        });
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

router.get('/problemId/:type', (req, res) =>{
    const { type } = req.params;

    controller.problem.getProblemId(type)
        .then((result) => {
            res.send({ 'problemId': result })
        })
        .catch((err) => {
            res.send(err);
        });
})

router.post('/upload', upload.single('file'), function (req, res) {
    const filePath = req.file.path;
    const clientId = 'a5092b2acf832af585dc981a3708c419a6455c2d';
    const clientSecret = 'tDBV5kvOzM84IaBuJo7rpoPYI/VUCQTIDK0ycybl5MJo5GNY/02l2gVbkI0/tGVni2qHK8EhUlN6pCYqjF5zAZMkWebUEthTUdAEfgIHS/JpriHftFqtdFJEGu4BvlMC';
    const access_token = 'd7b9b45c36c47d9184d3ee280b998e82';
    const client = new vimeo(clientId, clientSecret, access_token);
    let result = '';
    client.upload(
        filePath,
        {
            'name': 'Untitled',
            'description': 'The description'
        },
        function (uri) {
            result = uri;
            fs.unlinkSync(req.file.path);
            res.send({uri: result});
        },
        function (error) {
            console.log("error: " + error);
        }
    );
});

router.use('/auth', auth);
router.use('/article', article);
router.use('/comment', comment);
router.use('/score', score);

module.exports = router;
