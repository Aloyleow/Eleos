require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token");

const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
});

router.use(verifyToken);

router.post("/create", async (req, res) => {
    const query = `
    INSERT INTO events (eventname, type, datentime, location, country, comments, attendees, hostsid)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `;
    const input = {
        eventname: req.body.eventname,
        type: req.body.type,
        datentime: req.body.datentime,
        location: req.body.location,
        country: req.body.country,
        comments: req.body.comments,
        attendees: req.body.attendees,
        hostsid: req.user.id
    };
    const inputArray = [
        input.eventname,
        input.type,
        input.datentime,
        input.location,
        input.country,
        input.comments,
        input.attendees,
        input.hostsid
    ];
    try {
        const event = (await pool.query(query, inputArray)).rows;
        res.status(201).json({ event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

router.put("/update/:eventsid", async (req, res) => {
    const query = `
    UPDATE events
    SET eventname = $1, type = $2, datentime = $3, location = $4, country = $5, comments = $6, attendees = $7
    WHERE eventsid = $9 AND hostsid = $8
    `;
    const queryUpdate = "SELECT * FROM events WHERE eventsid = $1"
    const input = {
        eventname: req.body.eventname,
        type: req.body.type,
        datentime: req.body.datentime,
        location: req.body.location,
        country: req.body.country,
        comments: req.body.comments,
        attendees: req.body.attendees,
        hostsid: req.user.id,
    };
    const inputArray = [
        input.eventname,
        input.type,
        input.datentime,
        input.location,
        input.country,
        input.comments,
        input.attendees,
        input.hostsid,
        req.params.eventsid
    ];
    try {
        await pool.query(query, inputArray);
        const event = await pool.query(queryUpdate, [req.params.eventsid])
        res.status(201).json( event.rows );
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
})

module.exports = router;
