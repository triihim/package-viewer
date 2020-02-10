<template>
    <div id="package-list">
        <input type="text" placeholder="Search" v-model="search">
        <div id="list">
            <p v-if="loading">Loading...</p>
            <ul v-if="!loading">
                <li v-for="(pkg, i) in filteredPackages" v-bind:key="i" v-on:click="requestPackageDetails(pkg)">
                    {{pkg}}
                </li>
            </ul>
        </div>
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
    }
    input {
        padding: 7px;
        font-size: 1.2rem;
        border: none;
        outline: none;
        border-bottom: 1px solid #ccc;
        background-color: #fcfcfc;
    }   
    #list {
        overflow-y: scroll;
        flex: 1;
        box-shadow: #333 0px 7px 7px -10px inset,
                    #333 0px -7px 7px -10px inset;
    }
    p {
        padding: 5px;
    }
    li {
        font-size: 1.1rem;
        padding: 7px;
        cursor: pointer;
    }
    li:hover {
        background-color: #8a2be2;
        color: #fff;
    }
    li:active {
        background-color: #701ac1;
    }
</style>