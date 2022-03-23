const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: [true, 'A Book must have a name']
    },
    price: {
        type: Number,
        //required: [true, 'A Book must have a price']
    },
    image: String,
    createdAt : {
        type: Date,
        default: Date.now()
    }
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;