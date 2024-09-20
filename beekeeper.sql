CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname TEXT NOT NULL CHECK (fullname ~ '^[a-zA-Z\s]+$' AND fullname <> '') ,
    nric VARCHAR(9) NOT NULL CHECK (nric ~ '^[ST][0-9]{7}[A-Z]$' AND nric <> '' ),
    dob VARCHAR NOT NULL CHECK (dob <> ''),
    email TEXT NOT NULL CHECK (email ~ '^[^@]*@[^@]*$' AND email <> ''),
    contactnumber VARCHAR(8) NOT NULL CHECK (contactnumber ~ '^[0-9]+$' and contactnumber <> ''),
    country TEXT NOT NULL CHECK (country <> ''),
    username VARCHAR(20) NOT NULL UNIQUE CHECK (username <> ''), 
    password TEXT NOT NULL CHECK (password <> ''),
    reputation INT DEFAULT 0
);

CREATE TABLE hosts (
    id SERIAL PRIMARY KEY,
    orgname TEXT NOT NULL CHECK (orgname ~ '^[a-zA-Z\s]+$' AND orgname <> '') ,
    uen VARCHAR(9) NOT NULL CHECK (uen  ~ '^[a-zA-Z0-9]+$' AND uen  <> '' ),
    regdate VARCHAR NOT NULL CHECK (regdate <> ''),
    email TEXT NOT NULL CHECK (email ~ '^[^@]*@[^@]*$' AND email <> ''),
    contactnumber VARCHAR(8) CHECK (contactnumber ~ '^[0-9]+$' and contactnumber <> ''),
    country TEXT NOT NULL CHECK (country <> ''),
    username VARCHAR(20) NOT NULL UNIQUE CHECK (username <> ''), 
    password TEXT NOT NULL CHECK (password <> '')
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    eventname TEXT NOT NULL CHECK (eventname <> ''),
    type VARCHAR NOT NULL CHECK (type <> ''),
    when VARCHAR NOT NULL CHECK (when <> ''),
    location TEXT NOT NULL CHECK (location <> ''),
    comments TEXT NOT NULL,
    attendees INT NOT NULL CHECK (attendees <> '')
)


SELECT * FROM users
DELETE FROM users WHERE username= '' AND nric= '';