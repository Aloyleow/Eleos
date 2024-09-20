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

router.post("/create", async (req, res) => {
    
})

module.exports = router;