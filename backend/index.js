const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
}

//Initialize
const app = express();
require('./database');
//Settings express
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'))

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename(req, file, cb) {
    cb(null, new Data().getTime() + path.extname(file.originalname))
  }
})

app.use(multer({storage}).single('image'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Routes
app.use('/api/books', require('./routes/books'))

//Staticfiles
app.use(express.static(path.join(__dirname, 'public')))

//Listen App
app.listen(app.get('port'), () => {
  console.log('Service active on ', app.get('port'))
})
