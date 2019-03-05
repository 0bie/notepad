const {Note} = require('../controllers');

module.exports = (app) => {

  app.route('/admin')
    .get(Note.admin);

  app.route('/post')
    .get(Note.post)
    .post(Note.postNote);

  app.route('/api/v1/notes')
    .get(Note.list)
    .post(Note.add);

  app.route('/api/v1/notes/:id')
    .put(Note.edit)
    .get(Note.show)
    .delete(Note.delete);

  app.route('/api/v1/notes/tags/:tagId')
    .get(Note.listTags);

};
