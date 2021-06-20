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

NakamotoBot.prototype.init = (newAnime) =>  {

    client.once('ready', () => {
        console.log('Bot Already!');
    });

    client.on('message', message => {

        if(message.author.id === client.user.id) return

        message.channel.send(newAnime)
       
    });

 client.login(token)
}

module.exports = { NakamotoBot }