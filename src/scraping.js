const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios')
const { db } = require('./models/User')
const Book = require('../src/models/Book')




  const API = `https://books.toscrape.com/catalogue/category/books_1/page-3.html`



const scrapeSite = async () => {
  try {
    const { data } = await axios.get(API)
    const $ = cheerio.load(data)

    const bookCollection = $('.row li .product_pod, .image_container img')
    console.log(bookCollection)

    const bookItem = []
    /*
    const imageAttr = $('.image_container img').attr();
    const imageUrl = (imageAttr === undefined) ? null : imageAttr.src;
    console.log('image:' ,imageUrl);
   */
    
    bookCollection.each((index, el) => {
      const BOOK = { title: '', price: '', image: '' }  

      BOOK.title = $(el).children('h3').text()
      BOOK.price = $(el)
        .children('.product_price')
        .children('p.price_color')
        .text()
      BOOK.image = $(el).children('.image_container').find('img').attr('src');

      bookItem.push(BOOK)
    })

    console.log(bookItem)

    
    // db.books.insertMany(bookItem)

    fs.writeFile('books.json', JSON.stringify(bookItem, null, 2), (error) => {
      if (error) {
        console.log(error)
        return
      }
      console.log('Website data has been scrapped.')
    })
  } catch (e) {
    console.error(e)
  } 
  }

    


//scrapeSite()