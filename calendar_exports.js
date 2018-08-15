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
            
            eventObject.endtime = timeConverted
        }
    });
    let dateSplitted = eventObject.date.split('/')
    let startTimeSplitted = eventObject.time.split(':')
    let endTimeSplitted = eventObject.endtime.split(':')
    
    let startDate = new Date(dateSplitted[2], dateSplitted[1] - 1, dateSplitted[0], startTimeSplitted[0], startTimeSplitted[1])
    let endDate = new Date(dateSplitted[2], dateSplitted[1] - 1, dateSplitted[0], endTimeSplitted[0], endTimeSplitted[1])

    let eventDetails = {
        sumarry: eventObject.name,
        start: {
            dateTime: startDate
        },
        end: {
            dateTime: endDate
        }
    }

}

module.exports = {
    ListEvents,
    CreateEvent,
    handleCreateEvent
}