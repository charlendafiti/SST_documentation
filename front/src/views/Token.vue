<template>
    <header-component :showNewButton="false"/>
    <div class="main">
        <input 
            type="text" 
            v-model="token" 
            placeholder="Informe o token para acessar."
            @keyup.enter="validateToken"
            maxlength="40"
        />
        <small class="error-message" v-if="showErrorMessage">Token inválido!</small>
        <button @click="validateToken"> Validar </button>
    </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue';
import GeneralConfig from '../config/generalConfig';

export default {
    components: {
        HeaderComponent
    },

    data: _ => ({
        token: null,
        showErrorMessage: false, 
    }),

    methods: {
        validateToken() {
            const { token } = GeneralConfig; 

            if(token == this.token) {
                this.storageToken();
                this.showErrorMessage = false; 
            } else { 
                this.showErrorMessage = true; 
            }
        },

        storageToken() {
            window.localStorage.setItem('token', this.token.trim());
            this.$router.push('/');
        }
    }
}
</script>

<style scoped lang="scss">
    input[type="text"] {
        width: 100%;
    }

    button {
        border: none; 
        color: var(--color-50);
        background: var(--color-800);
        border: none;
        padding: 8px 16px;
        border-radius: 3px;
        margin-top: 10px; 
    }

    .error-message {
        color: #EC3434; 
        display: block;
        font-weight: 500;
        margin: 3px 0;
    }
</style>