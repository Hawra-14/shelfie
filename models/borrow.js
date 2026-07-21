const mongoose = require('mongoose')

const borrowSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    status: {
        type: String, // pending, rejected, borrowed, returned
        default: 'pending'
    },
    borrowDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
}, { timestamps: true })

const Borrow = mongoose.model('Borrow', borrowSchema)

module.exports = Borrow