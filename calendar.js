const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const {credentials, calendarId} = require('./config/keys')

if(!calendarId) calendarId = "primary"

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, messageObj) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    return new Promise((resolve, reject) => {
        fs.readFile(TOKEN_PATH, async (err, token) => {
          if (err) {
          // if token not present
            try {
              // get a new token
              let accessToken = await getAccessToken(oAuth2Client, messageObj, reject);
              oAuth2Client.setCredentials(JSON.parse(accessToken));
              resolve(oAuth2Client);
            }
            catch (e) {
              reject(e)
            }
          }

          else {
            // else if token is present
            oAuth2Client.setCredentials(JSON.parse(token));
            resolve(oAuth2Client);
          }
        })
    })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getAccessToken(oAuth2Client, messageObj, reject) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  messageObj.channel.send(`Authorize the app by visiting the url ${authUrl}`)

  // console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

      return new Promise((resolve, reject) => {
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) reject(err)
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            // callback(oAuth2Client);
            resolve(token)
          });
        });
      })
 
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  return new Promise((resolve, reject) => {
      calendar.events.list({
          // calendarId: 'primary',          
          calendarId,
          timeMin: (new Date()).toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime',
          }, (err, res) => {
          if (err) reject('The API returned an error: ' + err)
          const events = res.data.items;

          if (events.length) {
            let eventString = 'Upcoming 10 events: \n'
            events.map((event, i) => {
              const start = event.start.dateTime || event.start.date;
              eventString+=`\n${i+1}. ${event.summary} - ${start}        (id: ${event.id})`
            });
            resolve(eventString)
          } 
          else {
            resolve("No upcoming event found")
          }
      });
    }
  )
}

function createEvent(auth, event){
  const calendar = google.calendar({version: 'v3', auth});
    
    return new Promise((resolve, reject) => {
      calendar.events.insert({
        auth: auth,
        calendarId,
        // calendarId: 'primary',
        resource: event,
      }, function(err, newEvent) {
        if (err) {
          reject(`There was an error contacting the Calendar service: ${err}`)
        }
        resolve(`Event created: ${newEvent.data.htmlLink}`);
      });
    }
  )
    
}


function deleteEvent(auth, id){
  const calendar = google.calendar({version: 'v3', auth});

    return new Promise((resolve, reject) => {
      calendar.events.delete({
        calendarId,
        // calendarId: 'primary',
        eventId: id
      }, function(err) {
        if (err) {
          reject(`There was an error contacting the Calendar service: ${err}`)
        }
        resolve(`Event deleted`);
      });
    }
  )
    
}










module.exports = {
  authorize,
  credentials,
  listEvents,
  createEvent,
  deleteEvent
}