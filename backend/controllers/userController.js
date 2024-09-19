require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg")
const verifyToken = require("../middlewares/verify-token");

const SALT_LENGTH = 12
const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
})

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users  WHERE username = 'aloy'");
        res.json(result.rows); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

/* 
make dob standard, make nric unique and standard, make email standard, make country standard,
make sign up more secure like singpass ?
*/
router.post("/signup", async (req, res) => {
    const query = `
    INSERT INTO users (fullname, nric, dob, contactnumber, email, country, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `
    const input = {
        fullname: req.body.fullname,
        nric: req.body.nric,
        dob: req.body.dob,
        contactnumber: req.body.contactnumber,
        email: req.body.email,
        country: req.body.country,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, SALT_LENGTH)
    }
    const inputArray = [
        input.fullname,
        input.nric,
        input.dob,
        input.contactnumber,
        input.email,
        input.country,
        input.username,
        input.password
    ]
    try {
        const user = (await pool.query(query, inputArray)).rows;
        const token = jwt.sign(
            { id: req.body.id, username: req.body.username },
            process.env.JWT_SECRET,
            { expiresIn: "10000hr" }
          );
        res.status(201).json({user, token});
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

/*
improve error catches
*/
router.post("/signin", async (req, res) => {
    const query = "SELECT * FROM users WHERE username = $1"
    const { username, password } = req.body
  try {
    const user = await pool.query(query, [username ])
    const result = user.rows[0]
    const match = await bcrypt.compare(password, result.password);
    if (user && match) {
      const token = jwt.sign(
        {  id: req.body.id, username: req.body.username },
        process.env.JWT_SECRET,
        { expiresIn: "10000hr" }
      );
      return res.status(200).json({ token });
    }
    res.status(401).json({ error: "Invalid username or password." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// router.use(verifyToken);

// router.delete("/nukenukenuke", async (req, res) => {
//     const query = "DELETE FROM users WHERE fullname= $1 AND nric= $2;"
//     const { username, password } = req.body
// })


module.exports = router;


