/**
 * File: route-handlers.js
 * Description: Routes / route handlers to be registered to the router.
 */

const packageApi = require("./package-api");

module.exports.notFound = (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.writeHead(404);
    res.end("Not found");
}

module.exports.indexPage = (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Home page</h1>")
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