module.exports = (app) => {

  app.route('/api/v1/users')
    .all(authorize);

  app.route('/api/v1/notes')
    .post(authorize)
    .put(authorize);

};

function authorize(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  } else {
    return res.status(401).send();
  }
}
