import api from "../api";

export default {
    methods: {
        requestPackageDetails: function(packageName) {
            api.getPackage(packageName).then(p => {
                this.$emit("package-request", packageName);
            })
        }
    }
}