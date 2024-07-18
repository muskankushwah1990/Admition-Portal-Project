const express = require('express')
const app = express()
const port = 4000
const web = require('./routes/web')
const connectDB = require('./db/connectDB')
const session = require('express-session')
const flash = require('connect-flash')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


//message
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

//Flash messages
app.use(flash());


//parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))

//ejs set html css
app.set('view engine', 'ejs')

//css image link
app.use(express.static('public'))

//connect db
connectDB()



//route load
app.use('/', web)


//server create
app.listen(port, () => console.log("server start localhost: 4000"))