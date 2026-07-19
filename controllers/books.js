
const Book = require('../models/book.js')
const Borrow = require('../models/borrow.js')

const index = async (req, res) => {
  let allBooks = await Book.find().populate('owner')

  console.log(allBooks)
  res.render('books/index.ejs', {
    allBooks,
  })
}

const showNewForm = async (req, res) => {
  res.render('books/new.ejs')
}

const create = async (req, res) => {
  const bookData = {}

  bookData.title = req.body.title
  bookData.author = req.body.author
  bookData.description = req.body.description
  bookData.genres = req.body.genres
  bookData.status = req.body.status
  bookData.ownershipStatus = req.body.ownershipStatus
  bookData.rate = req.body.rate
  bookData.review = req.body.review

  if (req.body.isBorrowable === 'on') {
    bookData.isBorrowable = true
  } else {
    bookData.isBorrowable = false
  }

  // if (req.body.isBorrowed === 'on') {
  //   bookData.isBorrowed = true
  // } else {
  //   bookData.isBorrowed = false
  // }

  bookData.owner = req.session.user._id

  let createdBook = await Book.create(bookData)

  res.redirect('/books')
}

const show = async (req, res) => {
  const foundBook = await Book.findById(req.params.bookId).populate('owner')
  const foundBorrow = await Borrow.findById(req.params.bookId)
  console.log(foundBorrow, "foundBorrow");

  res.render('books/show.ejs', {
    foundBook,
    foundBorrow,
  })
}

const edit = async (req, res) => {
  const foundBook = await Book.findById(req.params.bookId)
  res.render('books/edit.ejs', {
    foundBook,
  }
  )
}

const update = async (req, res) => {
  const foundBook = await Book.findByIdAndUpdate(req.params.bookId)
  const bookData = {}

  bookData.title = req.body.title
  bookData.author = req.body.author
  bookData.description = req.body.description
  bookData.genres = req.body.genres
  bookData.status = req.body.status
  bookData.ownershipStatus = req.body.ownershipStatus
  bookData.rate = req.body.rate
  bookData.review = req.body.review

  if (req.body.isBorrowable === 'on') {
    bookData.isBorrowable = true
  } else {
    bookData.isBorrowable = false
  }

  // if (req.body.isBorrowed === 'on') {
  //   bookData.isBorrowed = true
  // } else {
  //   bookData.isBorrowed = false
  // }

  bookData.owner = req.session.user._id

  await foundBook.save()
  await Book.findByIdAndUpdate(req.params.bookId, bookData, { new: true })

  res.redirect(`/books/${req.params.bookId}`)
}

module.exports = {
  index,
  showNewForm,
  create,
  show,
  edit,
  update,
}
