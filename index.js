const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/keys.js')
const {ListEvents, handleCreateEvent, DeleteEvent} = require('./calendar_exports.js')



client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {
  //Check bot ping
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

  // Delete event
    if (message.content.startsWith('!remove-event' || '!delete-event')) {
      let deleteMessage = await DeleteEvent(message.content, message)
      message.channel.send(deleteMessage);
    }

});


client.login(config.token);