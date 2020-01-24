<template>
    <div id="details">
        <h2>{{pkg.packageName}}</h2>
        <p v-for="(paragraph, i) in pkg.description" v-bind:key="i">{{paragraph}}</p>
        <ul>
            <li v-for="(d, i) in pkg.dependencies" v-bind:key="i">{{d}}</li>
        </ul>
        <ul>
            <li v-for="(d, i) in pkg.reverseDependencies" v-bind:key="i">{{d}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        pkg: Object
    }
}
</script>

<style scoped>
    #details {
        flex: 2;
        background-color: lightcoral;
        padding: 20px;
    }
</style>