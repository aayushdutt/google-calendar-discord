# Discord Calendar Bot

`discord-calendar-bot` A Node (Discord.js) based Discord bot for managing Google Calendar Events directly from Discord.

### Prerequisites:

* Node.js and NPM

### Install

* Clone the repository.
* `npm install` : Install the dependencies

### Config
* Follow this guide to create a Discord Bot [Creating a Discord Bot and getting a Token](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
* Inside `/config/` create a new file `keys_dev.js` export and fill the following properties:
    ```js
    module.exports = {
        "token": "",
        "calendarId": "",
        "credentials": {
            "installed": {
            "client_id": "",
            "project_id": "",
            "auth_uri": "",
            "token_uri": "",
            "auth_provider_x509_cert_url": "",
            "client_secret": "",
            "redirect_uris": ["", ""]
            }
        }
    }
    ```

### Run the Bot Server:

* `npm start`

____

* The general prefix for the bot commands is `!`.

## Commands

* `!ping` : Tests if the bot is onboard. Bot replies `pong`.

### Listing Events:

* `!list-events` : Lists the upcoming 10 events (along with it's ID).

### Deleting and Event by ID:

* `!remove-event _eventID_` : Removes an event with eventID as it's ID.
* Alias: `!delete-event`

### Creating a new Event:

* `!create-event name:_eventName_ date:_eventDate_ time:_eventStartTime_ endtime:_eventEndTime_`

* Parameters: `name`, `date`, `time`, `endtime`.
* `name` : Takes in the event name in a string without spaces.
* `date` : Takes in event date in dd/mm/yyyy format.
* `time` and `endtime` : Takes time in 12h format.
* Example `!create-event name:WebWorkshop date:20/10/2018 time:6PM endtime:9PM` 

### Authenticating your calendar: 

* To connect your own Google Calendar with the bot, just type the command `!list-events` once.
* The bot will come up with an auth link, follow the link to get an Auth Token.
* Now use `!token-key _retrievedTokenKey_` to connect and authenticate your calendar.

#### Example: 
![Calendar Auth Example](https://cdn.discordapp.com/attachments/446756980414218253/503003185254760448/unknown.png "Calendar Auth Example")
