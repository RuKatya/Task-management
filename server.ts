import express from 'express';
import mongoose from "mongoose";
import path from 'path';
import color from "colors";
import flash from 'connect-flash';
const keys = require('./keys')

const app = express();
const PORT: (string | number) = process.env.PORT || 7894;

app.use(express.static("public"));
app.use(express.json());
app.use(flash())

//EJS
app.set('view engine', 'ejs') //connecting ejs
console.log(app.get('view engine'))
app.set('views', path.resolve(__dirname, 'pages'))

try {
    mongoose.connect(keys.MONGODB_URI, () => {
        console.log(color.bgGreen.black(`DATA CONNECTED`))
    })
} catch (err) {
    console.log(color.bgRed.black(err))
}

const index = require('./routes/index');

app.use('/', index)

app.listen(PORT, () => {
    return console.log(color.bgCyan.black(`Listening at http://localhost:${PORT}`));
});
