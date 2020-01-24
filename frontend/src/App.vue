<template>
    <div id="container">
        <package-list v-on:package-select="showDetails($event)"></package-list>
        <package-details v-bind:pkg="pkg"></package-details>
    </div>
</template>

<script>
import packageList from "./components/PackageList.vue";
import packageDetails from "./components/PackageDetails.vue";

export default {
    components: {
        "package-list": packageList,
        "package-details": packageDetails
    },
    data: function() {
        return {
            pkg: {
                packageName: "testpkg",
                description: ["paragraph1", "paragraph2"],
                dependencies: [{name:"dep1", isInstalled: true}, {name:"dep2", isInstalled: false}],
                reverseDependencies: ["revdep1", "revdep2"]
            }
        }
    },
    methods: {
        showDetails: function(packageName) {
            this.pkg.packageName = packageName;
        }
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