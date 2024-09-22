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
      res.status(201).json({ userattendings });
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

module.exports = router;
