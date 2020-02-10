<template>
    <div id="error">
        Error: {{error}}
    </div>
</template>

<script>
export default {
    props: {
        error: String
    }
}
</script>

<style scoped>
    div {
        text-align: center;
        background-color: #f75f5f;
        padding: 5px 10px;
        color: #fff;
    }
</style>