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
  const input = [
    req.body.fullname,
    req.body.nric,
    req.body.dob,
    req.body.contactnumber,
    req.body.email,
    req.body.country,
    req.body.username,
    bcrypt.hashSync(req.body.password, SALT_LENGTH)
  ];
  
  try {
    const user = (await pool.query(query, input)).rows;
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

/*
improve error catches
*/
router.post("/login", async (req, res) => {
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

module.exports = router;


