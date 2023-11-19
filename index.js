const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json([
        { id: 1, name: "Ravi Patel", location: "India" },
        { id: 2, name: "John Doe", location: "Japan" },
        { id: 3, name: "Jane Doe", location: "Australia" },
    ]);
});

app.listen(1000, () => {
    console.log("App is running on 1000 port...");
});