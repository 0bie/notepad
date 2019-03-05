const {getInitials} = require('../../../utils');

module.exports = (app) => {

  app.route('/')
    .get((req, res, next) => {
      req.models.Note.find(
        {published: true},
        null,
        {sort: {_id: -1}},
        (error, notes) => {
          if (error) return next(error);
          res.render('index', {
            notes,
            getInitials,
            user: req.session.user
          });
        }
      );
    });

  require('./auth')(app),
  require('./note')(app),
  require('./user')(app),

  app.route('*')
    .all((req, res) => {
      res.status(404).send();
    });

};
