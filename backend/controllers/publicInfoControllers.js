require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token");
const { filterEventsFutureDate } = require("../utilities/functions")

const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
});

router.get("/test", async (req, res) => {
    const query = ` 
    SELECT email 
      FROM users u
      RIGHT JOIN user_attendings ua on u.usersid = ua.usersid
      WHERE ua.eventsid = 25
    `
    try {
        const event = (await pool.query(query)).rows;    
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
})


router.get("/viewall", async (req, res) => {
    const query = "SELECT * FROM events"
    try {
        const event = (await pool.query(query)).rows;
        const checkedEvent = filterEventsFutureDate(event)    
        res.status(201).json({ checkedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
})


router.get("/organisations", async (req, res) => {
    const query = "SELECT * FROM hosts"
    try {
        const event = (await pool.query(query)).rows;
        res.status(201).json({ event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
})

// router.get("/viewall/:eventid", async (req, res) => {
//     const query = `
//     SELECT orgname 
//     FROM hosts h
//     RIGHT JOIN events e on h.hostsid = e.hostsid
//     WHERE h.hostsid = $1 AND e.eventsid = $2
//     `
//     const input = [
//         req.human.id,
//         req.params.eventid
//     ]

//     try {
//         const event = (await pool.query(query, input)).rows;
//         const checkedEvent = filterEventsFutureDate(event)    
//         res.status(201).json({ checkedEvent });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     };
// })


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

router.get("/getuser_attendings/:eventsid", async (req, res) => {
    const query = `
    SELECT COUNT (*)
    FROM user_attendings
    WHERE eventsid=$1
    `
    try {
        const event = await pool.query(query, [req.params.eventsid]);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };

})

module.exports = router