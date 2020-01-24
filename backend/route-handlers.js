/**
 * File: route-handlers.js
 * Description: Routes / route handlers to be registered to the router.
 */

const packageApi = require("./package-api");
const fs = require("fs");
const config = require("./config");

module.exports.notFound = (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.writeHead(404);
    res.end("Not found");
}

module.exports.indexPage = (req, res) => {
    res.setHeader("Content-Type", "text/html");
    fs.readFile(config.UI_DIST_PATH + "/index.html", (err, html) => {
        if(err) {
            module.exports.notFound(req, res);
        } else {
            res.end(html);
        }     
    });
}

module.exports.serveJs = (req, res) => {
    // Parse requested .js file from url.
    const requestedJsFile = req.url.match(/[\w]*\.js$/)[0];

    res.setHeader("Content-Type", "application/javascript");
    fs.readFile(config.UI_DIST_PATH + "/" + requestedJsFile, (err, js) => {
        if(err) {
            module.exports.notFound(req, res);
        } else {
            res.end(js);
        }
    })
}

module.exports.allPackages = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let packages = await packageApi.getPackageNames()
        .catch(() => {
            module.exports.notFound(req, res);
        })
    if(packages) {
        res.writeHead(200);
        res.end(JSON.stringify(packages));
    } else {
        module.exports.notFound(req, res);
    }
}

module.exports.singlePackage = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    let packageName = req.url.split("=")[1];
    let package = await packageApi.getPackage(packageName)
        .catch(() => {
            module.exports.notFound(req, res);
        });

    if(package) {
        res.writeHead(200); 
        res.end(JSON.stringify(package));
    } else {
        module.exports.notFound(req, res);
    }
}