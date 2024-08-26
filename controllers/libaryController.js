import Book from "../models/libaryModel.js";

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, author, genre, publishedDate, isbn } = req.body;

    // Check if the book already exists
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: 'Book with this ISBN already exists'
      });
    }

    const newBook = await Book.create({ title, author, genre, publishedDate, isbn });

    res.status(201).json({
      success: true,
      message: "Library book created",
      newBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There is a problem",
      error: error.message
    });
  }
};

// Update an existing book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, publishedDate, isbn } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, publishedDate, isbn },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      updatedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findById(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    await deletedBook.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const { title, author } = req.query;

    // Build query object
    const query = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }
    if (author) {
      query.author = { $regex: author, $options: 'i' }; // Case-insensitive search
    }

    // Find books based on query
    const books = await Book.find(query);

    res.status(200).json({
      success: true,
      books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
  createBook,
  updateBook,
  deleteBook,
  getAllBooks
};
