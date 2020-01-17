const router =require('express').Router();
const controller = require('../../controller');

router.post('/login', (req, res) => {
    const{username, password}= req.body;

    if(!username || !password) {
        res.status(409).json({
            Error: "Username and password required"
        })
    } else {
            controller.user.login(username, password)
                .then((result) => {
                    res.json({
                        token: result,
                        username: username
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        error: err.message
                    });
                })
    }
});

module.exports = router;