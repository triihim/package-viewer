const readUtils = require("../../reader/reader-utils");

const descriptionLineHandler = async (pkg, line) => {
    const property = "description";
    if(line.toLowerCase().startsWith("description")) {
        pkg[property] = readUtils.getValue(line);
    } else if(pkg["description"] !== undefined) {
        pkg[property] += line;
    }
    return pkg;
}

module.exports = descriptionLineHandler;