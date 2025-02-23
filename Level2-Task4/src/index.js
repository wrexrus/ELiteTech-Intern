const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

// convert data into json format 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use EJS as the view engine
app.set('view engine', 'ejs');

// static file
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

// for going back to login
app.get("/login", (req, res) => {
    res.render("login");
});

app.use(express.static("public"));    ///////////////

app.get("/signup", (req, res) => {
    res.render("signup");
});

// functionality for signup page
// for mongodb interaction make async fn
// Register user    
app.post("/signup", async (req, res) => {
    try {
        // object
        const data = {
            name: req.body.username,
            password: req.body.password
        };
        // check if user already exists in database
        const existingUser = await collection.findOne({ name: data.name });

        if (existingUser) {
            res.send("User already exists");
        } else {
            // hash the password
            const saltRounds = 10; // number of salt rounds for bcrypt
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword; // replace the hash password with original password
            // to send data into database
            const userdata = await collection.insertMany([data]);
            console.log(userdata);
            res.redirect("/login");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("Username not found! Register");
        } else {
            // compare the hash password from the database with the plain text
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (isPasswordMatch) {
                res.render("home");
            } else {
                res.send("Wrong password");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});