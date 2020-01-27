import axios from "axios";

const base_url = process.env.API_URL; // Gets replaced on build by webpack.

export default {

    getPackageNames: function() {
        return axios.get(base_url + "/packages");
    },

    getPackage: function(packageName) {
        return axios.get(base_url + "/package?name=" + packageName);
    }

}