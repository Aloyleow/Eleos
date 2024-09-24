require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token");
const { filterEventsFutureDate, filterEventsPastDate } =require("../utilities/functions")

const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
});

router.use(verifyToken);

router.post("/create", async (req, res) => {
    const query = `
    INSERT INTO events (eventname, type, datentime, location, country, comments, attendees, hostsid, image)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `;
    const input = [
        req.body.eventname,
        req.body.type,
        req.body.datentime,
        req.body.location,
        req.body.country,
        req.body.comments,
        req.body.attendees,
        req.human.id,
        req.body.image,
    ];
    try {
        const event = (await pool.query(query, input)).rows;
        res.status(201).json({ event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

router.put("/update/:eventsid", async (req, res) => {
    const query = `
    UPDATE events
    SET eventname = $1, type = $2, datentime = $3, location = $4, country = $5, comments = $6, attendees = $7, image =$8
    WHERE eventsid = $9 AND hostsid = $8
    `;
    const queryUpdate = "SELECT * FROM events WHERE eventsid = $1"
    const input = [
        req.body.eventname,
        req.body.type,
        req.body.datentime,
        req.body.location,
        req.body.country,
        req.body.comments,
        req.body.attendees,
        req.human.id,
        req.params.eventsid
    ];
    try {
        await pool.query(query, input);
        const event = await pool.query(queryUpdate, [req.params.eventsid])
        res.status(201).json( event.rows );
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
})

router.get("/hostevents", async (req, res) => {
    const query = "SELECT * FROM events WHERE hostsid = $1"
    try {
        const event = (await pool.query(query, [req.human.id])).rows;
        const checkedEvent = filterEventsFutureDate(event)
        res.status(201).json({ checkedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };

})

router.get("/hostevents/history", async (req, res) => {
    const query = "SELECT * FROM events WHERE hostsid = $1"
    try {
        const event = (await pool.query(query, [req.human.id])).rows;
        const checkedEventsHistory = filterEventsPastDate(event)
        res.status(201).json({ checkedEventsHistory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };

})

router.delete("/hostevents/:eventsid", async (req, res) => {
    const query = "DELETE FROM events WHERE eventsid = $1"
    try {
        const event = (await pool.query(query, [req.params.eventsid])).rows;
        res.status(201).json({ event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };

})

module.exports = router