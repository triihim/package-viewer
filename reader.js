// TODO: Refactor functions.

const fs = require("fs");
const readline = require("readline");

// TODO: Replace hardcoded path with environment variable.
const filepath = "./mockdata.real";

const getValue = (kvString) => kvString.split(":")[1].trim();

const readReverseDependencies = (packageName) => {
    return new Promise(resolve => {
        const rs = fs.createReadStream(filepath, "utf-8");
        const rl = readline.createInterface(rs);

        let reverseDependencies = [];

        let checkedPackage = "";
        rl.on("line", function(line) {
            line = line.toLowerCase();
            if(line.startsWith("package")) {
                checkedPackage = getValue(line);
            } else if(line.startsWith("depends") && line.indexOf(` ${packageName} `) > -1) {
                reverseDependencies.push(checkedPackage);
            }
        });

        rl.on("close", function() {
            resolve(reverseDependencies);
        })
    });
}

module.exports.isPackageInstalled = (packageName) => {
    return new Promise(resolve => {
        const rs = fs.createReadStream(filepath, "utf-8");
        const rl = readline.createInterface(rs);

        let exists = false;

        rl.on("line", function(line) {
            if(line.toLowerCase().startsWith("package")) {
                let currentPackage = getValue(line);
                if(currentPackage === packageName) {
                    exists = true;
                    rl.close();
                    rl.removeAllListeners();
                }
            } 
        });

        rl.on("close", function() {
            resolve(exists);
        })
    });
}

module.exports.readRawPackage = (packageName) => {
    return new Promise((resolve, reject) => {
        const rs = fs.createReadStream(filepath, "utf-8");
        const rl = readline.createInterface(rs);
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

                // Don't lowecase line, when working with description field.
                if(line.startsWith("description") || line.startsWith("Description")) {
                    package.description = getValue(line);
                } else if(line.indexOf(" ") === 0 && package.description) {
                    // Description field starts with "description" key and can span multiple lines of which each begins with a space.
                    package.description += line;
                } else if(line.toLowerCase().startsWith("depends")) {
                    package.dependencies = getValue(line);
                } else if(line.toLowerCase().startsWith("package")) {
                    // Different package section started ==> Stop reading.
                    rl.close();
                    rl.removeAllListeners();

                    readReverseDependencies(packageName)
                    .then(reverseDependencies => {
                        package.reverseDependencies = reverseDependencies;
                        resolve(package);
                    })
                }
            }
        });

        rl.on("end", function() {
            reject("Can't find package " + name);
        });
    })
}

module.exports.readAllPackageNames = () => {
    return new Promise(resolve => {
        const rs = fs.createReadStream(filepath, "utf-8");
        const rl = readline.createInterface(rs);
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
