const axios = require('axios');
const cheerio = require('cheerio');

axios('http://books.toscrape.com/')
  .then((response) => {
    const $ = cheerio.load(response.data);
    const firstUrl = $('body').find('img').attr('src')
    console.log(firstUrl)
    firstUrl.save()

  })
  .catch(() => console.log('something went wrong!'))