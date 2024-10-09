require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token");
const nodeMailer = require("nodemailer")
const { checkInputFilled } = require("../utilities/functions");
const SALT_LENGTH = 12;

const pool = new Pool({
    connectionString: process.env.PGSTRING_URI
});


// make dob standard make sign up more secure like singpass ? make diff countries (nric, contactnumber)
router.post("/signup", async (req, res) => {
  const queryUserCheck = `
    SELECT *  
    FROM users 
    WHERE nric = $1 or email = $2 or username = $3
    `;
  const querySignup = `
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
    // Check input filled
    checkInputFilled(input)
    // Check blocks for unique entities, prevent server side checks
    const userCheck = await pool.query(queryUserCheck, [req.body.nric, req.body.email, req.body.username]);
    if (userCheck.rows.length > 0) {
      if (req.body.nric === userCheck.rows[0].nric){
        throw new Error("NRIC invalid")
      } else if (req.body.email === userCheck.rows[0].email){
        throw new Error("Email invalid")
      } else if (req.body.username === userCheck.rows[0].username){
        throw new Error("Username taken")    
      }     
    }
    const user = await pool.query(querySignup, input);
    res.status(201).json(user.rows); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});

/*
improve error catches, improve log in security
*/
router.post("/login", async (req, res) => {
  const query = "SELECT * FROM users WHERE username = $1";
  const input = [
    req.body.username,
    req.body.password
  ]
  try {
    checkInputFilled(input)

    const user = await pool.query(query, [req.body.username]);
    /* 
    Reason for this check, there is a chance where username dosent exist in table, 
    catch error will appear instaed of invalid error 
    */
    if (user.rows.length < 1) {
      throw new Error("Invalid username or password.")
    } 
    const userPassword = user.rows[0].password;
    const match = await bcrypt.compare(req.body.password, userPassword);
    if (user && match) {
      if (!user.rows[0].usersid){
        throw new Error("User id missing")
      } else if (!req.body.username) {
        throw new Error("username missing")
      }
      const token = jwt.sign(
        { id: user.rows[0].usersid, username: req.body.username},
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

//refactor codes needed
router.put("/login/forgetpassword", async (req, res) => {
  const changepassQuery = "UPDATE users SET PASSWORD = $3 WHERE username = $1 AND nric =$2"
  const randomNumber = Math.floor(111111 + Math.random() * 900000)
  const fixNumber = randomNumber.toString()
  const input = [
    req.body.username,
    req.body.nric,
    bcrypt.hashSync(fixNumber, SALT_LENGTH)
  ]
  const emailQuery = 'SELECT email FROM users WHERE nric =$1'
  
  try {
    const html = `
    <head>
    <h1>LETS * HELP<h1>
    </head>
    <body>
    <h3>Dear user<h3>
    <p>this is your new password<p>
    <p>${fixNumber}</p>
    `;

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    const authQuery = await pool.query(changepassQuery, input);
    const userEmail = (await pool.query(emailQuery, [req.body.nric])).rows[0].email;

    const email = {
      from: `aloyleowWork@gmail.com`,
      to: `${userEmail}`,
      subject: `New Password`,
      html: html
    }

    const info = await transporter.sendMail(email)
    if (authQuery && info) {
      return res.status(200).json({ info });
    }
    res.status(401).json({ error: "Invalid username or password." })
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
})

router.use(verifyToken)

router.get("/details/reputation", async (req, res) => {
  const query = "SELECT reputation FROM users WHERE usersid = $1";
  const input = [req.human.id]
  try {
    const userStars = await pool.query(query, input);
    res.status(201).json(userStars.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
})

router.get("/details/fullname", async (req, res) => {
  const query = "SELECT fullname FROM users WHERE usersid = $1";
  const input = [req.human.id]
  try {
    const fullName = await pool.query(query, input);
    res.status(201).json(fullName.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
})
module.exports = router;


