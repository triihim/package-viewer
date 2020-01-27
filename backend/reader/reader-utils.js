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

