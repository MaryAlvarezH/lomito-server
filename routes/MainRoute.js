const express = require('express');
const router = express.Router();
const doc = require('../public/javascripts/documentation');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(doc.getUserJson);
    res.render('index', { doc });
});

module.exports = router;