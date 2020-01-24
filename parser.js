const reader = require("./reader");

const parseDependenciesString = async (dependenciesString) => {
    
    if(dependenciesString.length < 1) return [];

    // Drops version numbers. E.g. "dpkg (>=1.15.4)" ==> "dpkg"
    const dropVersionNumber = (name) => name.trim().split(" ")[0];

    // Alternative dependencies are separated by '|'.
    let hasAltDependencies = dependenciesString.indexOf("|") > -1;
    
    // Separate all dependencies into an array. 
    // Whether alternative dependency (separated by '|') or regular dependency (separated by ',').
    let dependencies = dependenciesString.replace("|", ",").split(",");

    // If alternate dependencies. Check which ones are installed.
    if(hasAltDependencies) {
        dependencies = Promise.all(dependencies.map(async d => {
            let name = dropVersionNumber(d);
            return {
                name: dropVersionNumber(d),
                isInstalled: await reader.isPackageInstalled(name)
            }
        }));
    } else {
        dependencies = dependencies.map(d => {
            let name = dropVersionNumber(d);
            return { 
                name: name, 
                isInstalled: true
            };
        })
    }

    return dependencies;
}

const parseDescriptionString = (descriptionString) => {
    // Description field paragraphs are separated by " . "
    return descriptionString.split(" . ");
}

module.exports.readAndParsePackage = async (packageName) => {
    const parsedPackage = {}

    let rawPackage = await reader.readRawPackage(packageName);

    parsedPackage.name = rawPackage.name;
    parsedPackage.descriptionParagraphs = parseDescriptionString(rawPackage.description);
    parsedPackage.dependencies = await parseDependenciesString(rawPackage.dependencies);
    parsedPackage.reverseDependencies = rawPackage.reverseDependencies;

    return parsedPackage;
}
