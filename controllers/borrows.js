const Borrow = require('../models/borrow.js')
const Book = require('../models/book.js')

const index = async (req, res) => {
  let allToBorrows = await Book.find({ isBorrowable: true }).populate('owner')

  // the index page it renders should display each book with a link to a show page
  res.render('to-borrow/index.ejs', {
    allToBorrows,
  })
}

const show = async (req, res) => {
  const foundBorrow = await Book.findById(req.params.bookId).populate('owner')
  const user = req.session.user

  const userBorrow = user
    ? await Borrow.findOne({
      bookId: req.params.bookId,
      userId: user._id,
    })
      .sort({ createdAt: -1 })
      .populate('userId')
    : null

  if (user && foundBorrow.owner.equals(user._id)) {
    return res.redirect('/books')
  }

  res.render('to-borrow/show.ejs', {
    foundBorrow,
    userBorrow,
  })
}

// on the borrowable show page, there should be a "form" --> just a button "Borrow"
const borrow = async (req, res) => {
  let foundBook = await Book.findById(req.params.borrowId)
  // console.log(foundBook.owner)

  const borrowData = {}

  borrowData.userId = req.session.user._id
  borrowData.bookId = req.params.borrowId
  borrowData.owner = foundBook.owner
  borrowData.status = 'pending'
  borrowData.requestDate = new Date()

  const createdBorrow = await Borrow.create(borrowData)
  res.redirect(`/to-borrow/${req.params.borrowId}`)
}

const returnBook = async (req, res) => {
  await Borrow.findOneAndUpdate(
    { bookId: req.params.bookId, userId: req.session.user._id, status: 'borrowed' },
    { status: 'returned', returnDate: new Date() }
  )
  await Book.findByIdAndUpdate(req.params.bookId, { isBorrowed: false })

  if (req.get('Referer') && req.get('Referer').includes('/borrowed')) { // Reads the URL before the form was submitted 
    return res.redirect('/borrowed')
  }

  res.redirect(`/to-borrow/${req.params.bookId}`)
}

const borrowed = async (req, res) => {
  const myBorrowed = await Borrow.find({
    userId: req.session.user._id,
    status: { $in: ['borrowed', 'returned'] }, // match if the field's value is one of these options (OR)
  }).populate('bookId').populate('owner')

  res.render('borrowed/index.ejs', {
    myBorrowed,
  })
}

module.exports = {
  index,
  show,
  borrow,
  returnBook,
  borrowed,
}