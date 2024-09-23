
const filterEventsFutureDate = (event) => {
    let filteredEvents = []
    for (const obj of event) {
        const checkDate = new Date(obj.datentime).getTime()
        console.log(checkDate, Date.now())
        if (checkDate > Date.now()) {
            filteredEvents.push(obj)
        }
    }
    return filteredEvents    
}

module.exports = {
    filterEventsFutureDate
}
