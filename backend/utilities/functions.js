const filterEventsFutureDate = (event) => {
    let filteredEvents = []
    for (const obj of event) {
        const checkDate = new Date(obj.datentime).getTime()
       
        if (checkDate > Date.now()) {
            filteredEvents.push(obj)
        }
    }
    return filteredEvents    
}

const filterEventsPastDate = (event) => {
    let filteredEvents = []
    for (const obj of event) {
        const checkDate = new Date(obj.datentime).getTime()
        
        if (checkDate < Date.now()) {
            filteredEvents.push(obj)
        }
    }
    return filteredEvents    
}

const checkInputFilled = (array) => {
    for (let i = 0; i < array.length; i ++) {
      if (array[i].trim() === "") {
        throw new Error(`Input undefined at ${i}`)
      }
    }
  }

const checkEventDateIsValid = (date) => {
    const checkDate = new Date(date).getTime()
    if (checkDate < Date.now()) {
        throw new Error("Date must be valid")
    }
}

const checkAttendeesCount = (count) => {
    if (count < 1 || null){
        throw new Error("Attendees must not be 0")
    }
}

module.exports = {
    filterEventsFutureDate,
    filterEventsPastDate,
    checkInputFilled,
    checkEventDateIsValid,
    checkAttendeesCount
}
