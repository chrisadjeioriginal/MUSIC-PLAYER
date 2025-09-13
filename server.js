const express = require("express");
const path = require("path");
const fs = require("fs");

const myServer = express();

myServer.use(express.static(path.join(__dirname, "client")));
myServer.use(express.urlencoded({ extended: true }));
myServer.use(express.json());

myServer.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/mp.html"));
});

myServer.get("/lyrics", (req, res) => {
  const song = req.query.song;
  console.log(song);
  fs.readFile(`client/lyrics/${song}`, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }
    console.log("Sending lyrics...");
    res.send(data);
  });
});

const host = 3003;

myServer.listen(host, () => {
  console.log(`my server is listening on host ${host}`);
});
