if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs'); // để sử dụng ejs -> là 1 view engine
app.set('views', __dirname + '/views');  // __dirname luôn là thư mục tệp hiện tại, còn ./ dịch thư mục khi require
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log("Connected to Mongoose"));

app.use('/', indexRouter);


app.listen(process.env.PORT || 3000, function(){
  console.log('Listening to port');
  
});