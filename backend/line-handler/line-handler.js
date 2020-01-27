const packageLineHandler = require("./functions/package");
const dependenciesLineHandler = require("./functions/dependencies");
const descriptionLineHandler = require("./functions/description");

// Line handlers which get called when read line matches the pattern.
// Handler is passed the built object (reference) and read line.
// I.e. each line is tested for pattern and the corresponding handler is called: handler(pkg, line).
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
