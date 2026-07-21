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
  // const borrowed = await Borrow.find()

  res.render('to-borrow/show.ejs', {
    foundBorrow,
  })
}

// on the borrowable show page, there should be a "form" --> just a button "Borrow"
const borrow = async (req, res) => {
let foundBook = await Book.findById(req.params.borrowId)
console.log(foundBook.owner)

  const borrowData = {}
  
  borrowData.userId = req.session.user._id
  borrowData.bookId = req.params.borrowId
  borrowData.owner = foundBook.owner
  borrowData.status = 'pending'
  borrowData.requestDate = new Date()
  // borrowData.borrowDate = req.body.borrowDate
  // borrowData.returnDate = req.body.returnDate
  
  const createdBorrow = await Borrow.create(borrowData)
  res.redirect(`/to-borrow/${req.params.borrowId}`)
}

module.exports = {
  index,
  show,
  borrow,
}