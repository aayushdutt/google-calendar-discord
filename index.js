const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/keys.js')

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
  console.log(message)
  if (message.content === '!ping') {
    message.channel.send('Pong.');
  }
});


client.login(config.token);