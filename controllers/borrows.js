const Borrow = require('../models/borrow.js')
const Book = require('../models/book.js')

const index = async (req, res) => {
  let allToBorrows = await Book.find({ isBorrowable: true }).populate('owner')
  console.log(allToBorrows)

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
  const borrowData = {}
  
  borrowData.userId = req.session.user._id
  borrowData.bookId = req.params.borrowId
  borrowData.status = 'pending'
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