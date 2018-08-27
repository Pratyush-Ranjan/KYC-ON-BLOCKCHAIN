var express = require('express');
var router = express.Router();
var Users= require('../controllers/user');

router.post('/register',Users.register);
router.delete('/delete/:id',Users.deleteuser);
router.post('/login',Users.login);


module.exports = router;
