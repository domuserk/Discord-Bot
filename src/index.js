const express = require('express');
const app = express();

const cors = require('cors');

const animes = require('../listAnimes.json')

const puppeteer = require('puppeteer');

const dotenv = require('dotenv');

const fs = require('fs');

const { Nakamoto, data } = require('./scrapping')
const { NakamotoBot } = require('./bot')

const nakamotoInit = new Nakamoto()

const nakamotoBotInit = new NakamotoBot()

app.use(cors());
app.use(express.json());

app.get('/' , async (req, res) => {
  try {
    const animeName = animes.forEach(async (anime) => {
      await nakamotoInit.initScrapping(anime.name)
     });
  
     fs.readFile('animes.txt', 'utf8', async(err, data) => {
      if (err) {
       console.log(err);
      }
       const NewAnime = nakamotoBotInit.init(data)
     })
    res.send()
  }catch(err) {
    console.log(err)
  }
})


app.post('/animes-name', async(req, res) => {
    const { name } = req.body;
    try{
      if(name) {
        const nakamotoScrappingInit = await nakamotoInit.initScrapping(name)
        fs.readFile('animes.txt', 'utf8', async(err, data) => {
          if (err) {
            console.log(err);
          }
          const botNewAnime = nakamotoBotInit.init(data)
        })
        res.send()
      }
    }catch(err) {
      console.log(err)
      res.status(404).send()
    }
    
})

app.listen(process.env.PORT || 5000, () => console.log('working'))