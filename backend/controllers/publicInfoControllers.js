require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token");
const { filterEventsFutureDate } = require("../utilities/functions")

const pool = new Pool({
    connectionString: process.env.PGSTRING_URI
});

// router.get("/test", async (req, res) => {
//     const query = ` 
//     SELECT *  
//     FROM users
//     `
//     try {
//         const event = await pool.query(query);    
//         res.status(201).json(event);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     };
// })


router.get("/viewall", async (req, res) => {
    const query = "SELECT * FROM events"
    try {
        const event = await pool.query(query);
        const checkedEvent = filterEventsFutureDate(event.rows)    
        res.status(201).json(checkedEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
})


router.get("/organisations", async (req, res) => {
    const query = "SELECT * FROM hosts"
    try {
        const event = await pool.query(query);
        res.status(201).json(event.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
})

router.use(verifyToken);

router.get("/:eventsid", async (req, res) => {
    const query = "SELECT * FROM events WHERE eventsid = $1"
    const input = [req.params.eventsid]
    try {
        const event = await pool.query(query, input);
        res.status(201).json(event.rows);
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
    const input = [req.params.eventsid]
    try {
        const event = await pool.query(query, input);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };

})

module.exports = router