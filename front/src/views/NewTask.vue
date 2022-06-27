<template>
    <header-component />
    <div class="main">
        <task-form />
    </div>
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import TaskForm from "../components/TaskForm.vue";
import { isValidToken } from "../helpers/tasks";

export default {
    beforeCreate() {
        if(!isValidToken()) {
            this.$router.push({name: 'token'}); 
        }
    },

    components: {
        HeaderComponent,
        TaskForm
    },
}
</script>