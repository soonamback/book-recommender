const express = require('express');
const bookController = require('./../controllers/bookController');
const booksJson = require('.././../public/books.json');
const scrapped = require('../scraping')
const router = express.Router();
const Book = require('../models/Book')

router.route('/')
.get(bookController.getAllBooks)
.post(bookController.createBook)

router.route('/cheaper-books')
.post(bookController.cheaperBooks)

router.route('/insert')
.post(bookController.insertBooks)

router.route('/fancy-books')
.post(bookController.fancyBooks)



module.exports = router;