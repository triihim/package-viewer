export default {
    methods: {
        requestPackageDetails: function(packageName) {
            this.$emit("package-request", packageName);
        }
    }
}