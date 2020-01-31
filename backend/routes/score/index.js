const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const controller = require('../../controller');

router.use('/', auth);
router.get('/', function(req, res) {
    const { username } = req.decoded;

    controller.score.getScore({ userId: username })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        })
});

module.exports = router;