require("dotenv").config();
const express = require("express");
const Pool = require("pg").Pool;
const morgan = require("morgan");
const cors = require("cors");

const port = process.env.PORT
const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
})

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM test");
    res.json(result.rows)
})

app.listen(port, () =>{
    console.log(`Eleos listening on port ${port}`)
})
