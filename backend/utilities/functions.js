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

module.exports = {
    filterEventsFutureDate,
    filterEventsPastDate,
    checkInputFilled
}
