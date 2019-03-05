const mongoose = require('mongoose');
const tagSchema = require('./tag');
const {parseDate} = require('../utils');

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      validate: [function (value) {
        return value.length <= 120;
      }, 'Title is too long (120 max)'],
      default: 'New Note'
    },
    published: {
      type: Boolean,
      default: false
    },
    slug: {
      type: String,
      set(value) {
        return value.toLowerCase().replace(' ', '-');
      }
    },
    tags: [tagSchema],
    created_date: {
      type: Date,
      default: Date.now,
      get(value) {
        return parseDate(value);
      }
    },
    author: {
      type: String,
      unique: true
    }
  },
  {timestamps: true}
);

noteSchema.static({
  list(callback) {
    this.find({}, null, {sort: {_id: -1}}, callback);
  }
});

module.exports = mongoose.model('Note', noteSchema);
