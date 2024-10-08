require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token");
const { filterEventsFutureDate, filterEventsPastDate } = require("../utilities/functions")

const pool = new Pool({
    connectionString: process.env.PGSTRING_URI
});

router.use(verifyToken);

router.get("/userattendings", async (req, res) => {
    const query = `
      SELECT e.* 
      FROM events e
      RIGHT JOIN user_attendings ua on e.eventsid = ua.eventsid
      WHERE ua.usersid = $1
    `
    const input = [ req.human.id ]
    try {
      const userattendings = await pool.query(query, input);
      const checkedUserAttendings = filterEventsFutureDate(userattendings.rows)
      res.status(201).json(checkedUserAttendings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  })


router.post("/userattendings/:eventsid", async (req, res) => {
  const queryCount = `
    SELECT COUNT (*)
    FROM user_attendings
    WHERE eventsid = $1
  `
  const queryEvent = `
    SELECT attendees FROM events
    WHERE eventsid = $1
  `
  const queryfinal = `
    INSERT INTO user_attendings (usersid, eventsid)
    VALUES ($1, $2)
    RETURNING *
    `;
  const input = [
    req.human.id,
    req.params.eventsid
  ]
  try {
    const checkAvailability = await pool.query(queryCount, [req.params.eventsid])
    const queryAttendees = await pool.query(queryEvent, [req.params.eventsid])
    if(checkAvailability.rows[0].count < queryAttendees.rows[0].attendees){
      const userattendings = (await pool.query(queryfinal, input)).rows;
      res.status(201).json({ userattendings });
    } else {
      res.status(403).json({ userattendings })
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
  
})

router.delete("/userattendings/:eventsid", async (req, res) => {
  const query = "DELETE FROM user_attendings WHERE eventsid = $1 AND usersid = $2"
  const input = [
    req.params.eventsid,
    req.human.id,
  ]
  try {
      const delAttend = await pool.query(query, input);
      res.status(200).json(delAttend)
  } catch (error) {
      res.status(500).json({ error: error.message });
  };
})

router.get("/userattendings/history", async (req, res) => {
  const query = `
    SELECT e.* 
    FROM events e
    RIGHT JOIN user_attendings ua on e.eventsid = ua.eventsid
    WHERE ua.usersid = $1
  `
  const input = [ req.human.id ]
  try {
    const userattendings = await pool.query(query, input);
    const checkedUserAttendings = filterEventsPastDate(userattendings.rows)
    
    res.status(201).json(checkedUserAttendings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
})

router.put("/update/reputation", async (req, res) => {
  const queryHistory = `
    SELECT e.* 
    FROM events e
    RIGHT JOIN user_attendings ua on e.eventsid = ua.eventsid
    WHERE ua.usersid = $1
  `
  const queryEdit = `
  UPDATE users
  SET reputation = $1
  WHERE usersid = $2
  `
  try {
    const userattendings = await pool.query(queryHistory, [req.human.id]);
    const checkedUserAttendings = filterEventsPastDate(userattendings.rows)
    const updateReputation = await pool.query(queryEdit, [checkedUserAttendings.length, req.human.id]);
    res.status(201).json( updateReputation.rows );
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
})

router.get("/userattendings/:eventsid/check", async (req, res) => {
  const query = `
    SELECT *
    FROM user_attendings 
    WHERE usersid = $1 AND eventsid =$2 
  `
  const input = [ req.human.id, req.params.eventsid ]
  try {
    const userAttendings = await pool.query(query, input);
    res.status(201).json(userAttendings.rowCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
})

router.get("/userattendings/:eventsid/checkAttendees", async (req, res) => {
  const queryEvent = `
  SELECT attendees FROM events
  WHERE eventsid = $1
  `
  const input = [ req.params.eventsid ]
  try {
    const userAttendings = (await pool.query(queryEvent, input));
    res.status(201).json({ userAttendings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
})



module.exports = router;
