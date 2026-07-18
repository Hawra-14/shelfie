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
    image: {
        url: {
            type: String,
            required: true,
            default: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
        },
        publicId: {
            type: String,
            required: true,
        },
    },
    status: {
        type:String, // want to read, currently reading, read, and DNF
    }, 
    ownershipStatus: {
        type: String,
    },
    rate: {
        type: Number // 1-5 stars
    }, 
    review: {
        type: String, // rating message
    },
    isBorrowable: {
        type: Boolean,
    },
    isBorrowed: {
        type: Boolean,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
