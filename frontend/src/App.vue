<template>
    <div id="container">
        <package-list v-on:package-request="showDetails($event)" v-bind:packages="packages"></package-list>
        <package-details v-on:package-request="showDetails($event)" v-bind:pkg="selectedPackage"></package-details>
    </div>
</template>

<script>
import packageList from "./components/PackageList.vue";
import packageDetails from "./components/PackageDetails.vue";
import api from "./api";

export default {
    components: {
        "package-list": packageList,
        "package-details": packageDetails
    },
    data: function() {
        return {
            packages: [],
            selectedPackage: {}
        }
    },
    methods: {
        showDetails: function(packageName) {
            api.getPackage(packageName)
                .then(response => {
                    this.selectedPackage = response.data;
                });
        }
    },
    created: function() {
        api.getPackageNames()
            .then(response => {
                this.packages = response.data;
            });
    }
}
</script>

<style scoped>
    #container {
        margin: 50px auto;
        width: 90%;
        display: flex;
    }
    @media only screen and (min-width: 1100px) {
        #container {
            width: 50%;
        }
    }
</style>