// Initialize dotenv
require('dotenv').config();
const emojiRegex = require('emoji-regex');

// Discord.js versions ^13.0 require us to explicitly define client intents
const { Client, Collections, IntentsBitfield, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
        
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//const channelID = 1318652911294615612;
const regex = emojiRegex();

client.on('messageCreate', msg => {
    // You can view the msg object here with console.log(msg)
    var messageContent = msg.content;
    
    //My "bot-data" channel, which stores the data in a channel for later use.
    const channel = client.channels.cache.get('1318678940919005284');
    
    //Don't track bots with this 
    if(msg.author.bot) {
        return;
    }
        
    if(channel){
        var messageLength = messageContent.length;
        
        var emojiMessage = '';
        for (const match of messageContent.matchAll(regex)) {
            const emoji = match[0];
            emojiMessage += emoji;
            //console.log(`Matched sequence ${ emoji } — code points: ${ [...emoji].length }`);
        }
        if(emojiMessage.length > 0){
            emojiMessage = msg.author.username + ':' + emojiMessage;
            channel.send(emojiMessage);
        }
        
    }else{
        console.log('Failed to find channel');
    }
});

// Log In our bot
client.login(process.env.CLIENT_TOKEN);
