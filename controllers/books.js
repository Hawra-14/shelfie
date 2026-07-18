
const Book = require('../models/book.js')

const index = async (req, res) => {
  res.render('books/index.ejs')
}

const showNewForm = async (req, res) => {
  res.render('books/new.ejs')
}

const create = async (req, res) => {
  res.send('Add a book')
}

module.exports = {
  index,
  showNewForm,
  create,
}
