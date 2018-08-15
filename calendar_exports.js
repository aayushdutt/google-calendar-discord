var convertTime = require('convert-time')

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

async function handleCreateEvent(contents) {
    eventObject = {
        date: "",
        time: "",
        endtime: "",
        name: ""
    }

    contents.forEach(string => {      
        if(string.startsWith("name:")) {
            eventObject.name = string.substring(5);
        }

        if(string.startsWith("date:")) {
            eventObject.date = string.substring(5);
        }

        if(string.startsWith("time:")) {
            let timePM = string.substring(5);
            let timeConverted = convertTime(timePM)
            eventObject.time = timeConverted
        }

        if(string.startsWith("endtime:")) {
            let timePM = string.substring(8);
            let timeConverted = convertTime(timePM)
            eventObject.time = timeConverted
        }
        
        return
    });

    console.log(JSON.stringify(eventObject))
}

module.exports = {
    ListEvents,
    CreateEvent,
    handleCreateEvent
}