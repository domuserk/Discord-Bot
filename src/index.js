const express = require('express');
const app = express();
const cors = require('cors');
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
app.use(cors());
app.use(express.json());
const { Nakamoto } = require('./scrapping')
const { NakamotoBot } = require('./bot')

const nakamotoInit = new Nakamoto()

const nakamotoBotInit = new NakamotoBot()


app.post('/animes-name', async(req, res) => {
    const { name } = req.body;
    if(name) {
      const nakamotoScrappingInit = await nakamotoInit.initScrapping(name)
      const newEpisode = await nakamotoInit.isNewEpisode()
      const newAnime = await nakamotoInit.newAnimeAdded()
      console.log(newEpisode)
      const botNewAnime = await nakamotoBotInit.init(newEpisode, newAnime)
    }
    res.send()
})

app.listen(4000, () => console.log('working'))