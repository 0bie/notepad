const mongoose = require('mongoose');
const favoriteSchema = require('./favorite');

const roles = {
  'admin': 'admin',
  'member': 'member'
};

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      unique: true,
      required: true,
      default: roles.member,
      enum: Object.keys(roles)
    },
    admin: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    full_name: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      set(value) {
        return value.trim().toLowerCase();
      },
      validate: [
        function (email) {
          return (email.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null); // eslint-disable-line no-useless-escape
        },
        'Invalid email'
      ]
    },
    image: {
      type: Buffer,
      unique: true
    },
    title: {
      type: String,
      unique: true
    },
    favorites: [favoriteSchema],
    numberOfFavorites: {
      type: Number,
      get(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // eslint-disable-line quotes
      }
    }
  },
  {timestamps: true}
);

userSchema.static({
  list(callback) {
    this.find({}, null, {sort: {_id: -1}}, callback);
  }
});

userSchema
  .path('numberOfFavorites')
  .get(() => this.favorites.length);

module.exports = mongoose.model('User', userSchema);
