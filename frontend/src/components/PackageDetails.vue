<template>
    <div id="details">
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
    
    #details {
        flex: 2;
        background-color: #eee;
        padding: 20px;
        overflow-y: scroll;
    }
    .clickable {
        color: #4e4eff;
        cursor: pointer;
    }
    .clickable:hover {
        text-decoration: underline;
    }
    h2, h3, p {
        margin: 10px 0;
    }
    h2 {
        font-size: 1.5rem;
    }
    h3 {
        font-size: 1.1rem;
        border-bottom: 2px solid #333;
    }
    
</style>