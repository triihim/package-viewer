const fs = require("fs");
const readline = require("readline")

const filepath = require("./config").PACKAGES_FILEPATH;


const isPackageStartLine = line => line.toLowerCase().startsWith("package:");

const isDependsLine = line => /^Depends/i.test(line);

const isDescriptionLine = line => /Description/i.test(line);

const isIndentedLine = line => /(^\s)/.test(line);

const isSearchedPackage = (line, name) => (new RegExp(`package: ${name}$`, "i")).test(line);

const isDependency = (dependsLine, name) => (new RegExp(`\\s${name}(,|\\s\\(|$)`)).test(dependsLine);

const getKvValue = keyValueString => keyValueString.split(":")[1].trim();


const readAllPackageNames = () => {
    return new Promise((resolve, reject) => {
        const rs = fs.createReadStream(filepath, { encoding:"utf8", highWaterMark: 8*1024 });
        const rl = readline.createInterface(rs);

        const names = [];

        rl.on("line", line => {
            if(isPackageStartLine(line)) {
                names.push(getKvValue(line));
            }
        });

        rs.on("close", () => {
            resolve(names);
        });

        rs.on("error", error => {
            reject(error);
        });
    })
}

const readPackage = name => {
    return new Promise((resolve, reject) => {
        const rs = fs.createReadStream(filepath, { encoding:"utf8", highWaterMark: 8*1024 });
        const rl = readline.createInterface(rs);

        const pkg = {
            name: "",
            description: "",
            dependencies: "",
            reverseDependencies: []
        };

        const allPackageNames = [];
        let currentPackage = "";
        let doReadFlag = false;

        rl.on("line", line => {
            if(isPackageStartLine(line)) {
                currentPackage = getKvValue(line);
                allPackageNames.push(currentPackage);
                doReadFlag = isSearchedPackage(line, name);
            }
            if(doReadFlag) {
                // Read fields of the requested package.
                pkg.name = currentPackage;
                if(isDependsLine(line)) {
                    pkg.dependencies = getKvValue(line);
                } else if(isDescriptionLine(line)) {
                    pkg.description = getKvValue(line);
                } else if(pkg.description.length > 0 && isIndentedLine(line)) {
                    // Indented lines belong to description-field, if they come after "Description"-line
                    pkg.description += line;
                }
            } else {
                // Check only depends field for reverse dependencies.
                if(isDependsLine(line) && isDependency(line, name)) {
                    pkg.reverseDependencies.push(currentPackage);
                }
            }
        });

        rs.on("close", () => {
            if(pkg.dependencies.length > 0) {
                // Parse dependencies string into an array and drop version numbers.
                pkg.dependencies = pkg.dependencies.split("|").join(",").split(","); 
                pkg.dependencies = pkg.dependencies.map(d => d.trim().split(" ")[0]);

                // Add isKnown property to the dependencies to differentiate between known and not known packages.
                pkg.dependencies = pkg.dependencies.map(n => {
                    return {name: n, isKnown: allPackageNames.indexOf(n) > -1};
                });

                resolve(pkg);

            } else {
                // Turn empty string into an empty array for consistency.
                pkg.dependencies = [];
                resolve(pkg);
            }

        });

        rs.on("error", err => {
            reject(err);
        });
        
    })
}

module.exports.readPackage = readPackage;
module.exports.readAllPackageNames = readAllPackageNames;