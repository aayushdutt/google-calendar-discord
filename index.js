const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/keys.js')
const calendar = require('./calendar.js')



client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {
  console.log(message)
  if (message.content === '!ping') {
    let events = await calendar.ListEvents()
    message.channel.send(events);
    console.log(events)
  }
});


client.login(config.token);