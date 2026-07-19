const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookId: [{ // [{}] array of objects
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    }],
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist