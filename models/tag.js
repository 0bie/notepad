const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      unique: true
    }
  }
);

module.exports = tagSchema;
