<script>
    import HambMenu from './HambMenu.vue';

    export default {
        components: {
            HambMenu
        }
    }
</script>

<template>
    <header>
        <div>
            <div class="logo">
                <img src="../assets/images/dafiti-logo.webp" alt="">
            </div>
        </div>
        <h1 class="main-title"> Tarefas de Q1 e Q3</h1>
    </header>
</template>

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
    }
}
</style>