const auth = require('../../middlewares/auth');
const controller = require('../../controller');
const express = require('express');
const router = express.Router();

router.use('/notice/write', auth);
router.post('/notice/write', function(req, res) {
    const { username } = req.decoded;
    const date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    const { title, content } = req.body;

    if (username !== 'edumaster' && username !== 'zxcv859500@naver.com') {
        res.status(403).send("Not admin");
    } else {
        controller.article.write({
            author: username,
            title: title,
            content: content,
            date: date,
            type: "notice"
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
    const { username } = req.decoded;
    const date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    const { title, content } = req.body;

    controller.article.write({
        author: username,
        title: title,
        content: content,
        date: date,
        type: "question"
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
    const { username } = req.decoded;
    const date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    const { title, content } = req.body;

    controller.article.write({
        author: username,
        title: title,
        content: content,
        date: date,
        type: "video"
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
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
});

module.exports = router;