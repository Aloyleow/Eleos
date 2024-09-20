require("dotenv").config();
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");


const SALT_LENGTH = 14;
const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
});

/*
make regdate standard, make nric unique and standard, make email standard, make country standard, improve error catches
*/
router.post("/signup", async (req, res) => {
    const query = `
    INSERT INTO hosts (orgname, uen, regdate, contactnumber, email, country, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `;
    const input = {
        orgname: req.body.orgname,
        uen: req.body.uen,
        regdate: req.body.regdate,
        contactnumber: req.body.contactnumber,
        email: req.body.email,
        country: req.body.country,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, SALT_LENGTH)
    };
    const inputArray = [
        input.orgname,
        input.uen,
        input.regdate,
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
        res.status(201).json({user, token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    };

});

router.post("/signin", async (req, res) => {
    const query = "SELECT * FROM hosts WHERE username = $1";
    const { username, password } = req.body;
  try {
    const host = await pool.query(query, [username]);
    const result = host.rows[0];
    const match = await bcrypt.compare(password, result.password);
    if (host && match) {
      const token = jwt.sign(
        {  id: host.rows[0].hostsid, username: req.body.username },
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

module.exports = router
