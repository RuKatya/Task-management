"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const colors_1 = __importDefault(require("colors"));
const body_parser_1 = __importDefault(require("body-parser"));
const csurf_1 = __importDefault(require("csurf"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const MongoStore = connect_mongodb_session_1.default(express_session_1.default);
const keys = require('./keys');
const app = express_1.default();
const PORT = process.env.PORT || 7894;
//MIDDLEWARE
const varMiddleware = require('./middleware/variables');
// const userMiddleware = require('./middleware/user')
// const errorMiddleware = require('./middleware/error')
// const fileMiddleware = require('./middleware/file')
//EJS
app.set('view engine', 'ejs'); //connecting ejs
console.log(app.get('view engine'));
app.set('views', path_1.default.resolve(__dirname, 'pages'));
//STATIC
app.use(body_parser_1.default.urlencoded({ extended: false })); //bodyParser
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public'))); //static folder
app.use(express_1.default.static(path_1.default.join(__dirname, 'images'))); //static image folder for profile pics
app.use(express_1.default.json());
//SESSION
const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
});
app.use(cookie_parser_1.default());
app.use(express_session_1.default({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));
//MIDDLEWARE
app.use(csurf_1.default());
app.use(connect_flash_1.default());
app.use(varMiddleware);
// app.use(userMiddleware)
//DATA CONNECT
try {
    mongoose_1.default.connect(keys.MONGODB_URI, () => {
        console.log(colors_1.default.bgGreen.black(`DATA CONNECTED`));
    });
}
catch (err) {
    console.log(colors_1.default.bgRed.black(err));
}
//ROUTES
const index = require('./routes/index');
const login = require('./routes/login');
app.use('/', index);
app.use('/auth', login);
//LISTEN TO
app.listen(PORT, () => {
    return console.log(colors_1.default.bgCyan.black(`Listening at http://localhost:${PORT}`));
});
