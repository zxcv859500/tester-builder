var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  fs.readFile('test.json', 'utf-8', (err, data) => {
    res.send(data)
  })
});

module.exports = router;
