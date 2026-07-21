
const Book = require('../models/book.js')
const Borrow = require('../models/borrow.js')

const index = async (req, res) => {
  const myBooks = await Book.find({ owner: req.session.user._id }).populate('owner')

  res.render('books/index.ejs', {
    myBooks,
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
  const foundBorrow = await Borrow.find({ bookId: req.params.bookId }).populate('userId')
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
  })
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

const deleteBook = async (req, res) => {
  const foundBook = await Book.findById(req.params.bookId)

  if (foundBook.owner.equals(req.session.user._id)) {
    await Book.findByIdAndDelete(req.params.bookId)
    res.redirect('/books')
  } else {
    res.send("You can't delete this book")
  }
}

const showMyBorrows = async (req, res) => {
  // find all books that belong to me AND have a borrow status of pending
  const borrowRequest = await Borrow.find({ owner: req.session.user._id, status: 'pending' }).populate('userId').populate('bookId')
  console.log(borrowRequest)
  res.render('dashboard.ejs', {
    user: req.session.user,
    borrowRequest,
  })
  // .toDateString()
}

const accept = async (req, res) => {
  const borrowBook = await Borrow.findByIdAndUpdate(req.params.bookId)
  const borrowData = {}

  borrowData.userId = req.session.user._id
  borrowData.bookId = req.params.bookId
  borrowData.owner = borrowBook.owner
  borrowData.status = 'accept'

  await borrowBook.save()
  await Borrow.findByIdAndUpdate(req.params.bookId, borrowData, { new: true })
  res.redirect('/dashboard')
}

module.exports = {
  index,
  showNewForm,
  create,
  show,
  edit,
  update,
  deleteBook,
  showMyBorrows,
  accept,
}
