import mongoose from "mongoose";

// Define the schema for the Book
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  publishedDate: {
    type: Date,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  }
});


const Book = mongoose.model('Libary', bookSchema);

export default Book;
