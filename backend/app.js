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
 
    // Simple cors setup.
    let origin = req.headers.origin;
    if(config.ALLOWED_ORIGINS.find(o => o.match(origin)) != null){
        res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
        res.setHeader("Access-Control-Allow-Origin", "");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Route the request.
    router.route(req, res)
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});