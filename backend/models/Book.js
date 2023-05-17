const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  hasRead: {
    type: Boolean,
    required: true,
    default: false
  },
  yearPublished: Number,
  imgUrl: String,
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;