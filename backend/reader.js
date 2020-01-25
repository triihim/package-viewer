/**
 * File: reader.js
 * Description: Functions handling the reading of the packages file.
 */

const fs = require("fs");
const readline = require("readline");
const config = require("./config");

// Returns value from key-value string. E.g. from "key: value" ==> returns "value"
const getValue = (kvString) => kvString.split(":")[1].trim();

const readlineInterface = () => {
    const rs = fs.createReadStream(config.FILEPATH, "utf-8");
    return readline.createInterface(rs);
}

const readReverseDependencies = (packageName) => {
    return new Promise(resolve => {
        const rl = readlineInterface();

        let reverseDependencies = [];

        let checkedPackage = "";
        rl.on("line", function(line) {

            line = line.toLowerCase();

            if(line.startsWith("package")) {

                checkedPackage = getValue(line);

            // Check if "depedends"-field contains the package name. 
            // Regex matches name in the first position (Depends: <packageName>) or further down the list (Depends: ... , <packageName>)
            } else if(line.startsWith("depends") && line.search(new RegExp(`[:|,] ${packageName}(,|$)`)) > -1) {
                reverseDependencies.push(checkedPackage);
            }
        });

        rl.on("close", function() {
            resolve(reverseDependencies);
        })
    });
}

module.exports.isPackageKnown = (packageName) => {
    return new Promise(resolve => {
        const rl = readlineInterface();

        let isKnown = false;

        rl.on("line", function(line) {
            if(line.toLowerCase().startsWith("package")) {
                let currentPackage = getValue(line);
                if(currentPackage === packageName) {
                    isKnown = true;
                    rl.removeAllListeners();
                    rl.close();
                    resolve(isKnown);
                }
            } 
        });

        rl.on("close", function() {
            resolve(isKnown);
        })
    });
}

module.exports.readRawPackage = (packageName) => {
    return new Promise((resolve, reject) => {
        const rl = readlineInterface();

        let packageFound = false;
        let package = { name: "", dependencies: "", description: "", reverseDependencies: []};

        rl.on("line", function(line) {
            // If on package name line. Check if the name matches the searched one.
            if(line.toLowerCase().startsWith("package") && !packageFound) {

                let readPackageName = getValue(line);
                if(packageName.toLowerCase() === readPackageName) {
                    // If the package is found, the following lines contain more package details.
                    packageFound = true;
                    package.name = readPackageName;
                }

            } else if(packageFound) {

                // Don't lowercase line, when working with description field.
                if(line.startsWith("description") || line.startsWith("Description")) {

                    package.description = getValue(line);

                } else if(line.indexOf(" ") === 0 && package.description) {

                    // Description field starts with "description" key and can span multiple lines of which each begins with a space.
                    package.description += line;

                } else if(line.toLowerCase().startsWith("depends")) {

                    package.dependencies = getValue(line);

                } else if(line.toLowerCase().startsWith("package")) {

                    // Different package section started => No need to read further. Next find reverse dependencies.
                    readReverseDependencies(packageName)
                    .then(reverseDependencies => {
                        package.reverseDependencies = reverseDependencies;
                        resolve(package);
                    })

                    rl.removeAllListeners();
                    rl.close();
                }
            }
        });

        rl.on("close", function() {
            reject("Can't find package " + packageName);
        });
    })
}

module.exports.readAllPackageNames = () => {
    return new Promise(resolve => {
        const rl = readlineInterface();
        let names = [];

        rl.on("line", function(line) {
            if(line.toLowerCase().indexOf("package") === 0) {
                names.push(getValue(line));
            };
        });

        rl.on("close", function() {
            resolve(names);
        });
    });
}
