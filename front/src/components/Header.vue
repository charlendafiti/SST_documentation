<template>
    <header>
        <div class="logo">
            <img src="../assets/images/dafiti-logo.webp" alt="">
        </div>
        <h1 class="main-title"> Tarefas de Q1 e Q3</h1>
    </header>
    <div class="main">
        <div class="row" v-show="showNewButton">
            <button class="new-button" @click="create">Adicionar task</button>
        </div>
    </div>

</template>

<script> 
export default {
    props: {
        showNewButton: {
            required: false,
            default: true
        },
    },

    methods: {
        create() {
            this.$router.push('/new');
        }
    }
}
</script>

<style scoped lang="scss">

header {
    background: white; 
    border-bottom: 1px solid #ccc; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem; 
    
    img {
        width: 100%;
        max-width: 125px;
    }

    .logo {
        display: inline-flex;
        margin-left: 3rem;
    }
}

.main {
    display: flex;
    justify-content: flex-end;

    .new-button {
        border: none;
        background: #0052cc;
        color: white;
        font-weight: 500;
        padding: 8px 16px;
        margin-left: auto;
        cursor: pointer;
    }
}

.main-title {
    font-size: 1rem;
    color: var(--color-800);
    font-weight: bold;
    display: block;
    line-height: 35px;
}

@media screen and (max-width: 500px) {
    header {
        display: flex;
        flex-direction: column;
        .logo {
            margin-left: 0;
        }
    }

}
</style>