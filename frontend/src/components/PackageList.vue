<template>
    <div id="package-list">
        <input type="text" placeholder="Search" v-model="search">
        <ul>
            <li v-for="(pkg, i) in filteredPackages" v-bind:key="i" v-on:click="requestPackageDetails(pkg)">
                {{pkg}}
            </li>
        </ul>
    </div>
</template>

<script>
import packageMixin from "../mixins/packageMixin";

export default {
    props: { 
        packages: Array 
    },
    data: function() {
        return {
            search: ""
        }
    },
    computed: {
        filteredPackages: function() {
            return this.packages.filter(p => p.startsWith(this.search.toLowerCase()));
        }
    },
    mixins: [
        packageMixin
    ]
}
</script>

<style scoped>
    #package-list {
        display: flex;
        flex-direction: column;
        background-color: lightblue;
        flex: 1;
        overflow-y: scroll;
    }
    li {
        font-size: 1.2rem;
        padding: 10px;
        cursor: pointer;
    }
    li:hover {
        background-color: lightskyblue;
    }
    input {
        padding: 10px;
    }
</style>