<template>
    <h4>Resultado: {{`${this.tasks.length} encontrada${this.tasks.length != 1 ? 's' : ''}`}}</h4>
</template>

<script>
    export default {
        props: {
            tasks: {
                required: true,
                type: Object
            }
        }
    }
</script>

<style scoped lang="scss">
h4 {
    margin-top: 1rem;
    font-weight: bold;
    font-size: .875rem;
    margin-bottom: .5rem;
}  
</style>