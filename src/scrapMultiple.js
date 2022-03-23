const axios = require('axios')
const promises = [];

for(let page = 0; page <= 5; page ++){
     promises.push(
          axios({method: "get",url:`https://books.toscrape.com/catalogue/category/books_1/page-${page}.html`})
          .then(res => {
              // Parse your result with Cheerio or whatever you like
              console.log('scrpped');
          })
     );
}

// You can pass the responses on this resolve if you want.
Promise.all(promises).then(res)
