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
    genres: {
        type: Array,
        // enum: [],
    },
    image: {
        type: String,
        default: 'images/book-cover.jpg',
        // url: {
        //     type: String,
        //     required: true,
        //     default: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
        // },
        // publicId: {
        //     type: String,
        //     required: true,
        // },
    },
    status: {
        type: String, // want to read, currently reading, read, and DNF
        required: true,
    }, 
    ownershipStatus: {
        type: String,
        required: true,
    },
    rate: {
        type: Number, // 1-5 stars
        min: 1,
        max: 5,
    }, 
    review: {
        type: String, // rating message
        maxlength: 200,
    },
    isBorrowable: {
        type: Boolean,
        default: false,
    },
    isBorrowed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
