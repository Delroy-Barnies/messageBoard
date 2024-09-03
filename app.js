const express = require('express');
const app = express();
const path = require("node:path");
const _ = require("lodash");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

const messages = [
    {
        id: _.uniqueId(),
        text: "Hi there!",
        user: "Amando",
        added: new Date().toLocaleDateString()
    },
    {
        id: _.uniqueId(),
        text: "Hello World!",
        user: "Charles",
        added: new Date().toLocaleDateString()
    }
];

app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get("/new", (req, res) => {
    res.render("form", { title: "Mini Messageboard", messages: messages });
});

app.post("/new", (req, res) => {
    messages.push({ id: _.uniqueId(), text: req.body.text, user: req.body.user, added: new Date().toLocaleDateString() });
    res.redirect("/");
});

app.get("/message/:id", (req, res) => {
    messages.forEach(message => {
        if (message.id === req.params.id)
            res.render("message", { id: message.id, title: message.text, user: message.user, added: message.added });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));
