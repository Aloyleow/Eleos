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


SELECT * FROM users
DELETE FROM users WHERE username= '' AND nric= '';