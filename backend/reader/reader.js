const fs = require("fs");
const readline = require("readline");
const config = require("../config");
const lineHandler = require("../line-handler/line-handler");
const isPackageStartLine = require("./reader-utils").isPackageStartLine;
const isSearchedPackage = require("./reader-utils").isSearchedPackage;
const getValue = require("./reader-utils").getValue;

const readPackage = async (packageName) => {

    const callLineHandler = async (pkg, line) => {
        let lh = lineHandler.getLineHandler(line);
        if(lh) return lh.handler(pkg, line);
    }

    return new Promise(async (resolve, reject) => {
        const rs = fs.createReadStream(config.FILEPATH, "utf-8");
        const rl = readline.createInterface(rs);

        const pkg = {};

        // Flag to track whether or not we've found the package.
        let pkgFound = false;

        const promises = [];

        rl.on("line", line => {

            if(!pkgFound && isPackageStartLine(line) && isSearchedPackage(line, packageName)) {
                // Line starting the searched package section.
                promises.push(callLineHandler(pkg, line));
                pkgFound = true;

            } else if(pkgFound && isPackageStartLine(line)) {
                // Line starting another package section ==> Stop reading.
                pkgFound = false;
                rl.close();
                rs.close();

            } else if(pkgFound) {
                // Line belongs to the searched package.
                promises.push(callLineHandler(pkg, line));
            }
            
        });

        rl.on("close", () => {
            Promise.all(promises)
            .then(() => {
                if(pkg.name) resolve(pkg);
                else reject("Package " + packageName + " not found");
            })
            .catch(err => {
                console.log(err);
            })
        });

    });  
}

const readAllPackageNames = () => {
    return new Promise(resolve => {
        const rs = fs.createReadStream(config.FILEPATH, "utf-8");
        const rl = readline.createInterface(rs);

        let names = [];

        rl.on("line", line => {
            if(isPackageStartLine(line)) {
                names.push(getValue(line));
            };
        });

        rl.on("close", () => {
            resolve(names);
        });
    });
}

const isPackageKnown = (packageName) => {
    return new Promise(resolve => {
        const rs = fs.createReadStream(config.FILEPATH, "utf-8");
        const rl = readline.createInterface(rs);

        rl.on("line", line => {
            if(line.toLowerCase().startsWith("package")) {
                let currentPackage = getValue(line);
                if(currentPackage === packageName) {
                    rl.removeAllListeners();
                    rl.close();
                    rs.close();
                    resolve(true);
                }
            } 
        });

        rl.on("close", () => {
            resolve(false);
        })
    });
}

module.exports.readPackage = readPackage;
module.exports.readAllPackageNames = readAllPackageNames;
module.exports.isPackageKnown = isPackageKnown;
