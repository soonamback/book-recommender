const { next } = require('cheerio/lib/api/traversing');
const fs = require('fs');
const booksJson = require('.././../public/books.json');
const Book = require('.././models/Book');


exports.getAllBooks = (req, res, next) =>
{
 
   /* fs.readFile('./public/books.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });*/

    res.status(200).json({
       booksJson

    })
}

exports.createBook = async (req, res) =>
{
    try {
        const newBook = await Book.create(req.body)
        res.status(200).json({
            status: 'success',
            data: newBook
        })
    } catch (err) {
        throw err
    }
}

exports.cheaperBooks = (req, res) =>
{
        const price = req.body.price
        console.log(price)
        Book.find()
        .where('price').lt(price).then(books => res.status(200).json(books))
        .catch(err => res.status(404).json({ success: false }))
   
}  

        /*
        for(let price in booksJson){
            let prices = booksJson[price].price
            
            console.log(typeof prices)
        */    
          

          


//         // json.sort(function(a, b){
//     //return a.id - b.id;
// });

           
      
exports.insertBooks = (req, res) => {
   
    Book.insertMany(booksJson).then(function(){
        console.log("Data inserted")
        res.status(200)  
}).catch(function(error){
    console.log(error)     
    })
}





exports.fancyBooks = (req, res) =>
{
    const price = req.body.price
    Book.find()
    .where('price')
    .gte(price).then(books => res.status(200).json(books))
    .catch(err => res.status(404).json({ success: false}))
}