const {greet, getInitials} = require('../../../utils');

/**
 * `GET` `/api/v1/notes/:noteId`
 * Get a note
 */

exports.show = (req, res, next) => {

  if (!req.params.id) return next(new Error('No note id.'));

  const ObjectId = require('mongoose').Types.ObjectId;
  const noteId = ObjectId(req.params.id);

  req.models.Note.findById(
    noteId,
    (error, note) => {
      if (error) return next(error);
      if (!note) return next(new Error(`Note ${noteId} doesn't exist`));
      res.send({note});
    }
  );

};

/**
 * `GET /api/v1/notes/` API
 */

exports.list = (req, res, next) => {

  req.models.Note.list((error, notes) => {
    if (error) return next(error);
    res.send({notes});
  });

};

/**
 * `GET` `/api/v1/notes/tags/:tagId`
 * Get a note
 */

exports.listTags = (req, res, next) => {

  if (!req.params.tagId) return next(new Error('No note with tags founds.'));

  req.models.Note.find(
    {'tags.label': req.params.tagId},
    (error, notes) => {
      if (error) return next(error);
      if (!notes.length > 0) {
        return next(new Error(`Notes with tag: ${req.params.tagId} dont exist`));
      }
      res.send({notes});
    }
  );

};

/**
 * `POST /api/v1/notes/` API
 */

exports.add = (req, res, next) => {

  if (!req.body.note) return next(new Error('No note payload.'));
  const note = req.body.note;
  note.published = false;

  req.models.Note.create(note, (error, noteResponse) => {

    if (error) return next(error);
    res.send(noteResponse);
  });

};

/**
 * `PUT /api/v1/notes/:id` API
 */

exports.edit = (req, res, next) => {

  if (!req.params.id) return next(new Error('No note ID.'));
  if (!req.body.note) return next(new Error('No note payload.'));

  req.models.Note.findByIdAndUpdate(
    req.params.id,
    {$set: req.body.note},
    (error, doc) => {
      if (error) return next(error);
      res.send(doc);
    }
  );

};

/**
 * `DELETE /api/notes/:id` article API
 */

exports.delete = (req, res, next) => {

  if (!req.params.id) return next(new Error('No note ID.'));

  req.models.Note.findByIdAndRemove(
    req.params.id,
    (error, doc) => {
      if (error) return next(error);
      res.send(doc);
    }
  );

};

/**
 * `GET /post` note `POST` page
 * This page is a blank form and
 * thus requires no data
 */

exports.post = (req, res, next) => { // eslint-disable-line no-unused-vars

  if (!req.session.user) return res.redirect('/login');
  if (!req.body.title) {
    res.render('post', {getInitials, user: req.session.user});
  }

};

/**
 * `POST` note page
 */

exports.postNote = (req, res, next) => {

  if (!req.body.title || !req.body.slug || !req.body.text) {
    return res.render('post', {
      getInitials,
      user: req.session.user,
      error: 'Fill title, slug and text.'
    });
  }

  const note = {
    published: false,
    title: req.body.title,
    slug: req.body.slug,
    text: req.body.text
  };

  req.models.Note.create(note, (error, noteResponse) => { // eslint-disable-line no-unused-vars
    if (error) return next(error);
    res.render('post', {
      getInitials,
      user: req.session.user,
      error: 'Note was added successfully. To publish, visit the admin page.'
    });
  });

};

/**
 * `GET` admin page
 */

exports.admin = (req, res, next) => {

  if (!req.session.admin) {
    return res.redirect('/login');
  }

  req.models.Note.list((error, notes) => {
    if (error) return next(error);
    req.models.User.list((error, usersResponse) => {
      if (error) next(error);
      res.render('admin', {
        greet,
        notes,
        getInitials,
        users: usersResponse,
        user: req.session.user
      });
    });
  });

};

/**
 * `POST` `/api/v1/notes/:noteId`
 * Update favorites list
 */

exports.addTag = (req, res, next) => {

  if (!req.session.user) return res.redirect('/login');

  const ObjectId = require('mongoose').Types.ObjectId;
  const noteId = ObjectId(req.body.noteId);

  req.models.Note.findByIdAndUpdate(
    noteId,
    {$push: {tags: req.body.tags}},
    (error, note) => {
      if (error) return next(error);
      if (!note) return next(new Error(`Note ${noteId} doesn't exist`));
      res.send(note);
    }
  );

};
