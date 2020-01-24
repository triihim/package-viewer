/**
 * File: packages-api.js
 * Description: API functions for fetching package data.
 */

const parser = require("./parser");
const reader = require("./reader");

 module.exports = {
    
    getPackageNames: async () => {
        let packageNames = await reader.readAllPackageNames();
        return packageNames.sort();
    },

    getPackage: async (name) => {
        return await parser.readAndParsePackage(name);
    }

 }

