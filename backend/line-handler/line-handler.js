/**
 * File: line-handler.js
 * Description: Line handlers are functions that the reader calls
 *  when it hits a line that matches one of the patterns.
 *  Upon finding a matching pattern. it calls the given handler and passes it two arguments:
 *  the object being read into, and the pattern matchin line.
 *  E.g: handler(object, line)
 */

const packageLineHandler = require("./functions/package");
const dependenciesLineHandler = require("./functions/dependencies");
const descriptionLineHandler = require("./functions/description");

const lineHandlers = [
    {
        pattern: /^Package/i,
        handler: packageLineHandler
    },
    {
        pattern: /^Depends/i,
        handler: dependenciesLineHandler
    },
    {
        pattern: /(^\s)|Description/i,
        handler: descriptionLineHandler
    }
]

module.exports.getLineHandler = (line) => {
    return lineHandlers.find(lh => {
        let regexp = new RegExp(lh.pattern);
        if(regexp.test(line))
            return true;
    });
}
