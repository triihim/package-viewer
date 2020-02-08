const express = require("express");
const app = express();
const packages = require("./package-api");

app.use((req, res, next) => {
    // Client runs in port 8080 in dev mode whereas the server runs in port 3000.
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    if(req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Methods", "GET")
    }
    next();
});

// For Heroku, where client and server can't be deployed separately under single hobby dyno.
app.use(express.static("dist"));

// For Heroku
app.get("/", (req, res) => {
    res.status(200).send("index.html");
});

app.get("/api/packages", async (req, res) => {
    try {
        const packageNames = await packages.getPackageNames();
        res.status(200).json(packageNames);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
});

app.get("/api/package/:name", async (req, res) => {
    try {
        const package = await packages.getPackage(req.params.name);
        if(package.name.length < 1) {
            // Package not found.
            res.status(404).send()
        } else {
            res.status(200).json(package);
        }
    } catch(e) {
        console.log(e)
        res.status(500).send();
    }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running"));