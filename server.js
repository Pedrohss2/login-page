require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.CONNECTIONBASEDEDADOS, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.emit('Pronto')
  })
  .catch(error => console.log('ERROR') )


const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csurf = require('csurf');
const { meuMiddleware, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware')

app.use(helmet());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
  secret: 'not, why?',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONBASEDEDADOS }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true 
  }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csurf());
app.use(meuMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware)
app.use(routes);


app.on('Pronto', () => {
  app.listen(3000, () => {
    console.log(' http://localhost:3000');
  });
})
