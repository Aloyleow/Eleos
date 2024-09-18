require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pool = require("pg").Pool;
const verifyToken = require("../middlewares/verify-token");

const connectionString = process.env.PGSTRING_URI;

const pool = new Pool({
    connectionString
})

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM test");
        res.json(result.rows); // Send rows instead of entire result object
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = router;
