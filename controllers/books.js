
const Book = require('../models/book.js')

const index = async (req, res) => {
  res.render('books/index.ejs')
}

const showNewForm = async (req, res) => {
  res.render('books/new.ejs')
}

const create = async (req, res) => {
  const listingData = {}

  listingData.price = req.body.price
  listingData.streetAddress = req.body.streetAddress
  listingData.city = req.body.city
  listingData.size = req.body.size
  listingData.owner = req.session.user._id
  res.send('Add a book')
}

module.exports = {
  index,
  showNewForm,
  create,
}
