<template>
    <div id="package-list">
        <ul>
            <li v-for="(pkg, i) in packages" v-bind:key="i" v-on:click="viewPackage(pkg)">
                {{pkg}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            packages: ["git", "perl", "perl-base"]
        }
    },
    methods: {
        viewPackage: function(packageName) {
            this.$emit("package-select", packageName);
        }
    }
}
</script>

<style scoped>
    #package-list {
        background-color: lightblue;
        flex: 1;
    }
    ul {
        padding: 20px;
    }
    li {
        font-size: 1.2rem;
        margin: 10px 0;
    }
</style>