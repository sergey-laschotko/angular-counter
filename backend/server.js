const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const config = require("./config");

const port = process.env.PORT || 3000;
const app = express();

const theOnlyUser = {
    login: "theOnlyUser",
    password: "theOnly1User"
};
let counter = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const checkAuth = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, config.salt, (err, payload) => {
            console.log(payload);
            if (payload) {
                next();
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({ error: "Not Authorized" });
    }
};

app.get('/', (req, res) => {
    res.json({ message: "Hello there! Server works." });
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const login = req.body.login;
    const password = req.body.password;
    if (login !== theOnlyUser.login || password !== theOnlyUser.password) {
        res.status(400).json({ error: "Login or password is wrong" });
    } else {
        const token = jwt.sign({ user: theOnlyUser.login }, config.salt);
        res.json({
            user: theOnlyUser.login,
            token
        });
    }
});

app.get('/current-counter', checkAuth, (req, res) => {
    res.json({ counter });
});

app.get('/get-counter', checkAuth, (req, res) => {
    counter++;
    const nextCounter = counter * 2;

    res.json({ counter, nextCounter });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
