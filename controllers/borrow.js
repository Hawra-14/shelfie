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

// on the borrowable show page, there should be a "form" --> just a button "Borrow"

module.exports = {
    index,
}