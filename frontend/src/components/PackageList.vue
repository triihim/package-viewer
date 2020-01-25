<template>
    <div id="package-list">
        <ul>
            <li v-for="(pkg, i) in packages" v-bind:key="i" v-on:click="requestPackageDetails(pkg)">
                {{pkg}}
            </li>
        </ul>
    </div>
</template>

<script>
import packageMixin from "../mixins/packageMixin";

export default {
    props: { packages: Array },
    mixins: [packageMixin]
}
</script>

<style scoped>
    #package-list {
        background-color: lightblue;
        flex: 1;
        height: 80vh;
        overflow-y: scroll;
    }
    ul {
        padding: 20px;
    }
    li {
        font-size: 1.2rem;
        margin: 10px 0;
    }
</style>