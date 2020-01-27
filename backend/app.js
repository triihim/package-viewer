const http = require("http");
const router = require("./router/router");
const handlers = require("./router/route-handlers");
const config = require("./config");

const port = process.env.PORT || 3000;

// Path: /packages
router.registerRoute(/\/packages[/]?$/, handlers.allPackages);

// Path: /package?name=<package-name>. 
// Package name can contain alphanumeric and some special characters.
router.registerRoute(/\/package\?name=[\w\.\-\+]*/, handlers.singlePackage);

// Path: any .js file
router.registerRoute(/\.js$/, handlers.serveJs);

// Path: /
router.registerRoute(/\/$/, handlers.indexPage);

const server = http.createServer((req, res) => {
 
    let origin = req.headers.referer;

    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");

    router.route(req, res)
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});