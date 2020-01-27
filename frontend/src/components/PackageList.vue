<template>
    <div id="package-list">
        <input type="text" placeholder="Search" v-model="search">
        <p v-if="loading">Loading...</p>
        <ul v-if="!loading">
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
        packages: Array,
        loading: Boolean
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
        background-color: #E1F4F3;
        flex: 1;
        overflow-y: scroll;
    }
    li {
        font-size: 1.1rem;
        padding: 5px 10px;
        cursor: pointer;
    }
    li:hover {
        background-color: #333;
        color: #eee;
    }
    input {
        font-size: 1.1rem;
        padding: 10px;
        border: none;
    }
    p {
        padding: 5px;
    }
</style>