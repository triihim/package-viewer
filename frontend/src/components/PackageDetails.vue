<template>
    <div id="package-details">
        <p v-if="loading">Loading...</p>
        <div v-if="!loading">
            <h2>{{pkg.name}}</h2>
            <div v-html="parsedDescription"></div>
            <h3 v-if="pkg.name">Dependencies</h3>
            <ul>
                <li v-for="(d, i) in pkg.dependencies" v-bind:key="i">
                    <span v-bind:class="{ clickable: d.isKnown }" v-on="d.isKnown ? { click: () => requestPackageDetails(d.name) } : {}">{{d.name}}</span>
                </li>
            </ul>
            <h3 v-if="pkg.name">Reverse dependencies</h3>
            <ul>
                <li v-for="(rd, i) in pkg.reverseDependencies" v-bind:key="i">
                    <span class="clickable" v-on:click="requestPackageDetails(rd)">{{rd}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import packageMixin from "../mixins/packageMixin";

export default {
    props: {
        pkg: Object,
        loading: Boolean
    },
    mixins: [
        packageMixin
    ],
    computed: {
        parsedDescription: function() {
            if(!this.pkg.description) return "";
            var html = "";

            // Replace paragraph separators (" . ") with proper html.
            var paragraphs = this.pkg.description.split(" . ")
                .map(p => "<p>" + p + "</p><br/>");

            html = paragraphs.join("").replace(/( \* )/g, "<br/> - ");

            return html;
        }
    }
}
</script>

<style scoped>
    #package-details {
        overflow-y: scroll;
        padding: 20px;
        box-shadow: #333 0px -7px 7px -10px inset;
        background-color: #fcfcfc;
    }
    h2 {
        padding-bottom: 10px;
    }
    h3 {
        border-bottom: 1px solid #ccc;
        padding: 3px 0;
        margin: 8px 0;
    }
    li {
        margin: 3px 0;
    }
    .clickable {
        color: #8a2be2;
        cursor: pointer;
    }
    .clickable:hover {
        text-decoration: underline;
    }
</style>