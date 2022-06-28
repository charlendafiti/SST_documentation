
<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <button @click="close">X</button>
        </div>
        <div class="sidebar-body">
            <div class="sidebar-item">
                <div class="sidebar-item--icon">
                    <img src="../assets/images/icons/pdf-file.svg"> 
                </div>
                <span @click="redirect('/report/1')" class="sidebar-item--text">
                    Relatório Geral das Tarefas de Q1 e Q2
                </span>
            </div>

            <div class="sidebar-item">
                <div class="sidebar-item--icon">
                    <img src="../assets/images/icons/pdf-file.svg"> 
                </div>
                <span @click="redirect('/report/2')" class="sidebar-item--text">
                    Relatório de Boas Práticas e Princípios de SEO.
                </span>
            </div>
        </div>
    </div>
    <div class="overlay" @click="close"></div>
</template>

<script>
export default {
    methods: {
        close: function() {
            this.$emit('toggleSidebar');
        },

        redirect(url) {
            let route = this.$router.resolve({ path: url });
            window.open(route.href)
        }
    },
    props: {
        toggle: Boolean
    }
}
</script>

<style scoped lang="scss">
.overlay {
    background: var(--color-900);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 100;
    filter: blur(5px);
    opacity: .2;
}
.sidebar {
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
        max-height: 100%;
    }

    .sidebar-header {
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid var(--color-50);
        
        button {
            background: transparent;
            border: none;
            font-weight: 400;
            padding: 0;
            color: var(--color-400);
            cursor: pointer;

            &:hover {
                transition: color .2s ease-in;
                color: var(--color-600);
            }
        }
    }
    
    .sidebar-body {
        padding: 1rem;

        .sidebar-item {
            display: flex;
            margin-bottom: 16px;

            &--icon {
                width: 20px;
                height: auto;
                margin-right: 5px;
                display: flex;
                align-items: center;
            }

            &--text {
                color: var(--color-700);
                display: inline;
                font-size: .875rem;

                &:hover {
                    transition: color .2s ease-in;
                    cursor: pointer;
                    color: var(--color-900);
                }
            }
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