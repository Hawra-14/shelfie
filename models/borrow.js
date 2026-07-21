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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String, // pending, rejected, borrowed, returned
        default: 'pending'
    },
    requestDate: {
        type: Date,
        required: true,
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