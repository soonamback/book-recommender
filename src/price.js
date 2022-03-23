const data = require('../public/books.json');
const fs = require('fs');
const newData = data.map(element => {
   // const [title, price, image ] = element
    console.log(element.price);

    const title = element.title
    const price = element.price
    const image = element.image
     return {
         title,
         price: parseInt(price),
         image
        
     }
    

 
})
console.log(newData)
 

 fs.writeFile('/Users/user/Desktop/DCI-tasks/backend/book-recommender/public/books6.json', JSON.stringify(newData) , function (err) {
 //      //if (err) throw err;
   });