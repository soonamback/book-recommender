const axios = require('axios')
const promises = [];

for(let page = 0; page <= 5; page ++){
     promises.push(
          axios({method: "get",url:`https://books.toscrape.com/catalogue/category/books_1/page-${page}.html`})
          .then(res => {

              console.log('scrpped');
          })
     );
}


Promise.all(promises).then(res)
