/**
 * File: packages-api.js
 * Description: API functions for fetching package data.
 */

const parser = require("./parser");
const reader = require("./reader");

 module.exports = {
    
    getPackageNames: async () => {
        let packageNamesArray = await reader.readAllPackageNames();
        return packageNamesArray.sort();
    },

    getPackage: async (name) => {
        return await parser.readAndParsePackage(name);
    }

 }

