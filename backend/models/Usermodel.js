const {Pool} = require("pg")
const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
})

