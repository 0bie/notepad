const http = require('http');
const path = require('path');
const express = require('express');
const routes = require('./api/v1/routes');
const models = require('./models');
const connect = require('./db');
const favicon = require('serve-favicon');

const dbName = process.env.DB_NAME || 'NOTEdb';
const dbUrl = process.env.MONGOHQ_URL || `mongodb://@localhost:27017/${dbName}`;

connect(dbUrl);

const logger = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // `session` depends on `cookieParser` to work properly
const methodOverride = require('method-override');

const app = express();
app.locals.appTitle = 'Note Client with Express and MongoDB [POC]';

// Expose `models` to request handlers
app.use((req, res, next) => {
  if (!models.Note || !models.User) {
    return next(new Error('There are currently no models!'));
  }
  req.models = models;
  return next();
});

// Express.js configurations
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Express.js Middleware configuration
app.disable('x-powered-by');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser((process.env.SESSION_SECRET || '7GHY4LKD-7UE1-4876-2317-97651BDHG278')));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: (process.env.APP_SECRET || '6Y88559U-F784-5T66-6573-43T165RG64BG')
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Authentication Middleware
app.use((req, res, next) => {
  if (req.session && req.session.admin) {
    res.locals.admin = true;
  }
  next();
});

// development only
if (app.get('env') === 'development') {
  app.use(errorHandler('dev'));
}

// Initialize routes
routes(app);

// Initialize server
const server = http.createServer(app);

const boot = () => {
  server.listen(app.get('port'), () => {
    console.info('Server listening on http://localhost:%s', app.get('port')); // eslint-disable-line no-console
  });
};

const shutdown = () => {
  server.close(process.exit);
};

if (require.main === module) {
  boot();
} else {
  console.info('Running app as a module'); // eslint-disable-line no-console
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}
