const auth = require('../../middlewares/auth');
const controller = require('../../controller');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const moment = require('moment-timezone');

const upload = multer({dest : "uploads/images/"});

router.use('/notice/write', auth);
router.post('/notice/write', function(req, res) {
    const { username, name, userId } = req.decoded;
    const date = moment.tz(new Date(), 'Asia/Seoul').format('YYYY-MM-DD hh-mm-ss');
    const { title, content } = req.body;
    if (username !== 'edumaster' && username !== 'zxcv859500@naver.com') {
        res.status(403).send("Not admin");
    } else {
        controller.article.write({
            author: `${name}(${username})`,
            title: title,
            content: content,
            date: date,
            type: "notice",
            id: userId
        })
            .then(() => {
                res.status(200).send("Post writing complete");
            })
            .catch((err) => {
                res.send(err);
            })
    }
});

router.get('/notice/list/:page', function(req, res) {
    const { page } = req.params;
    controller.article.list({ type: "notice", page: page })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('/notice/count', function(req, res) {
    controller.article.listCount({ type: "notice" })
        .then((result) => {
            res.status(200).send({
                articleCount: result
            });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
});

router.use('/question/write', auth);
router.post('/question/write', function(req, res) {
    const { username, name, userId } = req.decoded;
    const date = moment.tz(new Date(), 'Asia/Seoul').format('YYYY-MM-DD hh-mm-ss');
    const { title, content } = req.body;

    controller.article.write({
        author: `${name}(${username})`,
        title: title,
        content: content,
        date: date,
        type: "question",
        id: userId
    })
        .then(() => {
            res.status(200).send("Post writing complete");
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('/question/list/:page', function(req, res) {
    const { page } = req.params;
    controller.article.list({ type: "question", page: page })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('/question/count', function(req, res) {
    controller.article.listCount({ type: 'question'})
        .then((result) => {
            res.status(200).send({
                articleCount: result
            });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
});

router.use('/video/write', auth);
router.post('/video/write', function(req, res) {
    const { username, name, userId } = req.decoded;
    const date = moment.tz(new Date(), 'Asia/Seoul').format('YYYY-MM-DD hh-mm-ss');
    const { title, content } = req.body;

    controller.article.write({
        author: `${name}(${username})`,
        title: title,
        content: content,
        date: date,
        type: "video",
        id: userId
    })
        .then(() => {
            res.status(200).send("Post writing complete");
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('/video/list/:page', function(req, res) {
    const { page } = req.params;
    controller.article.list({ type: "video", page: page })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('/video/count', function(req, res) {
    controller.article.listCount({ type: 'video'})
        .then((result) => {
            res.status(200).send({
                articleCount: result
            });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
});

router.get('/:id', function(req, res) {
    const { id } = req.params;
    controller.article.getArticle({ id: id })
        .then((result) => {
            let temp = result;
            res.send(temp);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.use('/remove/:id', auth);
router.get('/remove/:id', function(req, res) {
    const { id } = req.params;
    const { userId } = req.decoded;

    controller.article.remove({id: id, userId: userId})
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.use('/:type/:edit', auth);
router.post('/:type/:edit', function(req, res) {
    const { userId } = req.decoded;
    const { title, content, id } = req.body;

    controller.article.edit({ id: id, userId: userId, title: title, content: content})
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.send(err);
        })
});

router.post('/imageUpload', upload.single('file'), function(req, res) {
    res.send({ url: `/api/uploads/images/${req.file.filename}`});
});

module.exports = router;