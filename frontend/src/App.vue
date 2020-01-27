<template>
    <div id="wrapper">
        <app-header></app-header>
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
import api from "./api";

export default {
    components: {
        "package-list": packageList,
        "package-details": packageDetails,
        "app-header": header,
        "app-footer": footer
    },
    data: function() {
        return {
            packages: [],
            selectedPackage: {},
            loadingPackages: false,
            loadingDetails: false
        }
    },
    methods: {
        showDetails: function(packageName) {
            this.loadingDetails = true;
            api.getPackage(packageName)
                .then(response => {
                    this.selectedPackage = response.data;
                    this.loadingDetails = false;
                })
                .catch(err => {
                    // TODO: Handle error
                });
        }
    },
    created: function() {
        this.loadingPackages = true;
        api.getPackageNames()
            .then(response => {
                this.packages = response.data;
                this.loadingPackages = false;
            })
            .catch(err => {
                // TODO: Handle error
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