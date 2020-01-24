const http = require("http");
const router = require("./router");
const handlers = require("./route-handlers");

const port = process.env.PORT || 3000;

// Path: /packages
router.registerRoute(/\/packages[/]?$/, handlers.allPackages);

// Path: /package?name=<package-name>
router.registerRoute(/\/package\?name=[\w\.\-\+]*/, handlers.singlePackage);

// Path: /
router.registerRoute(/\/$/, handlers.indexPage);

const server = http.createServer((req, res) => router.route(req, res));

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});