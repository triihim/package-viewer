const reader = require("../../reader/reader");
const readUtils = require("../../reader/reader-utils");

const parseDependenciesString = async (dependenciesString) => {

    if(dependenciesString.length < 1) return [];

    // Drops version numbers. E.g. "pkg (>=1.15.4)" ==> "pkg"
    const dropVersionNumber = (name) => name.trim().split(" ")[0];

    // Alternative dependencies are separated by '|'.
    let hasAltDependencies = dependenciesString.indexOf("|") > -1;
    
    // Separate all dependencies into an array. 
    // Whether alternative dependency (separated by '|') or regular dependency (separated by ',').
    let dependencies = dependenciesString.split("|").join(",").split(",");

    // Drop version numbers and remove resulting duplicates.
    // E.g. "python (>= 2.7.1), python (<< 2.8)" parses into "[python, python]" without filtering.
    dependencies = dependencies.map(d => dropVersionNumber(d));
    dependencies = dependencies.filter((name, pos) => dependencies.indexOf(name) === pos);

    if(hasAltDependencies) {
        // If alternate dependencies. Check which ones are known.
        dependencies = Promise.all(dependencies.map(async d => {
            return {
                name: d,
                isKnown: await reader.isPackageKnown(d)
            }
        }));

    } else {
        // If there are no alternate dependencies we can assume all dependencies are known.
        dependencies = dependencies.map(d => {
            return { 
                name: d, 
                isKnown: true
            };
        })
    }

    return dependencies;
}

const dependenciesLineHandler = async (pkg, line) => {
    const property = "dependencies";
    const dependenciesString = readUtils.getValue(line);
    let dependencies = await parseDependenciesString(dependenciesString);
    pkg[property] = dependencies;
    return pkg;
}

module.exports = dependenciesLineHandler;