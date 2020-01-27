<template>
    <div>
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
        background-color: #f75f5f;
        padding: 20px 10px;
        color: #fff;
    }
</style>