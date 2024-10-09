const checkInputFilled = (array) => {
  for (let i = 0; i < array.length; i ++) {
    if (array[i] === "") {
      throw new Error(`Input undefined at ${i}`)
    }
  }
}

const x = ["r","2","e","r","t",""]
console.log([x[2]])
