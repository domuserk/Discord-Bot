const express = require('express');
const app = express();
const fs = require('fs')
const cors = require('cors');
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
app.use(cors());
app.use(express.json());


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

Nakamoto.prototype.isNewEpisode = async (episode = false) => {
  
}

Nakamoto.prototype.newAnimeAdded = async (newAnime = false) => {
  var stream = fs.createWriteStream("animes.txt");
  const test = JSON.stringify(newAnime)
  stream.once('open', function(fd) {
    stream.write(test.toString(),'\n');
    stream.write("My second row\n");
    stream.end();
  });
}

Nakamoto.prototype.initScrapping = async (nameAnime) => {

    const browser = await puppeteer.launch({ headless: true });

    browser.on('targetcreated', function(){
        console.log('New Tab Created');
    })

    const page = await browser.newPage();

    await page.goto('https://animesonline.cc/tv/');

    await page.waitForSelector('title');

    const title = await page.title();

    console.info(`The title is: ${title}`);

    await page.type('input[id="s"]', nameAnime)

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

    console.info(`The title is: ${name}`);

    const nameToDB = name.replace('Todos os Episodios Online - Animes Online', ' ')

    console.info(`The title is: ${nameToDB}`);
    
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
      this.newAnime = {
        name: nameToDB,
        value: true
      };
    }

    await Nakamoto.prototype.isNewEpisode(this.newEpisode)

    await Nakamoto.prototype.newAnimeAdded(this.newAnime)

    await page.screenshot({ path: 'animes.png' });

    await browser.close();
}

module.exports = { Nakamoto }


// app.listen(3000, () => {
//     console.log('working');
// })

   // const html = await page.$eval('.episodios', (e) => e.lastElementChild.outerHTML);
    // console.log(html)

  //  const values = await resultHandle.evaluateHandle(() =>   document.body)
     
    //  const newValues = await page.evaluateHandle(
    //     (body) => body.innerHTML,
    //     values
    //   );
    
    
    // console.log((await page.content('ul[class="episodios"]')))


    // let content = await pages[1].content()
    // console.log(content)

  
     //   const aHandle = await pages[1].evaluateHandle(() => document.body);
    // let jsonValue = await resultHandle.jsonValue();
    // const search
    // const word = await page.waitForSelector('input[name="keywords"]')

    // /*if(word != '' ) {
    //  console.log('aqui')
    //  await page.type('input[name="keywords"]')
    // }*/
    
    // await page.type('input[name="keywords"]', 'Desenvolvedor')

    // await page.click('button[data-searchbar-type="JOBS"]');
    
    // await page.click('a[class="nav__button-secondary"]');
    // const email = await page.type('input[id="username"]', process.env.EMAIL)
    // const password = await page.type('input[id="password"]', process.env.PASSWORD)
    // const errorPassword = await page.type('input[id="password"]')
   
    // await page.waitForSelector('input[id = "username"]', {
    //     visible: true,
    // });
    // await page.waitForSelector('input[id="password"]', {
    //     visible: true,
    // });

    // if (email != process.env.EMAIL || password != process.env.PASSWORD) {
    //     console.log('aqui')
    //     await page.type('input[id="username"]', '')
    //     await page.type('input[id="password"]', '')
    // }

    // await page.click('button[class="btn__primary--large from__button--floating"]');
    
    // await page.waitForSelector('button[class="btn__secondary--large-muted"]', {
    //     visible: true,
    // });

    // await page.click('button[class="btn__secondary--large-muted"]');
  
    // await page.waitForSelector('button[data-searchbar-type="JOBS"]', {
    //     visible: true,
    // });

  