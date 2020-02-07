const reader = require("./reader");

 module.exports = {
    
    getPackageNames: async () => {
        let packageNames = await reader.readAllPackageNames();
        return packageNames.sort();
    },

    getPackage: async (name) => {
        return await reader.readPackage(name);
    }

 }