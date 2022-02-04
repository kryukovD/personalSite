var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require("cors")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const ordersRouter=require('./routes/orders');
const regRouter=require("./routes/reg");
const authRouter=require("./routes/auth")
const postsRouter=require("./routes/posts")
const projectsRouter=require("./routes/projects")
const adminRouter=require("./routes/admin")
const chatRouter=require("./routes/chat").router
const session = require('express-session');
const { send } = require('process');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: [
  "http://localhost:4200"
], credentials: true}));
app.use(cookieParser());
app.use(
  session({
    secret: 'kryukov',
    saveUninitialized: true,
    resave:true,
    cookie:{
      maxAge:120000
    }
  })
  
)

app.use(function(req,res,next){
  if(!req.session.send){
    req.session.send=false
  }
  next()
})
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders',ordersRouter)
app.use('/registration',regRouter)
app.use('/auth',authRouter)
app.use("/posts",postsRouter)
app.use("/admin",adminRouter)
app.use("/projects",projectsRouter)
app.use("/chat",chatRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

 
module.exports = app

