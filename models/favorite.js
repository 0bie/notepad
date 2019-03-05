const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    created_date: {
      type: Date,
      required: true
    },
    tags: {
      type: Array,
      unique: true
    }
  },
  {timestamps: true}
);

module.exports = favoriteSchema;
