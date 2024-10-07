CREATE TABLE users (
    usersid SERIAL PRIMARY KEY,
    fullname TEXT NOT NULL CHECK (fullname ~ '^[a-zA-Z\s]+$' AND fullname <> '') ,
    nric TEXT NOT NULL UNIQUE CHECK (nric ~ '^[ST][0-9]{7}[A-Z]$' AND nric <> '' ),
    dob VARCHAR NOT NULL CHECK (dob <> ''),
    email TEXT NOT NULL UNIQUE CHECK (email ~ '^[^@]*@[^@]*$' AND email <> ''),
    contactnumber VARCHAR(8) NOT NULL CHECK (contactnumber ~ '^[0-9]+$' and contactnumber <> ''),
    country TEXT NOT NULL CHECK (country <> ''),
    username VARCHAR(20) NOT NULL UNIQUE CHECK (username <> ''), 
    password TEXT NOT NULL CHECK (password <> ''),
    reputation INT DEFAULT 0
);

CREATE TABLE hosts (
    hostsid SERIAL PRIMARY KEY,
    orgname TEXT NOT NULL UNIQUE CHECK (orgname <> '') ,
    uen VARCHAR(9) NOT NULL CHECK (uen  ~ '^[a-zA-Z0-9]+$' AND uen  <> '' ),
    regdate VARCHAR NOT NULL CHECK (regdate <> ''),
    email TEXT NOT NULL CHECK (email ~ '^[^@]*@[^@]*$' AND email <> ''),
    contactnumber VARCHAR(8) CHECK (contactnumber ~ '^[0-9]+$' and contactnumber <> ''),
    country TEXT NOT NULL CHECK (country <> ''),
    image TEXT NOT NULL CHECK (image <> ''),
    username VARCHAR(20) NOT NULL UNIQUE CHECK (username <> ''), 
    password TEXT NOT NULL CHECK (password <> '')
    
);

CREATE TABLE events (
    eventsid SERIAL PRIMARY KEY,
    orgname TEXT NOT NULL CHECK (orgname <> '') ,
    eventname TEXT NOT NULL CHECK (eventname <> ''),
    type VARCHAR NOT NULL CHECK (type <> ''),
    datentime VARCHAR NOT NULL CHECK (datentime <> ''),
    location TEXT NOT NULL CHECK (location <> ''),
    country TEXT NOT NULL CHECK (country <> ''),
    comments TEXT NOT NULL,
    attendees INT NOT NULL CHECK (attendees > 0),
    image TEXT NOT NULL CHECK (image <> ''),
    hostsid INT NOT NULL REFERENCES hosts(hostsid)
);

CREATE TABLE user_attendings (
    user_attendingsid SERIAL PRIMARY KEY,
    usersid INT NOT NULL REFERENCES users(usersid),
    eventsid INT NOT NULL REFERENCES events(eventsid) ON DELETE CASCADE,
    UNIQUE (usersid, eventsid)
);



SELECT * FROM events
DELETE FROM hosts

SELECT e.* 
FROM events e
RIGHT JOIN user_attendings ua on e.eventsid = ua.eventsid
WHERE ua.usersid = 5

SELECT * FROM events WHERE hostsid = 4



-- user  
-- weiming 123



-- org
-- scc 
-- ddd




