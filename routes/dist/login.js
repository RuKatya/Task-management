"use strict";
exports.__esModule = true;
var express_1 = require("express");
var loginController_1 = require("../controllers/loginController");
var validators_1 = require("../utils/validators");
var router = express_1.Router();
router
    .post('/login', validators_1.loginValidators, loginController_1.handleLogin)
    .post('/regist', validators_1.registerValidators, loginController_1.handleReg)
    .get('/logout', loginController_1.logOut);
module.exports = router;
