// implement your API here
const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/api/users", (req, res) => {
    db.find()
        .then(user => {
            res.status(200).json({ success: true, user });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: "The user information could not be retrieved." })
        });
})

server.get("/api/users/:id", (req, res) => {
    const {id} = req.params;
    db.findById(id)
        .then(user => {
            if (user) {
                res.status.apply(200).json({ success: true, user });
            } else {
                res.status(404).json({
                    success: false,
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, error: "The user information could not be retrieved." })
        });
});


server.post("/api/users", (req, res) => {
    const user = req.body;
    if (user.name && user.bio) {
        db.insert(user)
            .then(use => {
                db.findById(use.id)
                    .then(user => {
                        res.status(201).json({ success: true, use });
                    })
            
            })
            .catch(err => {
                res.status(500).json({ success: false, error: "There was an error while saving the user to the database" })
            });
    
    } else {
        res.status(400).json({ errormessage: "Please provide name and bio for the user." });
    };
});





server.listen(3000, () => {
    console.log("\n***Server Running on http://localhost:3000 ***\n")
});