// implement your API here
const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(({ code, message }) => {
            res.status(code).json({
                success: false,
                message,
            });
        });
})



server.listen(3000, () => {
    console.log("\n***Server Running on http://localhost:3000 ***\n")
});