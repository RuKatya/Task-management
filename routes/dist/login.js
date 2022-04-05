"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var router = express_1.Router();
var colors_1 = require("colors");
var bcryptjs_1 = require("bcryptjs");
//MODEL
var user_1 = require("../models/user");
// KEYS
var keys = require('../keys/index');
var validationResult = require('express-validator').validationResult;
var _a = require('../utils/validators'), registerValidators = _a.registerValidators, loginValidators = _a.loginValidators;
//NODEMAILER
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: keys.EMAIL_USER,
//         pass: keys.EMAIL_PASS
//     }
// })
// function sendRegMail(mail, name, password) {
//     return {
//         from: keys._FROM,
//         to: mail,
//         subject: "Seccess Registration",
//         html: `<h1>Welcome ${name}</h1><p>Youre password is ${password}</p>`
//     }
// }
//LOGIN
router.post('/login', loginValidators, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email_1, password, condidate, errors, areSame, error_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 8, , 9]);
                _a = req.body, email_1 = _a.email, password = _a.password;
                console.log(email_1, password);
                return [4 /*yield*/, user_1.User.findOne({ email: email_1 })];
            case 1:
                condidate = _b.sent();
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    req.flash('loginError', errors.array()[0].msg);
                    return [2 /*return*/, res.status(422).redirect('/')];
                }
                if (!condidate) return [3 /*break*/, 6];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, condidate.password)];
            case 3:
                areSame = _b.sent();
                if (areSame) {
                    req.session.user = condidate;
                    req.session.isAuthenticates = true;
                    req.session.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        console.log("get in " + email_1);
                        // res.redirect('/auth/success')
                    });
                }
                else {
                    req.flash('loginError', 'Wrong password');
                    console.log("the pass wrong");
                    res.redirect('/');
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(colors_1["default"].bgRed.black(error_1));
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                req.flash('loginError', 'User not exist');
                console.log("user not exist");
                res.redirect('/');
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _b.sent();
                console.log(colors_1["default"].bgRed.black(error_2));
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
//REGISTRATION
router.post('/regist', registerValidators, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, repeat, name, condidate, errors, hashpassword, user, error_3, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                _a = req.body, email = _a.email, password = _a.password, repeat = _a.repeat, name = _a.name;
                console.log(email, password, repeat, name);
                return [4 /*yield*/, user_1.User.findOne({ email: email })];
            case 1:
                condidate = _b.sent();
                errors = validationResult(req);
                if (!errors.isEmpty()) {
                    req.flash('registError', errors.array()[0].msg);
                    console.log(errors.array()[0].msg);
                    return [2 /*return*/, res.status(422).redirect('/')];
                }
                if (!condidate) return [3 /*break*/, 2];
                try {
                    req.flash('registError', 'User exist');
                    console.log('user exist');
                    res.redirect('/');
                }
                catch (error) {
                    console.log(colors_1["default"].bgRed.black(error));
                }
                return [3 /*break*/, 9];
            case 2:
                if (!(password === repeat)) return [3 /*break*/, 8];
                return [4 /*yield*/, bcryptjs_1["default"].hash(password, 10)];
            case 3:
                hashpassword = _b.sent();
                user = new user_1.User({
                    email: email, name: name,
                    password: hashpassword, tasks: { items: [] }
                });
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, user.save()];
            case 5:
                _b.sent();
                console.log('reg user');
                // transporter.sendMail(sendRegMail(user.emil, user.name, user.password), (error, info) => {
                // if (error) {
                //     console.log(error);
                // } else {
                //     console.log('Email sent: ' + info.response);
                // }
                // })
                res.render('page/regSuccess', {
                    title: "Success",
                    user: user
                });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                console.log(colors_1["default"].bgRed.black(error_3));
                return [3 /*break*/, 7];
            case 7: return [3 /*break*/, 9];
            case 8:
                console.log("the pass and repeat is not the same");
                _b.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                error_4 = _b.sent();
                console.log(colors_1["default"].bgRed.black(error_4));
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
router.get('/success', function (req, res) {
    res.render('page/regSuccess', {
        title: "Success"
    });
});
module.exports = router;
