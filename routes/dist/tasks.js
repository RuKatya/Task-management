"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1.Router();
//CONTROLLERS
var tasksController_1 = require("../controllers/tasksController");
//Middleware
var auth_1 = require("../middleware/auth");
router
    .get('/', auth_1["default"], tasksController_1.handleGetAllTasks) //get all tasks
    .post('/addremembr', auth_1["default"], tasksController_1.handleAddTask); //add task
module.exports = router;
