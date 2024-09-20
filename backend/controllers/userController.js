require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token");

const SALT_LENGTH = 12;
const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
});

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT hostsid FROM hosts WHERE username = 'aloy'");
        res.json(result.rows[0]); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* 
make dob standard, make nric unique and standard, make email standard, make country standard, improve error catches
make sign up more secure like singpass ? make diff countries (nric, contactnumber)
*/
router.post("/signup", async (req, res) => {
  const query = `
    INSERT INTO users (fullname, nric, dob, contactnumber, email, country, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `;
  const input = {
    fullname: req.body.fullname,
    nric: req.body.nric,
    dob: req.body.dob,
    contactnumber: req.body.contactnumber,
    email: req.body.email,
    country: req.body.country,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, SALT_LENGTH)
  };
  const inputArray = [
    input.fullname,
    input.nric,
    input.dob,
    input.contactnumber,
    input.email,
    input.country,
    input.username,
    input.password
  ];
  try {
    const user = (await pool.query(query, inputArray)).rows;
    const token = jwt.sign(
      { id: req.body.id, username: req.body.username },
      process.env.JWT_SECRET,
      { expiresIn: "10000hr" }
    );
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };

});

/*
improve error catches
*/
router.post("/signin", async (req, res) => {
  const query = "SELECT * FROM users WHERE username = $1";
  const { username, password } = req.body;
  try {
    const user = await pool.query(query, [username]);
    const result = user.rows[0];
    const match = await bcrypt.compare(password, result.password);
    if (user && match) {
      const token = jwt.sign(
        { id: user.rows[0].usersid, username: req.body.username },
        process.env.JWT_SECRET,
        { expiresIn: "10000hr" }
      );
      return res.status(200).json({ token });
    }
    res.status(401).json({ error: "Invalid username or password." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

router.use(verifyToken);

router.post("/userattendings/:eventid", async (req, res) => {
  const query = `
    INSERT INTO user_attendings (usersid, eventsid)
    VALUES ($1, $2)
    RETURNING *
    `;
  const input = {
    usersid: req.user.id,
    eventsid: req.params.eventid
  }
  const inputArray = [
    input.usersid,
    input.eventsid
  ]
  try {
    const userattendings = (await pool.query(query, inputArray)).rows;
    res.status(201).json({ userattendings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
  
})

router.delete("/userattendings/:eventsid", async (req, res) => {
  const query = "DELETE FROM user_attendings WHERE eventsid = $1 AND usersid = $2"
  try {
      const delattend = await pool.query(query, [req.params.eventsid, req.user.id]);
      res.status(200).json(delattend)
  } catch (error) {
      res.status(500).json({ error: error.message });
  };
})

module.exports = router;


