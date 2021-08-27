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

class InitHome {
  constructor() {
    this.value;
  }
}



this.value = async () => {
  try {
    var counter = 0;
    const animeName = animes.forEach(async (anime) => {
     await nakamotoInit.initScrapping(anime.name)
     counter++
     if(counter == 3) {
       await Promisse()
     }
   });
   
  } catch(err) {
    console.log(err)
  }
}

const Promisse = async () => {
    fs.readFile('restartCommand.txt', 'utf8', async (err, data) => {
      const value = data.toLowerCase();
      const newValue = value.toString();
      if (newValue == 'false') {
        this.value();

      }
      if (err) {
        console.log(err);
      }
    })
}
 

app.get('/' , async (req, res) => {
   try {
    const animeName = animes.forEach(async (anime) => {
    await nakamotoInit.initScrapping(anime.name)
   });
    res.send()
   }catch(err) {
    console.log('errorGet', err)
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

app.listen(process.env.PORT || 3000, () => console.log('working'))