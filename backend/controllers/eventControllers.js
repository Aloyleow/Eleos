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

module.exports = router;
