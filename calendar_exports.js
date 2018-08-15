// Load client secrets from a local file.
const {authorize, listEvents, credentials, createEvent} = require('./calendar.js') 

let auth;

async function ListEvents() {
    if(!auth) {
        auth = await authorize(credentials)
    }
    let events = await listEvents(auth)   
    return events
}

async function CreateEvent() {
    if(!auth) {
        auth = await authorize(credentials)
    }
    let createdEvent = await createEvent(auth)
    return createdEvent
}

CreateEvent()
.then( res => console.log(res))
.catch(err => console.log(err))

// ListEvents()
// .then(res => console.log(res))
// .catch(err => console.log(err))



module.exports = {
    ListEvents,
    CreateEvent
}