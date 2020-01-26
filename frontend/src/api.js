import axios from "axios";

const base_url = "http://localhost:3000";

export default {

    getPackageNames: function() {
        return axios.get(base_url + "/packages");
    },

    getPackage: function(packageName) {
        return axios.get(base_url + "/package?name=" + packageName);
    }

}