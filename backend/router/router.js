/**
 * File: router.js
 * Description: Simple router.
 */

const routes = [];

module.exports.registerRoute = (pattern, handler) => {
    routes.unshift({
        pattern: pattern,
        handler: handler
    })
}

module.exports.route = (req, res) => {
    let route = routes.find(route => req.url.toLowerCase().match(route.pattern));

    if(route) {
        route.handler(req, res);
    } else {
        require("./route-handlers").notFound(req, res);
    }
}