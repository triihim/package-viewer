<template>
    <div id="wrapper">
        <app-header></app-header>
        <error v-if="error.length > 0" v-bind:error="error"></error>
        <main id="content">
            <package-list v-on:package-request="showDetails($event)" 
                v-bind:packages="packages"
                v-bind:loading="loadingPackages"></package-list>
            <package-details v-on:package-request="showDetails($event)" 
                v-bind:pkg="selectedPackage"
                v-bind:loading="loadingDetails"></package-details>
        </main>
        <app-footer></app-footer>
    </div>
</template>

<script>
import packageList from "./components/PackageList.vue";
import packageDetails from "./components/PackageDetails.vue";
import header from "./components/Header.vue";
import footer from "./components/Footer.vue";
import error from "./components/Error.vue";
import api from "./api";

export default {
    components: {
        "package-list": packageList,
        "package-details": packageDetails,
        "app-header": header,
        "app-footer": footer,
        "error": error
    },
    data: function() {
        return {
            packages: [],
            selectedPackage: {},
            loadingPackages: false,
            loadingDetails: false,
            error: ""
        }
    },
    methods: {
        showDetails: function(packageName) {
            this.loadingDetails = true;
            api.getPackage(packageName)
                .then(response => {
                    this.selectedPackage = response.data;
                })
                .catch(err => {
                    // TODO: Handle error
                    this.error = "Failed to fetch details for package " + packageName;
                })
                .finally(() => {
                    this.loadingDetails = false;
                });
        }
    },
    created: function() {
        this.loadingPackages = true;
        api.getPackageNames()
            .then(response => {
                this.packages = response.data;
            })
            .catch(err => {
                // TODO: Handle error
                this.error = "Failed to fetch packages";
            })
            .finally(() => {
                this.loadingPackages = false;
            });
    }
}
</script>

<style scoped>

    #wrapper {
        width: 95%;
        margin: 0 auto;
        transition-duration: .2s;
    }
    #content {
        display: flex;
        height: 80vh;
    }
    @media only screen and (min-width: 1100px) {
        #wrapper {
            width: 50%;
        }
    }

</style>