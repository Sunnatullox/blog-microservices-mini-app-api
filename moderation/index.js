const express = require("express");
const bodyParse = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParse.json());


app.post("/events", async(req, res) => {
    const { type, data} = req.body;


    if(type === "CommentCreated"){
        const status = data.content.includes('orange') ? "rejected" : "approved";

        await axios.post("http://localhost:5005/events", {
            type:"CommentModerated",
            data:{
                id:data.id,
                postId:data.postId,
                status,
                content:data.content
            }
        });
    }

    res.send({})
})


app.listen(5003, () => {
    console.log("Server listen on port 5003")
})