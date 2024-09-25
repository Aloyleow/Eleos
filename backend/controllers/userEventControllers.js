require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token");
const { filterEventsFutureDate, filterEventsPastDate } = require("../utilities/functions")

const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
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
      const userattendings = (await pool.query(query, input)).rows;
      const checkedUserAttendings = filterEventsFutureDate(userattendings)
      res.status(201).json({ checkedUserAttendings });
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  })

router.post("/userattendings/:eventsid", async (req, res) => {
  const query = `
    INSERT INTO user_attendings (usersid, eventsid)
    VALUES ($1, $2)
    RETURNING *
    `;
  const input = [
    req.human.id,
    req.params.eventsid
  ]
  try {
    const userattendings = (await pool.query(query, input)).rows;
    res.status(201).json({ userattendings });
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
      const delattend = await pool.query(query, input);
      res.status(200).json(delattend)
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
    const userattendings = (await pool.query(query, input)).rows;
    const checkedUserAttendings = filterEventsPastDate(userattendings)
    
    res.status(201).json({ checkedUserAttendings });
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
    const userattendings = (await pool.query(queryHistory, [req.human.id])).rows;
    const checkedUserAttendings = filterEventsPastDate(userattendings)
    const updateReputation = (await pool.query(queryEdit, [checkedUserAttendings.length, req.human.id])).rows;
    res.status(201).json({ updateReputation });
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
    const userAttendings = (((await pool.query(query, input)).rowCount));
    res.status(201).json({ userAttendings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
})

module.exports = router;
