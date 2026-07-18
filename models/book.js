const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type:String, // want to read, currently reading, read, and DNF
    }, 
    ownershipStatus: {
        type: Array,
    },
    rate: {
        type: Number // 1-5 stars
    }, 
    review: {
        type: String, // rating message
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
