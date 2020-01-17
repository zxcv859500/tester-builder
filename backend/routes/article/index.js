const auth = require('../../middlewares/auth');
const controller = require('../../controller');
const express = require('express');
const router = express.Router();

router.use('/notice/write', auth);
router.post('/notice/write', function(req, res) {
    const { username } = req.decoded;
    const date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
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
    controller.article.listCount()
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

module.exports = router;