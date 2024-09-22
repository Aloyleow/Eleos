require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token");

const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
});

router.get("/viewall", async (req, res) => {
    const query = "SELECT * FROM events"
    try {
        const event = (await pool.query(query)).rows;
        res.status(201).json({ event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
})

router.use(verifyToken);

router.get("/:eventid", async (req, res) => {
    const query = "SELECT * FROM events WHERE eventsid = $1"
    try {
        const event = (await pool.query(query, [req.params.eventid])).rows;
        res.status(201).json({ event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
})

module.exports = router