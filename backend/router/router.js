/**
 * File: router.js
 * Description: Simple router to keep app.js tidy.
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

    // TODO: More elegant solution
    res.setHeader("Access-Control-Allow-Origin", "*");

    if(route) {
        route.handler(req, res);
    } else {
        require("./route-handlers").notFound(req, res);
    }
}