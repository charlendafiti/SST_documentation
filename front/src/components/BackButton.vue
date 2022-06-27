<template>
    <button
      @click="redirectToRoot" 
      v-if="showBackButton" 
      class="back-button"
    > Voltar </button>
</template>

<script>
export default {

    props: {
        showBackButton: {
        required: false,
        type: Boolean,
        default: false,
        },
    },
    methods: {
        redirectToRoot() {  
            this.$router.push('/')
        }
    },
}
</script>

<style lang="scss" scoped>

.back-button {
    display: block;
    background-color: var(--color-600);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: 500;
    font-size: .875rem;
    float: right;
}

.back-button:hover {
    transition: background-color .2s linear;
    cursor: pointer;
    background-color: #212121;
}

</style>