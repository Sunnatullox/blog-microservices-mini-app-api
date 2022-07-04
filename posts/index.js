const express = require("express");
const bodyParse = require("body-parser");
const Cors = require("cors");
const axios = require("axios");

const { randomBytes } = require("crypto");
const app = express()
app.use(bodyParse.json())
app.use(Cors())
const posts= {};

app.get("/posts", (req, res) => {
    res.send(posts)
})

app.post("/posts", async(req, res) => {
    const id  = randomBytes(4).toString("hex");
    const {title} = req.body;

    posts[id] = {
        id, title
    };
    
    await axios.post("http://localhost:5005/events",{
        type:"PostCreated",
        data:{
            id, title
        }
    })

    res.status(201).send(posts[id])
});

app.post("/events", (req, res) => {
console.log("Resevt event", req.body.type)

    res.send({})
});



app.listen(5000, () => {
    console.log("Server on port 5000")
})

