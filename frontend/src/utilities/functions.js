const sortEventsAsc = (array) => {
    return array.sort((a, b) => new Date(a.datentime).getTime() - new Date(b.datentime).getTime())
}

const sortEventsDec = (array) => {
    return array.sort((b, a) => new Date(a.datentime).getTime() - new Date(b.datentime).getTime())
}

export {
    sortEventsAsc,
    sortEventsDec
}