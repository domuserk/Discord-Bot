const express = require('express');
const app = express();
const fs = require('fs')
const cors = require('cors');
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
app.use(cors());
app.use(express.json());

const { NakamotoBot } = require('./bot')

const nakamotoBotInit = new NakamotoBot()

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

dotenv.config();


const firebaseConfig = {
  apiKey: "AIzaSyBASXvT4y_NUtWhQPmyU2bC191RFkE1uOY",
  authDomain: "satoshi-92568.firebaseapp.com",
  projectId: "satoshi-92568",
  databaseURL: "https://satoshi-92568-default-rtdb.firebaseio.com/",
  storageBucket: "satoshi-92568.appspot.com",
  messagingSenderId: "192303609543",
  appId: "1:192303609543:web:13b26af159b3889ef8f0e2",
  measurementId: "G-4WXT63JKM4"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();



class Nakamoto {
  constructor() {
    this.data;
    this.episodesSize;
    this.nameDb;
    this.loading = false;
    this.newEpisode = false;
    this.newAnime = false;
  }
  
}

Nakamoto.prototype.CreateAnime = async (episodes,name)  => {
  firebase.database().ref(`${name}` + 1).set({
   episodes: episodes,
   nameDb: name
  });
}

Nakamoto.prototype.getEpisodes = async (nameAnime = 'Boku no Hero Academia') => {
  const ep =  firebase.database().ref(`${nameAnime}` + 1);
  const value = await ep.once('value').then(function (snapshot) {
    return snapshot.val();
}); 
  this.data = value;
}

Nakamoto.prototype.HasSomeOneNew = async (episode = false, newAnime = false) => {
  
}


Nakamoto.prototype.initScrapping = async (nameAnime) => {

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

    const page = await browser.newPage();

    await page.goto('https://animesonline.cc/tv/', {timeout: 60000, waitUntil: 'domcontentloaded'});
 
    await page.waitForSelector('title');

    const title = await page.title();

    await page.waitForSelector('input[id="s"]', {
      visible: true,
      timeout: 60000
    });

    await page.type('input[id="s"]', nameAnime)
  
    await page.waitForSelector('button[class="search-button"]', {
      visible: true,
      timeout: 60000
    });

    let click = await page.click('button[class="search-button"]')

    let pages = await browser.pages();

    const pageToFront = await pages[1].bringToFront()
    

    await page.waitForSelector('div[class="poster"]', {
        visible: true,
    });
    
    await page.click('div[class="poster"]')

    await page.waitForSelector('div[id="seasons"]', {
        visible: true,
    });

    let content = await pages[1].content()

    const aHandle = await page.evaluateHandle(() => 
      document.getElementById("seasons").lastElementChild
      
    );

    const resultHandle = await page.evaluateHandle(
      (body) => body.innerHTML,
      aHandle
    );

    const result = await resultHandle.jsonValue();

  
    await resultHandle.dispose();

    const episodes = await page.evaluate(() => Array.from(document.querySelectorAll('.se-c'), element => element.textContent));
   
    const name = await page.title()

    const nameToDB = name.replace('Todos os Episodios Online - Animes Online', ' ')

    
    for(let i = 0; i < episodes.length; i++) {
      this.episodesSize =  episodes[i]
    }
    
    const test1 =  await Nakamoto.prototype.getEpisodes(nameToDB)

    const dataToString = JSON.stringify(this.data)

    const episodesSize = {
      "episodes": this.episodesSize
    }
  
    if(this.data){
      if(this.data['episodes'].length < this.episodesSize.length) {
        await Nakamoto.prototype.CreateAnime(this.episodesSize,  nameToDB)
        this.newEpisode = true;
      }
    }

    if(!this.data){
      await Nakamoto.prototype.CreateAnime(this.episodesSize,  nameToDB)
      this.newAnime = nameToDB
    }

    const NewAnime = await nakamotoBotInit.init(this.newAnime)

    await page.screenshot({ path: 'animes.png' });

    await browser.close();
}

module.exports = { Nakamoto }

