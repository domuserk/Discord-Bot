const fs = require('fs')
const Discord = require('discord.js');

const { prefix, token } = require('../config/config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

class NakamotoBot {
    constructor() {
        this.init;
    }
} 

NakamotoBot.prototype.init = async (newAnime) =>  {
    client.on('ready', async () => {
        const idChannel = '849404264069595176'
        console.log('Bot Already!');
        const channel = await client.channels.fetch(idChannel);
        if(!newAnime) {
          return;
        }
        channel.send(newAnime);
    });
    client.login(token);
    await NakamotoBot.prototype.resetBot()
}

NakamotoBot.prototype.resetBot = async () => {
     await client.destroy()
     await client.login(token);
}

module.exports = { NakamotoBot }