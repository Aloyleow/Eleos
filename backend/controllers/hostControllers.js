require("dotenv").config();
const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token")
const { checkInputFilled } = require("../utilities/functions")

const SALT_LENGTH = 14;

const pool = new Pool({
    connectionString: process.env.PGSTRING_URI
});

/*
make regdate standard, make nric unique and standard, make email standard, make country standard, improve error catches
*/
router.post("/signup", async (req, res) => {
  const queryHostCheck = `
    SELECT *  
    FROM hosts 
    WHERE orgname = $1 or uen = $2 or email = $3 or username = $4
    `;
  const query = `
    INSERT INTO hosts (orgname, uen, regdate, contactnumber, email, country, image, username, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `;
  const input = [
    req.body.orgname,
    req.body.uen,
    req.body.regdate,
    req.body.contactnumber,
    req.body.email,
    req.body.country,
    req.body.image,
    req.body.username,
    bcrypt.hashSync(req.body.password, SALT_LENGTH)
  ];
  try {

    checkInputFilled(input)
    const hostCheck = await pool.query(queryHostCheck, [req.body.orgname, req.body.uen, req.body.email, req.body.username])

    if (hostCheck.rows.length > 0) {

      if (req.body.orgname === hostCheck.rows[0].orgname) {
        throw new Error("Organisation name invalid")
      } else if (req.body.uen === hostCheck.rows[0].uen) {
        throw new Error("UEN invalid")
      } else if (req.body.email === hostCheck.rows[0].email) {
        throw new Error("Email invalid")
      } else if (req.body.username === hostCheck.rows[0].username) {
        throw new Error("Username taken")
      }
    }

    const host = await pool.query(query, input);
    res.status(201).json(host.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };

});

router.post("/login", async (req, res) => {
    const query = "SELECT * FROM hosts WHERE username = $1";
    const input = [
      req.body.username,
      req.body.password
    ]
  try {
    checkInputFilled(input)

    const host = await pool.query(query, [req.body.username]);
    /* 
    Reason for this check, there is a chance where username dosent exist in table, 
    catch error will appear instaed of invalid error 
    */
    if (host.rows.length < 1) {
      throw new Error("Invalid username or password.")
    }
    const hostPassword = host.rows[0].password;
    const match = await bcrypt.compare(req.body.password, hostPassword);
    if (host && match) {
      if (!host.rows[0].hostsid){
        throw new Error("Host id missing")
      } else if (!req.body.username) {
        throw new Error("username missing")
      } else if (!host.rows[0].orgname) {
        throw new Error("Orgname missing")
      }
      const token = jwt.sign(
        {  id: host.rows[0].hostsid, username: req.body.username, orgname: host.rows[0].orgname},
        process.env.JWT_SECRET,
        { expiresIn: "1hr" }
      );
      return res.status(200).json({ token });
    }
    res.status(401).json({ error: "Invalid username or password." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

router.use(verifyToken)

router.get("/details/orgname", async (req, res) => {
  const query = "SELECT orgname FROM hosts WHERE hostsid = $1";
  const input = [req.human.id]
  try {
    const orgName = await pool.query(query, input);
    res.status(201).json(orgName.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
})

module.exports = router
