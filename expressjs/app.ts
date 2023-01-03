import {NextFunction, Request, Response} from "express";

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');


// const swaggerUi = require('swagger-ui-express'),
//     swaggerDocument = require('./swagger.json');

import {initOpenApi, openApiInstance} from "./openapi";

const colorsApi =  require("./openapi/colorsApi");
const groupsApi =  require("./openapi/groupsApi");
const userApi =  require("./openapi/userApi");
const auth =  require("./openapi/auth");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let corsOptions = {
  origin : ['http://localhost:8081'],
}

app.use(logger('dev'));
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app routes
auth.authInit(app, openApiInstance);
userApi.loadUser(app, openApiInstance);
colorsApi.getColors(app, openApiInstance);
colorsApi.getColorById(app, openApiInstance);
colorsApi.getColorsByGroupId(app, openApiInstance);

colorsApi.getRandomColor(app, openApiInstance);
colorsApi.searchColor(app, openApiInstance);
//
groupsApi.getGroups(app, openApiInstance)

// app.use(
//     '/api-docs',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument)
// );

initOpenApi(app, openApiInstance);


// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// app.get('*', (req: Request, res: Response) => {
//
// })
// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
