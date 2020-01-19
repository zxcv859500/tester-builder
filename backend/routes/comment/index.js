const auth = require('../../middlewares/auth');
const controller = require('../../controller');
const express = require('express');
const router = express.Router();

router.use('/write', auth);
router.post('/write', function(req, res) {
    const { username, name, userId } = req.decoded;
    const date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    const { content, articleId } = req.body;

    controller.comment.write({
        author: `${name}(${username})`,
        content: content,
        date: date,
        articleId: articleId,
        id: userId
    })
        .then(() => {
            res.status(200).send("Comment posting complete");
        })
        .catch((err) => {
            res.send(err);
        })
});

router.get('/:id', function(req, res) {
    const { id } = req.params;

    controller.comment.list({ articleId: id })
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.send(err);
        })
});

router.use('/remove/:id', auth);
router.get('/remove/:id', function(req, res) {
    const { id } = req.params;
    const { userId } = req.decoded;

    controller.comment.remove({ id: id, userId: userId })
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.send(err);
        })
});

module.exports = router;