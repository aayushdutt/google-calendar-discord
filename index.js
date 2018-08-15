const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/keys.js')
const {ListEvents, handleCreateEvent} = require('./calendar_exports.js')



client.on('ready', () => {
    console.log('Ready!');
});

//Check bot ping
client.on('message', async message => {
  if (message.content === '!ping') {
    message.channel.send("pong");
  }

// List events
  if (message.content === '!list-events') {
    let events = await ListEvents()
    message.channel.send(events);
  }

// Create new event
  if (message.content.startsWith('!create-event')) {
    let contents = message.content.split(" ");
    console.log(contents)
    let eventLink = await handleCreateEvent(contents)
    // let newEvent = await CreateEvent()
    message.channel.send(eventLink);
  }

});


client.login(config.token);