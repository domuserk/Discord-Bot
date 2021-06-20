const express = require('express');
const app = express();
const cors = require('cors');
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const fs = require('fs');
app.use(cors());
app.use(express.json());
const { Nakamoto, data } = require('./scrapping')
const { NakamotoBot } = require('./bot')

const nakamotoInit = new Nakamoto()

const nakamotoBotInit = new NakamotoBot()


app.post('/animes-name', async(req, res) => {
    const { name } = req.body;
    if(name) {
      const nakamotoScrappingInit = await nakamotoInit.initScrapping(name)
      fs.readFile('animes.txt', 'utf8', async(err, data) => {
        if (err) {
          console.log(err);
        }
        const botNewAnime = await nakamotoBotInit.init(data)
      })
    }
    res.send()
})

app.listen(process.env.PORT || 5000, () => console.log('working'))