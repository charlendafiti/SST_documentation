<script>
export default {
    methods: {
        close: function(e) {
            this.$emit('toggleSidebar');
        }
    },
    props: {
        toggle: Boolean
    }
}
</script>
<template>
    <div class="sidebar">
        <div class="fechar" @click="close">X</div>
        <div class="sidebar-item"> Relatorio 1 </div>
        <div class="sidebar-item"> Relatorio 2 </div>
    </div>
</template>
<style scoped lang="scss">
.sidebar {
        display: flex;
        flex-direction: column;
        position: fixed;
        left: 0px;
        top: 0px;
        background-color: white;
        width: auto;
        min-width: 300px;
        max-width: 500px;
        height: 100vh;
        z-index: 1000;
        box-shadow: 0.5rem 0.2rem 1rem rgba(20,20,20,0.2);
        max-height: 98%;
        padding: 1rem;
        .sidebar-item {
            background: none;
            border-bottom: solid 1px #e1e1e1;
            padding: 0.2rem;
            outline: none;
            box-shadow: none;
            cursor: pointer;

        }
        .sidebar-item:last-child {
            border: none;
        }
        .sidebar-item:first-child {
            margin-top: 20rem;
        }
    }


    .fechar {
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0px;
        font-size: 1.3rem;
        padding: 1rem;
        z-index: 1000;
    }
</style>