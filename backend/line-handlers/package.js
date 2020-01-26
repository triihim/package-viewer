const fs = require("fs");
const readline = require("readline");
const readUtils = require("../reader-utils");
const config = require("../config");

const findReverseDependencies = async packageName => {
    return new Promise(resolve => {
        const rs = fs.createReadStream(config.FILEPATH, "utf-8");
        const rl = readline.createInterface(rs);

        let reverseDependencies = [];

        let checkedPackage = "";

        // Regex matches name in the first position (Depends: <packageName>) 
        // or further down the list (Depends: ... , <packageName> [(version)]])
        const dependsRegex = new RegExp(`[:|,] ${packageName}(,|$| \())`);

        rl.on("line", line => {

            if(readUtils.isPackageStartLine(line)) {

                checkedPackage = readUtils.getValue(line);

            // Check if "depedends"-field contains the package name. 
            } else if(line.toLowerCase().startsWith("depends") && line.search(dependsRegex) > -1) {

                reverseDependencies.push(checkedPackage);

            }
        });

        rl.on("close", function() {
            resolve(reverseDependencies);
        })
    });
}

const packageLineHandler = async (pkg, line) => {
    return new Promise(resolve => {
        const nameProperty = "name";
        pkg[nameProperty] = readUtils.getValue(line);
        
        const revDepProperty = "reverseDependencies";

        findReverseDependencies(pkg[nameProperty])
        .then(revDeps => {
            pkg[revDepProperty] = revDeps;
            resolve(pkg);
        });

    })
}

module.exports = packageLineHandler;