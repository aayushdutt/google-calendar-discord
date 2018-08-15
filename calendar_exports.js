// Load client secrets from a local file.
const {authorize, listEvents, credentials} = require('./calendar.js') 

let auth;

async function ListEvents() {
    if(!auth) {
        auth = await authorize(credentials)
    }

    let events = await listEvents(auth)
    return events
}


module.exports = {
    ListEvents
}