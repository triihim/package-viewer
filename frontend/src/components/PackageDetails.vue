<template>
    <div id="details">
        <h2>{{pkg.name}}</h2>
        <p v-for="(paragraph, i) in pkg.descriptionParagraphs" v-bind:key="i">{{paragraph}}</p>
        <h3 v-if="pkg.dependencies">Dependencies</h3>
        <ul>
            <li v-for="(d, i) in pkg.dependencies" v-bind:key="i">
                <span v-bind:class="{ clickable: d.isKnown }" v-on="d.isKnown ? { click: () => requestPackageDetails(d.name) } : {}">{{d.name}}</span>
            </li>
        </ul>
        <h3 v-if="pkg.reverseDependencies">Reverse dependencies</h3>
        <ul>
            <li v-for="(rd, i) in pkg.reverseDependencies" v-bind:key="i">
                <span class="clickable" v-on:click="requestPackageDetails(rd)">{{rd}}</span>
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
        color: blue;
    }
    h2, h3, p {
        margin: 10px 0;
    }
    h2 {
        font-size: 1.6rem;
    }
    h3 {
        font-size: 1.2rem;
    }
    
</style>