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
      let events = await ListEvents(message)
      message.channel.send(events);
    }

  // Create new event
    if (message.content.startsWith('!create-event')) {
      let contents = message.content.split(" ");    
      try {
        var eventLink =  await handleCreateEvent(contents, message)
      } catch (e) {
        var eventLink = e;
      }
      message.channel.send(eventLink);
    }

});


client.login(config.token);