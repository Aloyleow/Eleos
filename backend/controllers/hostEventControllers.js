require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const verifyToken = require("../middlewares/verify-token");
const { filterEventsFutureDate, filterEventsPastDate } =require("../utilities/functions")
const nodeMailer = require("nodemailer")

const pool = new Pool({
    connectionString: process.env.PGSTRING_URI
});

router.use(verifyToken);

router.post("/create", async (req, res) => {
    const query = `
    INSERT INTO events (eventname, type, datentime, location, country, comments, attendees, hostsid, image, orgname)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
    `;
    const input = [
        req.body.eventname,
        req.body.type,
        req.body.datentime,
        req.body.location,
        req.body.country,
        req.body.comments,
        req.body.attendees,
        req.human.id,
        req.body.image,
        req.human.orgname
    ];
    try {
        const event = await pool.query(query, input);
        res.status(201).json(event.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
});

//should we return back edited page ?
router.put("/update/:eventsid", async (req, res) => {
    const query = `
    UPDATE events
    SET datentime = $1, location = $2, comments = $3, attendees = $4, image =$5
    WHERE eventsid = $7 AND hostsid = $6
    `;
    const queryUpdate = "SELECT * FROM events WHERE eventsid = $1"
    const input = [
        req.body.datentime,
        req.body.location,
        req.body.comments,
        req.body.attendees,
        req.body.image,
        req.human.id,
        req.params.eventsid
    ];
    try {
        await pool.query(query, input);
        const event = await pool.query(queryUpdate, [req.params.eventsid])
        res.status(201).json( event.rows );
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
})

router.get("/hostevents", async (req, res) => {
    const query = "SELECT * FROM events WHERE hostsid = $1"
    const input = [req.human.id]
    try {
        const event = await pool.query(query, input);
        const checkedEvent = filterEventsFutureDate(event.rows)
        res.status(201).json( checkedEvent );
    } catch (error) {
        res.status(500).json({ error: error.message });
    };

})

router.get("/hostevents/history", async (req, res) => {
    const query = "SELECT * FROM events WHERE hostsid = $1"
    const input = [req.human.id]
    try {
        const event = await pool.query(query, input);
        const checkedEventsHistory = filterEventsPastDate(event.rows)
        res.status(201).json(checkedEventsHistory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };

})

router.delete("/hostevents/:eventsid", async (req, res) => {
    const queryUsers =`
      SELECT email 
      FROM users u
      RIGHT JOIN user_attendings ua on u.usersid = ua.usersid
      WHERE ua.eventsid = $1
    `
    let userEmails = []
    const html = `
    <head>
    <h1>LETS * HELP<h1>
    </head>
    <body>
    <h3>Dear user<h3>
    <p>Due to some changes, your event by ${req.human.orgname} has been cancelled<p>
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
    const email = {
        from: `aloyleowWork@gmail.com`,
        to: userEmails,
        subject: `Event Cancelled`,
        html: html
    }
    const queryDelete = "DELETE FROM events WHERE eventsid = $1"
    
    try {
        const users = (await pool.query(queryUsers, [req.params.eventsid])).rows
        for (const obj of users) {
            userEmails.push(obj.email)
        }
        const info = await transporter.sendMail(email)
        const event = (await pool.query(queryDelete, [req.params.eventsid])).rows;
        res.status(201).json({ info, event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    };

})

router.get("/getuser_attendings/:eventsid", async (req, res) => {
    const query = `
    SELECT COUNT (*)
    FROM user_attendings ua
    RIGHT JOIN events e ON ua.eventsid = e.eventsid
    WHERE ua.eventsid= $1 AND e.hostsid= $2
    `
    const input =[
        req.params.eventsid,
        req.human.id
    ]
    try {
        const event = await pool.query(query, input);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };

})



module.exports = router