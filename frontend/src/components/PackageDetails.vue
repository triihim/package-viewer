<template>
    <div id="details">
        <h2>{{pkg.packageName}}</h2>
        <p v-for="(paragraph, i) in pkg.description" v-bind:key="i">{{paragraph}}</p>
        <ul>
            <li v-for="(d, i) in pkg.dependencies" v-bind:key="i">
                <span v-bind:class="{ clickable: d.isKnown }" v-on="d.isKnown ? { click: () => requestPackageDetails(d.name) } : {}">{{d.name}}</span>
            </li>
        </ul>
        <ul>
            <li v-for="(d, i) in pkg.reverseDependencies" v-bind:key="i">
                <span v-bind:class="{ clickable: d.isKnown }" v-on:click="requestPackageDetails(d.name)">{{d.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import packageMixin from "../mixins/packageMixin";

export default {
    props: {
        pkg: Object
    },
    mixins: [packageMixin]
}
</script>

<style scoped>
    #details {
        flex: 2;
        background-color: lightcoral;
        padding: 20px;
    }
    .clickable {
        color: pink;
    }
</style>