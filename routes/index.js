var express = require('express');
var router = express.Router();
var controllers = require("../controllers");

router.route('/')
    .get(controllers.getView);


module.exports = router;