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
        border-top: 2px solid blueviolet;
        text-align: center;
        padding-top: 15px;
    }
    a {
        text-decoration: none;
    }
    a:hover {
        color: blueviolet;
    }
</style>