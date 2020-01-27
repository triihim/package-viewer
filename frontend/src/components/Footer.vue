<template>
    <footer>
        <a v-bind:href="githubLink">{{githubLink}}</a>
    </footer>
</template>

<script>
export default {
    data: function() {
        return {
            githubLink: "https://github.com/triihim/package-viewer"
        }
    }
}
</script>

<style scoped>
    footer {
        border-top: 3px solid #706C61;
        text-align: center;
        padding-top: 10px;
        min-height: 50px;
    }
    a {
        text-decoration: none;
        color: #333;
    }
    a:hover {
        text-decoration: underline;
    }
</style>