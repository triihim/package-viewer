/**
 * File: reader-utils.js
 * Description: Common utility functions used when reading packages file.
 */

module.exports = {

    getValue: keyValueString => {
        return keyValueString.split(":")[1].trim()
    },

    isPackageStartLine: line => {
        return line.toLowerCase().startsWith("package");
    },

    isSearchedPackage: (line, packageName) => {
        return module.exports.getValue(line).toLowerCase() === packageName.toLowerCase();
    },
    
}

