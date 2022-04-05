import express from 'express';
import mongoose from "mongoose";
import path from 'path';
import color from "colors";
import bodyParser from 'body-parser'
import csrf from 'csurf';
import flash from 'connect-flash';
import session from 'express-session'
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import cookieParser from 'cookie-parser';
const MongoStore = connectMongoDBSession(session);
const keys = require('./keys')
const app = express();
const PORT: (string | number) = process.env.PORT || 7894;

//MIDDLEWARE
const varMiddleware = require('./middleware/variables');
// const userMiddleware = require('./middleware/user')
// const errorMiddleware = require('./middleware/error')
// const fileMiddleware = require('./middleware/file')

//EJS
app.set('view engine', 'ejs') //connecting ejs
console.log(app.get('view engine'))
app.set('views', path.resolve(__dirname, 'pages'))

//STATIC
app.use(bodyParser.urlencoded({ extended: false })) //bodyParser
app.use(express.static(path.resolve(__dirname, 'public'))) //static folder
app.use(express.static(path.join(__dirname, 'images'))) //static image folder for profile pics
app.use(express.json());

//SESSION
const store = new MongoStore({ //mongoose session
    collection: 'sessions',
    uri: keys.MONGODB_URI
})

app.use(cookieParser());
app.use(session({ //express-session
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

//MIDDLEWARE
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
// app.use(userMiddleware)

//DATA CONNECT
try {
    mongoose.connect(keys.MONGODB_URI, () => {
        console.log(color.bgGreen.black(`DATA CONNECTED`))
    })
} catch (err) {
    console.log(color.bgRed.black(err))
}

//ROUTES
const index = require('./routes/index');
const login = require('./routes/login');

app.use('/', index)
app.use('/auth', login)

//LISTEN TO
app.listen(PORT, () => {
    return console.log(color.bgCyan.black(`Listening at http://localhost:${PORT}`));
});
