const fs = require('fs')
const Discord = require('discord.js');

const { prefix, token } = require('../config/config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const { MessageEmbed } = require('discord.js');

class NakamotoBot {
    constructor() {
        this.init;
    }
} 

NakamotoBot.prototype.init = async (newAnime, newEpisodeUrl) =>  {
    client.on('ready', async () => {
        const idChannel = '849404264069595176'
        console.log('Bot Already!');
        const channel = await client.channels.fetch(idChannel);

        if(newEpisodeUrl) {
            const embeddLink = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(newAnime)
            .setURL(newEpisodeUrl)
            .addFields(
                { name: `Novo episódio de ${newAnime}`},
            )
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter('By Ryan G. Lopes', 'https://i.imgur.com/rM6VcQW.jpg');

            channel.send(embeddLink);
        }
    });
    client.login(token);
    await NakamotoBot.prototype.resetBot()
}

NakamotoBot.prototype.resetBot = async () => {
     await client.destroy()
     await client.login(token);
}

module.exports = { NakamotoBot }