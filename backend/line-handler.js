const packageLineHandler = require("./line-handlers/package");
const dependenciesLineHandler = require("./line-handlers/dependencies");
const descriptionLineHandler = require("./line-handlers/description");

const lineHandlers = [
    {
        pattern: /^Package/,
        handler: packageLineHandler
    },
    {
        pattern: /^Depends/,
        handler: dependenciesLineHandler
    },
    {
        pattern: /(^\s)|Description/,
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
